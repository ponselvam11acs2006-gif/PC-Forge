package com.pcforge.payment.provider;

import com.pcforge.payment.entity.Payment;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class MockPaymentProvider implements PaymentProvider {

    @Override
    public Payment processPayment(Payment payment, boolean simulateSuccess) {
        if (simulateSuccess) {
            payment.setStatus("SUCCESS");
            payment.setTransactionId("PF-TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        } else {
            payment.setStatus("FAILED");
            payment.setTransactionId("PF-ERR-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        return payment;
    }

    @Override
    public String generateQrSessionId(Long orderId) {
        return "PF-QR-" + orderId + "-" + UUID.randomUUID().toString().substring(0, 6).toUpperCase();
    }
}
