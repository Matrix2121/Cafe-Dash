package com.cafe.backend.entity.order;

import com.cafe.backend.entity.account.UserAccountEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.enums.OrderStatusEnum;
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
@Getter
@Setter

public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "amount", updatable = false, insertable = false)
    @Formula("(SELECT COALESCE(SUM(p.price), 0) FROM order_product op " +
            "JOIN product p ON op.product_id = p.id " +
            "WHERE op.order_id = orders.id) " +
            "* (1 - COALESCE(orders.discount, 0) / 100) + COALESCE(orders.tip_amount, 0)")
    private double amount;

    @Column(name = "discount")
    private int discount;

    @Column(name = "expected_delivery")
    private LocalDateTime expectedDelivery;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatusEnum status;

    @Column(name = "tip_amount")
    private int tip;

    @ManyToOne
    @JoinColumn(name = "cafeteria_id", referencedColumnName = "id", nullable = false)
    private CafeteriaEntity cafeteria;

    @ManyToMany
    @JoinTable(
            name = "order_product",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private Set<ProductEntity> products;
}
