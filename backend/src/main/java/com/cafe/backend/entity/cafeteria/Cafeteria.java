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

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Entity
@Table(name = "cafeteria")
@Data
@Builder
@NoArgsConstructor

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
    private double rating;

    @Column(name = "phone_number", nullable = false)
    private String phone_number;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_status", nullable = false)
    private CafeteriaDeliveryStatus cafeteriaDeliveryStatus;

    @OneToMany(mappedBy = "cafeteria", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Product> products;

    public Cafeteria(Long id, String name, String location, double rating, String phone_number, CafeteriaDeliveryStatus cafeteriaDeliveryStatus, Set<Product> products) {
        this.id = id;
        this.name = name;
        this.location = location;
        setRating(rating);
        this.phone_number = phone_number;
        this.cafeteriaDeliveryStatus = cafeteriaDeliveryStatus;
        this.products = products;
    }

    /**
     * The abstract method {@code validateRating} must be handled in the subclasses of {@link Cafeteria}.
     */
    protected abstract void validateRating(double rating);

    /**
     * The method {@code setRating} is used in the constructor to set the validated rating.
     */
    private void setRating(double rating) {
        validateRating(rating);
        this.rating = rating;
    }
}