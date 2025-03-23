package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

public interface OrderService {
	OrderDTO createOrder(OrderDTO orderDTO) throws NotFoundException, BadRequestException;
	OrderDTO getOrderById(Long id) throws NotFoundException, BadRequestException;
	List<OrderDTO> getAllOrders() throws NotFoundException, BadRequestException;
	OrderDTO updateOrder(Long id, OrderDTO updatedOrderDTO) throws NotFoundException, BadRequestException;
}
