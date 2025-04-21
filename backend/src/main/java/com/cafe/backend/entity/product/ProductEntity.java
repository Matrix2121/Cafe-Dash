package com.cafe.backend.entity.product;

import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.enums.ProductTypeEnum;

import jakarta.persistence.*;
import lombok.*;

/**
 * {@code ProductEntity} is an entity class representing a product in the system.
 * This class stores information about a product, such as its name, price, type, associated cafeteria, and image URL.
 * <p>
 * The entity is mapped to the {@code product} table in the database. It maintains relationships with other entities:
 * - The {@code cafeteria} is linked to a {@code CafeteriaEntity}.
 * </p>
 *
 * @author AngelStoynov
 */
@Data
@Entity
@Builder
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "price")
    private double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProductTypeEnum productType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cafeteria_id", referencedColumnName = "id")
    private CafeteriaEntity cafeteria;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}
