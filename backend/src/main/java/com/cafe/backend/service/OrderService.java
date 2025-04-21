package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.OrderStatusDTO;
import com.cafe.backend.enums.OrderStatusEnum;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * {@code OrderService} is an interface that defines the methods for managing order-related operations.
 * These methods include creating, retrieving, updating orders, and querying orders by various criteria like status or user ID.
 * <p>
 * The methods in this interface throw {@code BadRequestException}, {@code NotFoundException}, and {@code DataMappingException}
 * when the input is invalid, or when the requested order data is not found.
 * </p>
 *
 * @author VasilStoykov
 */
public interface OrderService {

	/**
	 * Creates a new order.
	 *
	 * @param orderDTO the {@code OrderDTO} containing the data for the new order.
	 * @return the created {@code OrderDTO} with the order details.
	 * @throws NotFoundException if any related data (e.g., user, cafeteria) is not found.
	 * @throws BadRequestException if the provided order data is invalid.
	 */
	OrderDTO createOrder(OrderDTO orderDTO) throws NotFoundException, BadRequestException;

	/**
	 * Retrieves an order by its unique ID.
	 *
	 * @param id the ID of the order to retrieve.
	 * @return the {@code OrderDTO} representing the order with the given ID.
	 * @throws NotFoundException if no order is found with the given ID.
	 * @throws BadRequestException if the provided ID is invalid.
	 */
	OrderDTO getOrderById(Long id) throws NotFoundException, BadRequestException;

	/**
	 * Retrieves a list of all orders.
	 *
	 * @return a list of {@code OrderDTO} representing all orders.
	 * @throws NotFoundException if no orders are found.
	 * @throws BadRequestException if an error occurs while retrieving orders.
	 */
	List<OrderDTO> getAllOrders() throws NotFoundException, BadRequestException;

	/**
	 * Retrieves a list of orders based on their status.
	 *
	 * @param status the {@code OrderStatusEnum} representing the status of the orders.
	 * @return a list of {@code OrderDTO} with the given status.
	 * @throws NotFoundException if no orders are found with the given status.
	 * @throws DataMappingException if an error occurs during data mapping.
	 */
	List<OrderDTO> getOrdersByStatus(OrderStatusEnum status) throws NotFoundException, DataMappingException;

	/**
	 * Retrieves a list of orders placed by a specific user.
	 *
	 * @param userId the ID of the user to retrieve orders for.
	 * @return a list of {@code OrderDTO} representing the orders placed by the given user.
	 * @throws NotFoundException if no orders are found for the given user ID.
	 * @throws BadRequestException if the provided user ID is invalid.
	 */
	List<OrderDTO> getOrdersByUserId(Long userId) throws NotFoundException, BadRequestException;

	/**
	 * Updates an existing order with new data.
	 *
	 * @param id the ID of the order to update.
	 * @param updatedOrderDTO the {@code OrderDTO} containing the updated order data.
	 * @return the updated {@code OrderDTO}.
	 * @throws NotFoundException if no order is found with the given ID.
	 * @throws BadRequestException if the updated order data is invalid.
	 */
	OrderDTO updateOrder(Long id, OrderDTO updatedOrderDTO) throws NotFoundException, BadRequestException;

	/**
	 * Updates the status of an existing order.
	 *
	 * @param id the ID of the order to update.
	 * @param orderStatusDTO the {@code OrderStatusDTO} containing the new status for the order.
	 * @return the updated {@code OrderDTO}.
	 * @throws NotFoundException if no order is found with the given ID.
	 * @throws BadRequestException if the provided order status data is invalid.
	 */
	OrderDTO updateOrderStatus(Long id, OrderStatusDTO orderStatusDTO) throws NotFoundException, BadRequestException;
}