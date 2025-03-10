package com.cafe.backend.entity.cafeteria;

import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.enums.DeliveryStatusEnum;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

/**
 * {@code Cafeteria} is an abstract entity class.
 * @author AngelStoynov
 */

@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "cafeteria_type", discriminatorType = DiscriminatorType.STRING)
@Entity
@Table(name = "cafeteria")
@Data
@Builder

public abstract class CafeteriaEntity {

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

    @OneToMany
    @JoinTable(
            name = "cafeteria_product",
            joinColumns = @JoinColumn(name = "cafeteria_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<ProductEntity> products;

    public CafeteriaEntity() {
    }

    public CafeteriaEntity(Long id, String name, String location, double rating, String phone_number, DeliveryStatusEnum cafeteriaDeliveryStatus, Set<ProductEntity> products) {
        this.id = id;
        this.name = name;
        this.location = location;
        setRating(rating);
        this.phone_number = phone_number;
        this.products = products;
    }

    /**
     * The abstract method {@code validateRating} must be handled in the subclasses of {@link CafeteriaEntity}.
     */
    protected abstract void validateRating(double rating);

    /**
     * The method {@code setRating} is used in the constructor to set the validated rating.
     */
    protected void setRating(double rating) {
        validateRating(rating);
        this.rating = rating;
    }
}