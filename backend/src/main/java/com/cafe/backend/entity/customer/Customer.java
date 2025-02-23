package com.cafe.backend.entity.customer;

import com.cafe.backend.entity.account.UserAccount;
import com.cafe.backend.entity.order.Order;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

/**
 * {@code Customer} is an entity class.
 * @author AngelStoynov
 */

@Data
@Entity
@Builder
@Table(name = "customer")
@NoArgsConstructor
@AllArgsConstructor

public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "balance", columnDefinition = "DOUBLE DEFAULT 0.0")
    private Double balance;

    @Column(name = "location", length = 100, nullable = false)
    private String location;

    @Column(name = "phone_number", nullable = false)
    private String phone_number;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = false)
    private UserAccount userAccount;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Order> orders;
}
