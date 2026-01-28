package in.kaush.BiteBuddy.service;

import in.kaush.BiteBuddy.io.FoodRequest;
import in.kaush.BiteBuddy.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

    // Image upload (Cloudinary)
    String uploadImage(MultipartFile file);

    // Add food with image
    FoodResponse addFood(FoodRequest request, MultipartFile file);

    // Read all foods
    List<FoodResponse> readFoods();

    // Read single food
    FoodResponse readFood(String id);

    // Delete food + image
    void deleteFood(String id);
}

