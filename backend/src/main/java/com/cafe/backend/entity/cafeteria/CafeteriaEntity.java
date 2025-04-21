package com.cafe.backend.entity.cafeteria;

import java.time.LocalTime;
import java.util.List;

import com.cafe.backend.entity.product.ProductEntity;

import jakarta.persistence.*;
import lombok.*;

/**
 * {@code CafeteriaEntity} is a JPA entity that represents a cafeteria in the database.
 *
 * <p>It stores information such as the cafeteria’s name, brand, location, rating,
 * opening and closing hours, phone number, and a list of associated products.</p>
 *
 * <p>This entity is mapped to the {@code cafeteria} table and is linked to {@code ProductEntity}
 * through a one-to-many relationship.</p>
 *
 * <p>The {@code isDeleted} flag supports logical deletion.</p>
 *
 * @author AngelStoynov
 */
@Entity
@Table(name = "cafeteria")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CafeteriaEntity {

    /** The unique identifier of the cafeteria (primary key). */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /** The name of the cafeteria (required, max 100 characters). */
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    /** The brand or franchise of the cafeteria (required, max 100 characters). */
    @Column(name = "brand", length = 100, nullable = false)
    private String brand;

    /** The physical address or location of the cafeteria (required, max 100 characters). */
    @Column(name = "location", length = 100, nullable = false)
    private String location;

    /** The average user rating for the cafeteria. */
    @Column(name = "rating")
    private double rating;

    /** The number of reviews received for the cafeteria. */
    @Column(name = "count_reviews")
    private int countReview;

    /** The contact phone number of the cafeteria (required). */
    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    /** The time at which the cafeteria opens. */
    @Column(name = "opening_hour")
    private LocalTime openingHour;

    /** The time at which the cafeteria closes. */
    @Column(name = "closing_hour")
    private LocalTime closingHour;

    /** URL pointing to an image of the cafeteria (optional). */
    @Column(name = "image_url")
    private String imageUrl;

    /** A list of products available at this cafeteria. */
    @OneToMany(mappedBy = "cafeteria", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductEntity> products;

    /** Flag for logical deletion of the cafeteria. */
    @Column(name = "is_deleted")
    private boolean isDeleted;
}