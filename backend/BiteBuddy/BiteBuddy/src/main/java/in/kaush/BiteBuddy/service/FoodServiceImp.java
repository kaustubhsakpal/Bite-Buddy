package in.kaush.BiteBuddy.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import in.kaush.BiteBuddy.entity.Foodentity;
import in.kaush.BiteBuddy.io.FoodRequest;
import in.kaush.BiteBuddy.io.FoodResponse;
import in.kaush.BiteBuddy.repository.FoodRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FoodServiceImp implements FoodService {

    private final Cloudinary cloudinary;
    private final FoodRepository foodRepository;

    // Upload image to Cloudinary
    @Override
    public String uploadImage(MultipartFile file) {
        try {
            Map uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap("folder", "foods")
            );
            return uploadResult.get("secure_url").toString();
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Image upload failed"
            );
        }
    }

    // Add food
    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        Foodentity entity = convertToEntity(request);
        String imageUrl = uploadImage(file);
        entity.setImageUrl(imageUrl);
        entity = foodRepository.save(entity);
        return convertToResponse(entity);
    }

    // Read all foods
    @Override
    public List<FoodResponse> readFoods() {
        return foodRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // Read single food
    @Override
    public FoodResponse readFood(String id) {
        Foodentity entity = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found with id: " + id));
        return convertToResponse(entity);
    }

    // Delete food + image
    @Override
    public void deleteFood(String id) {
        Foodentity entity = foodRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food not found"));

        deleteImageFromCloudinary(entity.getImageUrl());
        foodRepository.deleteById(id);
    }

    // 🔒 Helper: delete image from Cloudinary
    private void deleteImageFromCloudinary(String imageUrl) {
        try {
            // example URL: .../foods/abc123.jpg
            String publicId = imageUrl
                    .substring(imageUrl.indexOf("foods/"))
                    .replace(".jpg", "")
                    .replace(".png", "")
                    .replace(".jpeg", "");

            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Image delete failed"
            );
        }
    }

    // Convert request → entity
    private Foodentity convertToEntity(FoodRequest request) {
        return Foodentity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .category(request.getCategory())
                .price(request.getPrice())
                .build();
    }

    // Convert entity → response
    private FoodResponse convertToResponse(Foodentity entity) {
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .category(entity.getCategory())
                .price(entity.getPrice())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
