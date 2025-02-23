package com.cafe.backend.entity.employee;

import jakarta.persistence.Entity;
import lombok.NoArgsConstructor;

/**
 * {@code EmployeeBulgarian} extends the base class {@link Employee}.
 * The subclass is responsible for setting the rating for a specific country.
 * @author AngelStoynov
 */

@Entity
@NoArgsConstructor

public abstract class EmployeeBulgarian extends Employee {
    private static final double MIN_RATING = 0.0;
    private static final double MAX_RATING = 5.0;

    public EmployeeBulgarian(double salary, String location, double rating, String phoneNumber) {
        super(salary, location, rating, phoneNumber);
    }

    @Override
    protected void validateRating(double rating) {
        if (rating < MIN_RATING || rating > MAX_RATING) {
            throw new IllegalArgumentException("Employee rating cannot be lower than " + MIN_RATING + " and bigger than " + MAX_RATING);
        }
    }
}
