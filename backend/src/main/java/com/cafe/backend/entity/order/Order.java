package com.cafe.backend.entity.order;

import com.cafe.backend.entity.cafeteria.Cafeteria;
import com.cafe.backend.entity.employee.Employee;
import com.cafe.backend.entity.product.Product;
import com.cafe.backend.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;
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

    @Column(name = "amount")
    private Double amount;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "expected_delivery")
    private LocalDateTime expectedDelivery;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "tip_amount")
    private Integer tip;

    @ManyToOne
    @JoinColumn(name = "employee_id", referencedColumnName = "id", nullable = false)
    private Employee employee;

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
