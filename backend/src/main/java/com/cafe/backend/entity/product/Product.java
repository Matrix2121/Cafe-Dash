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
    private double price;

    @Column(name = "quantity")
    private int quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProductType productType;
}
