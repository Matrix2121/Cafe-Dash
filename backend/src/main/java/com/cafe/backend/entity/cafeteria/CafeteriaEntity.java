package com.cafe.backend.entity.cafeteria;

import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.enums.DeliveryStatusEnum;
import com.cafe.backend.enums.UserTypeEnum;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

/**
 * {@code Cafeteria} is an abstract entity class.
 * @author AngelStoynov
 */

@Entity
@Table(name = "cafeteria")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

public class CafeteriaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "brand", length = 100, nullable = false)
    private String brand;

    @Column(name = "location", length = 100, nullable = false)
    private String location;

    @Column(name = "rating")
    private double rating;

    @Column(name = "count_reviews")
    private int countReview;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "delivery_status", nullable = false)
    private DeliveryStatusEnum deliveryStatus;
}