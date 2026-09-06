package com.pcforge.payment.provider;

import com.pcforge.payment.entity.Payment;

public interface PaymentProvider {
    Payment processPayment(Payment payment, boolean simulateSuccess);
    String generateQrSessionId(Long orderId);
}
