package com.cafe.backend.entity.cafeteria;

import com.cafe.backend.entity.product.Product;
import com.cafe.backend.enums.CafeteriaDeliveryStatus;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Set;

/**
 * {@code CafeteriaBulgarian} extends the base class {@link Cafeteria}.
 * The subclass is responsible for setting the rating for a specific country.
 * @author AngelStoynov
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "cafeteria")
@Data
@NoArgsConstructor
public class CafeteriaBulgaria extends Cafeteria {
    private static final double MIN_RATING = 0.0;
    private static final double MAX_RATING = 5.0;

    @OneToMany(mappedBy = "cafeteria", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Product> products;

    @Override
    protected void validateRating(double rating) {
        if (rating < MIN_RATING || rating > MAX_RATING) {
            throw new IllegalArgumentException("Cafeteria rating cannot be lower than " + MIN_RATING + " and bigger than " + MAX_RATING);
        }
    }
}
