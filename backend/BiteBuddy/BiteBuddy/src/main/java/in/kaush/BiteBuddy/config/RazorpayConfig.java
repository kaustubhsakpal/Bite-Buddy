import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
public class RazorpayConfig {

    @Value("${razorpay.key.id:}")
    private String keyId;

    @Value("${razorpay.key.secret:}")
    private String keySecret;

    @Bean
    public RazorpayClient razorpayClient() throws RazorpayException {

        // 🔒 SAFETY CHECK
        if (!StringUtils.hasText(keyId) || !StringUtils.hasText(keySecret)) {
            System.out.println("⚠ Razorpay keys not found. Razorpay DISABLED.");
            return null; // 🔥 important: backend will NOT crash
        }

        System.out.println("✅ Razorpay enabled");
        return new RazorpayClient(keyId, keySecret);
    }
}
