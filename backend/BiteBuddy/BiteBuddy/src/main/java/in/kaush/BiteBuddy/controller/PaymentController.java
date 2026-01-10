package in.kaush.BiteBuddy.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*") // React port
public class PaymentController {

    private static final String KEY_ID = "rzp_test_S17yBvgjIcmNGb";
    private static final String KEY_SECRET = "mbGGzkpIxcIeiDkVTwDI2iQm";
    @PostMapping("/create-order")
    public Map<String, Object> createOrder(@RequestBody Map<String, Object> data) throws Exception {

        int amount = (int) data.get("amount"); // amount in paise

        RazorpayClient client = new RazorpayClient(KEY_ID, KEY_SECRET);

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "receipt_001");

        Order order = client.orders.create(orderRequest);

        Map<String, Object> response = new HashMap<>();
        response.put("orderId", order.get("id"));
        response.put("amount", order.get("amount"));

        return response;
    }
    @PostMapping("/verify-payment")
    public ResponseEntity<?> verifyPayment(@RequestBody Map<String, String> data) {
        try {
            JSONObject options = new JSONObject();
            options.put("razorpay_order_id", data.get("razorpay_order_id"));
            options.put("razorpay_payment_id", data.get("razorpay_payment_id"));
            options.put("razorpay_signature", data.get("razorpay_signature"));

            boolean isValid = Utils.verifyPaymentSignature(
                    options,
                    KEY_SECRET
            );

            if (isValid) {
                return ResponseEntity.ok(Map.of("status", "success"));
            } else {
                return ResponseEntity.badRequest().body("Invalid signature");
            }

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Verification failed");
        }
    }
}
