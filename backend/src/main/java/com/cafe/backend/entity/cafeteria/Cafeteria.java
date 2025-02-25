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
@DiscriminatorColumn(name = "cafeteria_type", discriminatorType = DiscriminatorType.STRING)
@Entity
@Table(name = "cafeteria")
@Data
@Builder

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

    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_status", nullable = false)
    private CafeteriaDeliveryStatus cafeteriaDeliveryStatus;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "cafeteria_product",
            joinColumns = @JoinColumn(name = "cafeteria_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products;

    public Cafeteria() {
    }

    public Cafeteria(Long id, String name, String location, double rating, String phoneNumber, CafeteriaDeliveryStatus cafeteriaDeliveryStatus, Set<Product> products) {
        this.id = id;
        this.name = name;
        this.location = location;
        setRating(rating);
        setPhoneNumber(phoneNumber);
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
    protected void setRating(double rating) {
        validateRating(rating);
        this.rating = rating;
    }

    protected abstract void validatePhoneNumber(String phoneNumber);

    protected void setPhoneNumber(String phoneNumber) {
        validatePhoneNumber(phoneNumber);
        this.phoneNumber = phoneNumber;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public double getRating() {
        return rating;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public CafeteriaDeliveryStatus getCafeteriaDeliveryStatus() {
        return cafeteriaDeliveryStatus;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}