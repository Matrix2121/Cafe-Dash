package com.cafe.backend.entity.order;

import java.time.LocalDateTime;
import java.util.List;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.enums.OrderStatusEnum;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * {@code OrderEntity} is an entity class representing an order in the system.
 * This class contains details about the order, such as its status, discount, tip, and associated cafeteria and user.
 * <p>
 * The entity is mapped to the {@code orders} table in the database and supports relationships to other entities:
 * - The {@code cafeteria} is linked to a {@code CafeteriaEntity}.
 * - The {@code user} is linked to a {@code UserEntity}.
 * - The order contains a list of products, represented by {@code orderProducts}.
 * </p>
 *
 * @author ZapryanZapryanov
 */
@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "discount")
    private int discount;

    @Column(name = "ready_pickup_time")
    private LocalDateTime readyPickupTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatusEnum status;

    @Column(name = "tip_amount")
    private double tip;

    @ManyToOne
    @JoinColumn(name = "cafeteria_id", referencedColumnName = "id", nullable = false)
    private CafeteriaEntity cafeteria;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UserEntity user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<OrderProductEntity> orderProducts;

    @Column(name = "is_deleted")
    private boolean isDeleted;
}