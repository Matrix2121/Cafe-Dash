package com.cafe.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cafe.backend.entity.order_product.OrderProductEntity;

/**
 * The {@code OrderProductRepository} provides database access for {@link OrderProductEntity}
 * using Spring Data JPA.
 *
 * <p>This repository supports basic CRUD operations and includes custom queries
 * for retrieving only non-deleted order-product relationships.</p>
 *
 * <p>The logical deletion model is respected by filtering with {@code isDeleted = false}.</p>
 *
 * <p>Used in the service layer to fetch order items associated with a specific order.</p>
 *
 * @author — VasilStoynov, ZapryanZaprinov
 */
@Repository
public interface OrderProductRepository extends JpaRepository<OrderProductEntity, Long> {

	/**
	 * Retrieves all {@link OrderProductEntity} records where {@code isDeleted = false}.
	 *
	 * @return A list of active (non-deleted) order-product entities.
	 */
	List<OrderProductEntity> findAllByIsDeletedFalse();

	/**
	 * Retrieves all order-product entities by order ID, filtered by {@code isDeleted = false}.
	 *
	 * @param orderId The ID of the order to filter by.
	 * @return A list of active order-product entities associated with the specified order.
	 */
	List<OrderProductEntity> findByOrderIdAndIsDeletedFalse(Long orderId);
}