package in.kaush.BiteBuddy.repository;

import in.kaush.BiteBuddy.entity.Foodentity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodRepository extends MongoRepository<Foodentity,String> {

}
