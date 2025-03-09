package com.cafe.backend.entity.product;

import com.cafe.backend.enums.ProductTypeEnum;
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

    public ProductEntity() {
    }

    public ProductEntity(Long id, String name, double price, int quantity, ProductTypeEnum productType) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.productType = productType;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public int getQuantity() {
        return quantity;
    }

    public ProductTypeEnum getProductType() {
        return productType;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setProductType(ProductTypeEnum productType) {
        this.productType = productType;
    }
}
