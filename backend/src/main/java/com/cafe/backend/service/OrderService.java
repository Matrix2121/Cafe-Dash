package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.exception.ResourceNotFoundException;

public interface OrderService {
	List<OrderDTO> getAllOrders() throws ResourceNotFoundException;
	OrderDTO getOrderById(Long id) throws ResourceNotFoundException;
	OrderDTO createOrder(OrderDTO orderDTO) throws ResourceNotFoundException;
	OrderDTO updateOrder(Long id, OrderDTO updatedOrderDTO) throws ResourceNotFoundException;
}
