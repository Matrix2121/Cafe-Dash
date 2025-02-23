package com.cafe.backend.entity.product;

import com.cafe.backend.enums.ProductType;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

/**
 * {@code Product} is an entity class.
 * @author AngelStoynov
 */

@Data
@Entity
@Builder
@Table(name = "product")
@NoArgsConstructor
@AllArgsConstructor

public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "quantity", columnDefinition = "INTEGER DEFAULT 0")
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProductType productType;
}
