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
 * The {@code OrderController} serves as the RESTful API entry point for managing cafeterias.
 * <p>This controller handles HTTP requests from the frontend and interacts with the service layer
 * to perform CRUD operations on orders.</p>
 *
 * @author ZapryanZapryanov
 */

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	@Autowired private OrderService orderService;

    @GetMapping
    @ResponseStatus(code = HttpStatus.OK)
    public List<OrderDTO> getAllOrders() throws NotFoundException, BadRequestException {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public OrderDTO getOrderById(@PathVariable("id") Long id) throws NotFoundException, BadRequestException {
        return orderService.getOrderById(id);
    }
    
    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public OrderDTO createOrder(@RequestBody OrderDTO orderDTO) throws NotFoundException, BadRequestException {
        return orderService.createOrder(orderDTO);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public OrderDTO updateOrder(@PathVariable Long id, @RequestBody OrderDTO orderDTO) throws NotFoundException, BadRequestException {
        return orderService.updateOrder(id, orderDTO);
    }

    @PatchMapping("/{id}/status")
    @ResponseStatus(HttpStatus.OK)
    public OrderDTO updateOrderStatus(@PathVariable Long id, @RequestBody OrderStatusDTO orderStatusEnum) throws NotFoundException, BadRequestException {
        return orderService.updateOrderStatus(id, orderStatusEnum);
    }
    
    @GetMapping("/user/{userId}")
    @ResponseStatus(value = HttpStatus.OK)
    public List<OrderDTO> getOrdersByUserId(@PathVariable("userId") Long id) throws NotFoundException, BadRequestException {
        return orderService.getOrdersByUserId(id);
    }
}
