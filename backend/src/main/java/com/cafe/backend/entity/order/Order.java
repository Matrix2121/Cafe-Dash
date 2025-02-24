package com.cafe.backend.entity.order;

import com.cafe.backend.entity.cafeteria.Cafeteria;
import com.cafe.backend.entity.product.Product;
import com.cafe.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Formula;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * {@code Order} is an entity class.
 * @author AngelStoynov
 */

@Data
@Entity
@Builder
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor

public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "amount", updatable = false, insertable = false)
    @Formula("(SELECT COALESCE(SUM(p.price), 0) FROM order_product op " +
            "JOIN product p ON op.product_id = p.id " +
            "WHERE op.order_id = orders.id) " +
            "* (1 - COALESCE(orders.discount, 0) / 100) + COALESCE(orders.tip_amount, 0)")
    private Double amount;

    @Column(name = "discount")
    private int discount;

    @Column(name = "expected_delivery")
    private LocalDateTime expectedDelivery;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "tip_amount")
    private int tip;

    @ManyToOne
    @JoinColumn(name = "cafeteria_id", referencedColumnName = "id", nullable = false)
    private Cafeteria cafeteria;

    @ManyToMany
    @JoinTable(
            name = "order_product",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<Product> products;
}
