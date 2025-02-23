package com.cafe.backend.entity.cafeteria;

import com.cafe.backend.entity.product.Product;
import com.cafe.backend.enums.CafeteriaDeliveryStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

/**
 * {@code Cafeteria} is an abstract entity class.
 * @author AngelStoynov
 */

@MappedSuperclass
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public abstract class Cafeteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "location", length = 100, nullable = false)
    private String location;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "phone_number", nullable = false)
    private String phone_number;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_status", nullable = false)
    private CafeteriaDeliveryStatus cafeteriaDeliveryStatus;


    /**
     * The abstract method {@code validateRating} must be handled in the subclasses of {@link Cafeteria}.
     */
    protected abstract void validateRating(double rating);

    /**
     * The method {@code setRating} is used in the constructor to set the validated rating.
     */
    public void setRating(double rating) {
        validateRating(rating);
        this.rating = rating;
    }
}