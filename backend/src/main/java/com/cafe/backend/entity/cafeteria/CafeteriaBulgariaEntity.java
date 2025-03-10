package com.cafe.backend.entity.cafeteria;

import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.enums.DeliveryStatusEnum;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

/**
 * {@code CafeteriaBulgarian} extends the base class {@link CafeteriaEntity}.
 * The subclass is responsible for setting the rating for a specific country.
 * @author AngelStoynov
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("cafeteria_bulgaria")

public class CafeteriaBulgariaEntity extends CafeteriaEntity {
    private static final double MIN_RATING = 0.0;
    private static final double MAX_RATING = 5.0;

    public CafeteriaBulgariaEntity() {
        super();
    }

    public CafeteriaBulgariaEntity(Long id, String name, String location, double rating, String phone_number, DeliveryStatusEnum cafeteriaDeliveryStatus, Set<ProductEntity> products) {
        super(id, name, location, rating, phone_number, cafeteriaDeliveryStatus, products);
        setRating(rating);
    }

    @Override
    protected void validateRating(double rating) {
        if (rating < MIN_RATING || rating > MAX_RATING) {
            throw new IllegalArgumentException("Cafeteria rating cannot be lower than " + MIN_RATING + " and higher than " + MAX_RATING);
        }
    }

}
