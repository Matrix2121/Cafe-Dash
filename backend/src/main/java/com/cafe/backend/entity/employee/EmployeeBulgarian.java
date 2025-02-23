package com.cafe.backend.entity.employee;

import com.cafe.backend.entity.account.UserAccount;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 * {@code EmployeeBulgarian} extends the base class {@link Employee}.
 * The subclass is responsible for setting the rating for a specific country.
 * @author AngelStoynov
 */

@Table(name = "employee")
@Entity

public class EmployeeBulgarian extends Employee {
    private static final double MIN_RATING = 0.0;
    private static final double MAX_RATING = 5.0;

    public EmployeeBulgarian(Long id, Double salary, String location, Double rating, String phone_number, UserAccount userAccount) {
        super(id, salary, location, rating, phone_number, userAccount);
    }

    @Override
    protected void validateRating(double rating) {
        if (rating < MIN_RATING || rating > MAX_RATING) {
            throw new IllegalArgumentException("Employee rating cannot be lower than " + MIN_RATING + " and bigger than " + MAX_RATING);
        }
    }
}
