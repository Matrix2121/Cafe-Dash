package com.cafe.backend.entity.customer;

import com.cafe.backend.entity.account.UserAccount;
import com.cafe.backend.entity.order.Order;
import com.cafe.backend.enums.UserType;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

/**
 * {@code Customer} is an entity class. Extends {@link UserAccount}.
 * @author AngelStoynov
 */

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Builder

public abstract class Customer extends UserAccount {

    @Column(name = "balance")
    private double balance;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @ManyToMany
    @JoinTable(
            name = "customer_order",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "order_id")
    )
    private Set<Order> orders;

    public Customer() {
    }

    public Customer(Long id, String username, String password, UserType userType, double balance, String phoneNumber, Set<Order> orders) {
        super(id, username, password, userType);
        this.balance = balance;
        this.phoneNumber = phoneNumber;
        this.orders = orders;
    }

}
