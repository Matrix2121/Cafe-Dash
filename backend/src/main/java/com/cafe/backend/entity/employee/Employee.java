package com.cafe.backend.entity.employee;

import com.cafe.backend.entity.account.UserAccount;
import jakarta.persistence.*;
import lombok.*;

/**
 * {@code Employee} is an abstract entity class.
 * @author AngelStoynov
 */

@MappedSuperclass
@Data
@Builder
@NoArgsConstructor

public abstract class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "salary", columnDefinition = "DOUBLE DEFAULT 0.0")
    private Double salary;

    @Column(name = "location", length = 100, nullable = false)
    private String location;

    @Column(name = "rating")
    private Double rating;

    @Column(name = "phone_number", nullable = false)
    private String phone_number;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", unique = true, nullable = false)
    private UserAccount userAccount;

    public Employee(Long id, Double salary, String location, Double rating, String phone_number, UserAccount userAccount) {
        this.id = id;
        this.salary = salary;
        this.location = location;
        setRating(rating);
        this.phone_number = phone_number;
        this.userAccount = userAccount;
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
