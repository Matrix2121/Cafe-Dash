package com.cafe.backend.controller;

import java.util.List;

import com.cafe.backend.dto.OrderStatusDTO;
import com.cafe.backend.enums.OrderStatusEnum;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.service.OrderService;

/**
 * The {@code OrderController} serves as the RESTful API entry point for managing orders.
 *
 * <p>This controller handles HTTP requests from the frontend and interacts with the service layer
 * to perform CRUD operations on {@link OrderDTO} objects, including filtering by status and user.</p>
 *
 * <p>It supports creation, retrieval, update, and status management of orders in the system.</p>
 *
 * @author ZapryanZapryanov
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    /**
     * Service layer responsible for business logic related to orders.
     */
    @Autowired
    private OrderService orderService;

    /**
     * Retrieves all orders in the system.
     *
     * @return A list of {@link OrderDTO} objects representing all orders.
     * @throws NotFoundException if no orders are found.
     * @throws BadRequestException if a request error occurs.
     */
    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<OrderDTO> getAllOrders() throws NotFoundException, BadRequestException {
        return orderService.getAllOrders();
    }

    /**
     * Retrieves orders by their status.
     *
     * @param status The {@link OrderStatusEnum} to filter orders by.
     * @return A list of orders matching the provided status.
     * @throws NotFoundException if no orders are found with the given status.
     * @throws BadRequestException if the provided status is invalid.
     */
    @GetMapping("/status")
    @ResponseStatus(code = HttpStatus.OK)
    public List<OrderDTO> getOrdersByStatus(@RequestParam("status") OrderStatusEnum status) throws NotFoundException, BadRequestException {
        return orderService.getOrdersByStatus(status);
    }

    /**
     * Retrieves a single order by its unique identifier.
     *
     * @param id The ID of the order to retrieve.
     * @return The matching {@link OrderDTO}.
     * @throws NotFoundException if no order is found with the given ID.
     * @throws BadRequestException if the provided ID is invalid.
     */
    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public OrderDTO getOrderById(@PathVariable("id") Long id) throws NotFoundException, BadRequestException {
        return orderService.getOrderById(id);
    }

    /**
     * Creates a new order.
     *
     * @param orderDTO The order data to be created.
     * @return The created {@link OrderDTO}.
     * @throws NotFoundException if related entities are missing.
     * @throws BadRequestException if the input is invalid.
     */
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) throws NotFoundException, BadRequestException {
        return orderService.createOrder(orderDTO);
    }

    /**
     * Updates an existing order by its ID.
     *
     * @param id The ID of the order to be updated.
     * @param orderDTO The updated order data.
     * @return The updated {@link OrderDTO}.
     * @throws NotFoundException if the order does not exist.
     * @throws BadRequestException if the input is invalid.
     */
    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDTO updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) throws NotFoundException, BadRequestException {
        return orderService.updateOrder(id, orderDTO);
    }

    /**
     * Updates the status of a specific order.
     *
     * @param id The ID of the order whose status is to be updated.
     * @param orderStatusEnum The new status wrapped in a {@link OrderStatusDTO}.
     * @return The updated {@link OrderDTO} with the new status.
     * @throws NotFoundException if the order is not found.
     * @throws BadRequestException if the status is invalid.
     */
    @PutMapping("/status/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDTO updateOrderStatus(@PathVariable Long id, @RequestBody OrderStatusDTO orderStatusEnum) throws NotFoundException, BadRequestException {
        return orderService.updateOrderStatus(id, orderStatusEnum);
    }

    /**
     * Retrieves all orders placed by a specific user.
     *
     * @param id The ID of the user.
     * @return A list of orders associated with the user.
     * @throws NotFoundException if the user or their orders are not found.
     * @throws BadRequestException if the user ID is invalid.
     */
    @GetMapping("/user/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<OrderDTO> getOrdersByUserId(@PathVariable("userId") Long id) throws NotFoundException, BadRequestException {
        return orderService.getOrdersByUserId(id);
    }
}