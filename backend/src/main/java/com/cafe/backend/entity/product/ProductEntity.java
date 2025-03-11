package com.cafe.backend.entity.product;

import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.enums.ProductTypeEnum;
import jakarta.persistence.*;
import lombok.*;

/**
 * {@code Product} is an entity class.
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

    @Column(name = "quantity")
    private int quantity;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ProductTypeEnum productType;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cafeteria_id", referencedColumnName = "id")
    private CafeteriaEntity cafeteria;
}
