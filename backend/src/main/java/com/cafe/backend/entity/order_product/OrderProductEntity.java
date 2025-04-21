package com.cafe.backend.entity.order_product;

import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * {@code OrderProductEntity} is an entity class that represents the association between an order and a product.
 * This class stores information about the specific product included in an order, such as its price, quantity, and order reference.
 * <p>
 * The entity is mapped to the {@code order_product} table in the database and establishes relationships to other entities:
 * - The {@code order} is linked to an {@code OrderEntity}.
 * - The {@code product} is linked to a {@code ProductEntity}.
 * </p>
 *
 * @author ZapryanZapryanov
 */
@Entity
@Data
@Builder
@Table(name = "order_product")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class OrderProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private OrderEntity order;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id", nullable = false)
    private ProductEntity product;

    @Column(name = "product_price", nullable = false)
    private double productPrice;

    @Column(name = "product_quantity", nullable = false)
    private int productQuantity;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}