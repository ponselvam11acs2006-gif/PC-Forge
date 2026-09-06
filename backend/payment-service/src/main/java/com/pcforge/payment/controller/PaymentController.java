package com.pcforge.payment.controller;

import com.pcforge.payment.entity.Payment;
import com.pcforge.payment.provider.PaymentProvider;
import com.pcforge.payment.repository.PaymentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentRepository repository;
    private final PaymentProvider paymentProvider;

    public PaymentController(PaymentRepository repository, PaymentProvider paymentProvider) {
        this.repository = repository;
        this.paymentProvider = paymentProvider;
    }

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createPaymentSession(@RequestBody Payment payment) {
        payment.setStatus("CREATED");
        Payment saved = repository.save(payment);

        Map<String, Object> response = new HashMap<>();
        response.put("paymentId", saved.getId());
        response.put("orderId", saved.getOrderId());
        response.put("amount", saved.getAmount());
        response.put("paymentMethod", saved.getPaymentMethod());
        response.put("qrSessionId", paymentProvider.generateQrSessionId(saved.getOrderId()));
        response.put("upiId", "pcforge-demo@upi");
        response.put("expiresInSeconds", 299); // 4 minutes 59 seconds timer

        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify")
    public ResponseEntity<Payment> verifyPayment(@RequestParam Long paymentId, @RequestParam(defaultValue = "true") boolean success) {
        return repository.findById(paymentId)
                .map(payment -> {
                    Payment processed = paymentProvider.processPayment(payment, success);
                    return ResponseEntity.ok(repository.save(processed));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
