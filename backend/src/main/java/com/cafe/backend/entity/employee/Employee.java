package com.cafe.backend.entity.employee;

import com.cafe.backend.entity.account.UserAccount;
import jakarta.persistence.*;
import lombok.*;

/**
 * {@code Employee} is an abstract entity class. Extends {@link UserAccount}.
 * @author AngelStoynov
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@Table(name = "employee")
@Data
@Builder
@NoArgsConstructor

public abstract class Employee extends UserAccount {

    @Column(name = "salary")
    private double salary;

    @Column(name = "location", length = 100, nullable = false)
    private String location;

    @Column(name = "rating")
    private double rating;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    public Employee(double salary, String location, double rating, String phoneNumber) {
        this.salary = salary;
        this.location = location;
        setRating(rating);
        this.phoneNumber = phoneNumber;
    }

    /**
     * The abstract method {@code validateRating} must be handled in the subclasses of {@link Employee}.
     */
    protected abstract void validateRating(double rating);

    /**
     * The method {@code setRating} is used in the constructor to set the validated rating.
     */
    private void setRating(double rating) {
        validateRating(rating);
        this.rating = rating;
    }
}
