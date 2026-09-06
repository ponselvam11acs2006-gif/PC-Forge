package com.pcforge.order.service;

import com.pcforge.order.client.InventoryClient;
import com.pcforge.order.entity.Order;
import com.pcforge.order.entity.OrderItem;
import com.pcforge.order.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final InventoryClient inventoryClient;

    public OrderService(OrderRepository orderRepository, InventoryClient inventoryClient) {
        this.orderRepository = orderRepository;
        this.inventoryClient = inventoryClient;
    }

    @Transactional
    public Order createOrder(Order order) {
        if (order.getUserId() == null) {
            throw new IllegalArgumentException("userId is required to create an order");
        }

        if (order.getPaymentMethod() == null || order.getPaymentMethod().isBlank()) {
            order.setPaymentMethod("UPI_QR");
        }

        if (order.getShippingAddress() == null || order.getShippingAddress().isBlank()) {
            order.setShippingAddress("Default Delivery Address, India");
        }

        if (order.getItems() == null || order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order items cannot be empty");
        }

        List<OrderItem> reservedItems = new ArrayList<>();

        // Step 1: Validate and reserve stock for ALL items
        for (OrderItem item : order.getItems()) {
            item.setOrder(order);

            if (item.getQuantity() == null || item.getQuantity() < 1) {
                item.setQuantity(1);
            }

            if (item.getPrice() == null) {
                item.setPrice(BigDecimal.ZERO);
            }

            if (item.getTotalPrice() == null) {
                item.setTotalPrice(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            }

            Map<String, Object> req = new HashMap<>();
            req.put("productId", item.getProductId());
            req.put("quantity", item.getQuantity());

            try {
                Map<String, Object> res = inventoryClient.reserveStock(req);
                if (res == null || Boolean.FALSE.equals(res.get("success"))) {
                    unwindReservations(reservedItems);
                    throw new IllegalStateException("Insufficient stock for product: " + item.getProductName());
                }
                reservedItems.add(item);
            } catch (Exception e) {
                unwindReservations(reservedItems);
                throw new IllegalStateException("Insufficient stock for product: " + (item.getProductName() != null ? item.getProductName() : item.getProductId()) + " (" + e.getMessage() + ")");
            }
        }

        // Step 2: Calculate total amount
        BigDecimal total = order.getItems().stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        if (order.getTotalAmount() == null || order.getTotalAmount().compareTo(BigDecimal.ZERO) == 0) {
            order.setTotalAmount(total);
        }

        // Step 3: Confirm stock reservation
        for (OrderItem item : reservedItems) {
            try {
                Map<String, Object> req = new HashMap<>();
                req.put("productId", item.getProductId());
                req.put("quantity", item.getQuantity());
                inventoryClient.confirmStock(req);
            } catch (Exception e) {
                System.err.println("Inventory confirm warning: " + e.getMessage());
            }
        }

        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("CONFIRMED");
        }

        if (order.getCreatedAt() == null) {
            order.setCreatedAt(LocalDateTime.now());
        }
        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    private void unwindReservations(List<OrderItem> reservedItems) {
        for (OrderItem item : reservedItems) {
            try {
                Map<String, Object> req = new HashMap<>();
                req.put("productId", item.getProductId());
                req.put("quantity", item.getQuantity());
                inventoryClient.releaseStock(req);
            } catch (Exception e) {
                System.err.println("Failed to release stock during rollback: " + e.getMessage());
            }
        }
    }

    @Transactional
    public Order cancelOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));

        // Requirement 8: Prevent Double Restoration
        if ("CANCELLED".equalsIgnoreCase(order.getStatus())) {
            return order;
        }

        // Restore inventory for each OrderItem
        if (order.getItems() != null && !order.getItems().isEmpty()) {
            for (OrderItem item : order.getItems()) {
                Map<String, Object> req = new HashMap<>();
                req.put("productId", item.getProductId());
                req.put("quantity", item.getQuantity());
                try {
                    inventoryClient.restoreStock(req);
                } catch (Exception e) {
                    throw new IllegalStateException("Failed to restore stock for product ID " + item.getProductId() + ": " + e.getMessage());
                }
            }
        }

        order.setStatus("CANCELLED");
        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Order not found: " + orderId));
    }
}
