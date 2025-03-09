package com.cafe.backend.entity.customer;

import com.cafe.backend.entity.account.UserAccountEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.enums.UserTypeEnum;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

/**
 * {@code Customer} is an entity class. Extends {@link UserAccountEntity}.
 * @author AngelStoynov
 */

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Builder

public abstract class CustomerEntity extends UserAccountEntity {

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
    private Set<OrderEntity> orders;

    public CustomerEntity() {
    }

    public CustomerEntity(Long id, String username, String password, UserTypeEnum userType, double balance, String phoneNumber, Set<OrderEntity> orders) {
        super(id, username, password, userType);
        this.balance = balance;
        this.phoneNumber = phoneNumber;
        this.orders = orders;
    }

}
