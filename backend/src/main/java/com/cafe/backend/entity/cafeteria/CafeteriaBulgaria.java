package com.cafe.backend.entity.cafeteria;

import com.cafe.backend.entity.product.Product;
import com.cafe.backend.enums.CafeteriaDeliveryStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * {@code CafeteriaBulgarian} extends the base class {@link Cafeteria}.
 * The subclass is responsible for setting the rating for a specific country.
 * @author AngelStoynov
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("cafeteria_bulgaria")

public class CafeteriaBulgaria extends Cafeteria {
    private static final double MIN_RATING = 0.0;
    private static final double MAX_RATING = 5.0;
    private static final String PHONE_NUMBER_REGEX = "^\\+359[0-9]{9}$";

    public CafeteriaBulgaria() {
        super();
    }

    public CafeteriaBulgaria(Long id, String name, String location, double rating, String phoneNumber, CafeteriaDeliveryStatus cafeteriaDeliveryStatus, Set<Product> products) {
        super(id, name, location, rating, phoneNumber, cafeteriaDeliveryStatus, products);
        setRating(rating);
        setPhoneNumber(phoneNumber);
    }

    @Override
    protected void validateRating(double rating) {
        if (rating < MIN_RATING || rating > MAX_RATING) {
            throw new IllegalArgumentException("Cafeteria rating cannot be lower than " + MIN_RATING + " and higher than " + MAX_RATING);
        }
    }

    @Override
    protected void validatePhoneNumber(String phoneNumber) {
        Pattern pattern = Pattern.compile(PHONE_NUMBER_REGEX);
        Matcher matcher = pattern.matcher(phoneNumber);

        if(!matcher.matches()) {
            throw new IllegalArgumentException("Incorrect phone number " + phoneNumber + " it needs to match this expression: " + PHONE_NUMBER_REGEX);
        }
    }
}
