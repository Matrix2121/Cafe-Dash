package com.cafe.backend.repository;

import java.util.List;

import com.cafe.backend.enums.OrderStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cafe.backend.entity.order.OrderEntity;

/**
 * The {@code OrderRepository} interface provides data access methods for {@link OrderEntity}
 * using Spring Data JPA.
 *
 * <p>This repository supports CRUD operations and includes custom queries
 * for retrieving orders based on deletion status, user association, and order status.</p>
 *
 * <p>It is designed to work with logically deleted records (via {@code isDeleted = false}) to
 * ensure soft-deletion behavior across the application.</p>
 *
 * <p>Used by the service layer for retrieving orders in various contexts, such as by user,
 * status, or ID.</p>
 *
 * @author —ZapryanZapryanov, VasilStoykov, AngelStoynov
 */
@Repository
public interface OrderRepository extends JpaRepository<OrderEntity, Long> {

	/**
	 * Retrieves all non-deleted orders.
	 *
	 * @return A list of orders where {@code isDeleted = false}.
	 */
	List<OrderEntity> findAllByIsDeletedFalse();

	/**
	 * Retrieves a specific non-deleted order by its ID.
	 *
	 * @param id The ID of the order.
	 * @return A list containing the order if found and not deleted.
	 */
	List<OrderEntity> findByIdAndIsDeletedFalse(Long id);

	/**
	 * Retrieves all non-deleted orders associated with a specific user.
	 *
	 * @param id The ID of the user.
	 * @return A list of orders belonging to the specified user.
	 */
	List<OrderEntity> findByUserIdAndIsDeletedFalse(Long id);

	/**
	 * Retrieves all orders with the specified status, regardless of deletion.
	 *
	 * @param status The {@link OrderStatusEnum} to filter by.
	 * @return A list of orders with the given status.
	 */
	List<OrderEntity> findByStatus(OrderStatusEnum status);
}
