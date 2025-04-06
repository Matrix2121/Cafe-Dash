package com.cafe.backend.data;

import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.entity.review.ReviewEntity;
import com.cafe.backend.entity.role.RoleEntity;
import com.cafe.backend.enums.OrderStatusEnum;
import com.cafe.backend.enums.ProductTypeEnum;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

public class TestData {

    public static CafeteriaEntity createTestCafeteria() {
        return CafeteriaEntity.builder()
                .name("cafe")
                .brand("star")
                .location("pz")
                .rating(2)
                .openingHour(LocalTime.parse("06:00"))
                .closingHour(LocalTime.parse("18:00"))
                .isDeleted(false)
                .countReview(10)
                .phoneNumber("+359890553312")
                .imageUrl("url")
                .build();
    }

    public static UserEntity createTestUser() {
        return UserEntity.builder()
                .username("active")
                .email("email_active")
                .password("password")
                .roles(null)
                .orders(null)
                .reviews(null)
                .isDeleted(false)
                .build();
    }

    public static ProductEntity createTestProduct(CafeteriaEntity cafeteria) {
        return ProductEntity.builder()
                .name("product")
                .price(1)
                .productType(ProductTypeEnum.DRINKS)
                .cafeteria(cafeteria)
                .imageUrl("url")
                .isDeleted(false)
                .build();
    }

    public static ReviewEntity createTestReview(UserEntity savedUser, CafeteriaEntity savedCafeteria) {
        return ReviewEntity.builder()
                .title("title")
                .body("body")
                .rating(1)
                .createdAt(LocalDateTime.now())
                .isDeleted(false)
                .user(savedUser)
                .cafeteria(savedCafeteria)
                .build();
    }

    public static RoleEntity createTestRole() {
        return RoleEntity.builder()
                .roleName("customer")
                .isDeleted(false)
                .build();
    }

    public static OrderEntity createTestOrder(UserEntity user, CafeteriaEntity cafeteria, List<OrderProductEntity> orderProducts) {
        OrderEntity order = new OrderEntity();
        order.setUser(user);
        order.setCafeteria(cafeteria);
        order.setStatus(OrderStatusEnum.POSTPONED);
        order.setTip(1.0);
        order.setDiscount(10);
        order.setReadyPickupTime(LocalDateTime.now().plusMinutes(30));
        order.setOrderProducts(orderProducts);
        order.setDeleted(false);

        if (orderProducts != null) {
            orderProducts.forEach(op -> op.setOrder(order));
        }

        return order;
    }

    public static OrderProductEntity createTestOrderProduct(ProductEntity product, OrderEntity order) {
        return OrderProductEntity.builder()
                .order(order)
                .product(product)
                .productQuantity(1)
                .productPrice(product.getPrice())
                .isDeleted(false)
                .build();
    }
}
