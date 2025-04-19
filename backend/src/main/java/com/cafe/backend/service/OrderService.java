package com.cafe.backend.service;

import java.util.List;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.OrderStatusDTO;
import com.cafe.backend.enums.OrderStatusEnum;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;
import org.springframework.web.bind.annotation.RequestBody;

public interface OrderService {
	OrderDTO createOrder(OrderDTO orderDTO) throws NotFoundException, BadRequestException;
	OrderDTO getOrderById(Long id) throws NotFoundException, BadRequestException;
	List<OrderDTO> getAllOrders() throws NotFoundException, BadRequestException;
	List<OrderDTO> getOrdersByStatus(OrderStatusEnum status) throws NotFoundException, DataMappingException;
	List<OrderDTO> getOrdersByUserId(Long userId) throws NotFoundException, BadRequestException;
	OrderDTO updateOrder(Long id, OrderDTO updatedOrderDTO) throws NotFoundException, BadRequestException;
	OrderDTO updateOrderStatus(Long id, OrderStatusDTO orderStatusDTO) throws NotFoundException, BadRequestException;
}
