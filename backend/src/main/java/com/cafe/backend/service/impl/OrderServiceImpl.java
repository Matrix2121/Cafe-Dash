package com.cafe.backend.service.impl;

import java.util.List;
import java.util.LinkedList;
import java.util.stream.Collectors;

import com.cafe.backend.dto.OrderStatusDTO;
import com.cafe.backend.enums.OrderStatusEnum;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.DataMappingException;
import com.cafe.backend.exception.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.OrderProductDTO;
import com.cafe.backend.entity.account.UserEntity;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.mapper.OrderMapper;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.ResourceNotFoundException;
import com.cafe.backend.repository.CafeteriaRepository;
import com.cafe.backend.repository.OrderProductRepository;
import com.cafe.backend.repository.OrderRepository;
import com.cafe.backend.repository.ProductRepository;
import com.cafe.backend.repository.UserRepository;
import com.cafe.backend.service.OrderService;

import jakarta.transaction.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

/**
 * @author ZapryanZapryanov, AngelStoynov
 */

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    // we should be using services instead of repositories
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private CafeteriaRepository cafeteriaRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private OrderProductRepository orderProductRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public OrderDTO createOrder(OrderDTO orderDTO) throws ResourceNotFoundException, DataMappingException, BadRequestException {
        if (orderDTO.userId() == null) {
            throw new BadRequestException("User ID must not be null");
        }
        if (orderDTO.cafeteriaId() == null) {
            throw new BadRequestException("Cafeteria ID must not be null");
        }
        if (orderDTO.orderProducts() == null || orderDTO.orderProducts().isEmpty()) {
            throw new BadRequestException("Order must contain at least one product");
        }
        
        CafeteriaEntity cafeteriaEntity = cafeteriaRepository.findById(orderDTO.cafeteriaId())
                .orElseThrow(
                        () -> new ResourceNotFoundException("Cafeteria not found with id: " + orderDTO.cafeteriaId()));

        UserEntity user = userRepository.findById(orderDTO.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + orderDTO.userId()));

        OrderEntity orderToSave = OrderMapper.mapToEntity(orderDTO);
        orderToSave.setCafeteria(cafeteriaEntity);
        orderToSave.setUser(user);
        OrderEntity savedOrder = orderRepository.save(orderToSave);
        List<OrderProductEntity> savedOrderProductEntities = new LinkedList<>();

        savedOrderProductEntities = setOrderProductEntities(savedOrder, orderDTO);
        
        savedOrder.setOrderProducts(savedOrderProductEntities);

        OrderEntity finalOrder = orderRepository.save(savedOrder);

        return OrderMapper.mapToDTO(finalOrder);
    }

    @Override
    public OrderDTO getOrderById(Long id) throws ResourceNotFoundException, DataMappingException {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + id));
        return OrderMapper.mapToDTO(order);
    }

    @Override
    public List<OrderDTO> getAllOrders() throws ResourceNotFoundException, DataMappingException {
        List<OrderEntity> orderEntities = orderRepository.findAllByIsDeletedFalse();
        if (orderEntities.isEmpty()) {
            throw new ResourceNotFoundException("No orders found");
        }
        List<OrderDTO> orderDTOs = new LinkedList<>();
        for (OrderEntity entity : orderEntities) {
            orderDTOs.add(OrderMapper.mapToDTO(entity));
        }
        return orderDTOs;
    }

    @Override
    public List<OrderDTO> getOrdersByStatus(OrderStatusEnum status) throws NotFoundException, DataMappingException {
        List<OrderEntity> orders = orderRepository.findByStatus(status);
        if (orders.isEmpty()) {
            throw new ResourceNotFoundException("No orders found with status: " + status);
        }
        List<OrderDTO> orderDTOs = new LinkedList<>();
        for (OrderEntity entity : orders) {
            orderDTOs.add(OrderMapper.mapToDTO(entity));
        }
        return orderDTOs;
    }

    @Override
    public List<OrderDTO> getOrdersByUserId(Long userId) throws NotFoundException, BadRequestException {
        List<OrderEntity> orderEntities = orderRepository.findByUserIdAndIsDeletedFalse(userId);
        if (orderEntities.isEmpty()) {
            throw new ResourceNotFoundException("No orders found");
        }
        List<OrderDTO> orderDTOs = new LinkedList<>();
        for (OrderEntity entity : orderEntities) {
            orderDTOs.add(OrderMapper.mapToDTO(entity));
        }
        return orderDTOs;
    }

    @Override
    public OrderDTO updateOrder(Long id, OrderDTO updatedOrderDTO) throws ResourceNotFoundException, DataMappingException {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + id));
        order.setDiscount(updatedOrderDTO.discount());
        order.setReadyPickupTime(updatedOrderDTO.readyPickupTime());
        order.setStatus(updatedOrderDTO.status());
        order.setTip(updatedOrderDTO.tip());
        OrderEntity savedOrder = orderRepository.save(order);
        return OrderMapper.mapToDTO(savedOrder);
    }

    @Override
    public OrderDTO updateOrderStatus(Long id, OrderStatusDTO orderStatusDTO) throws NotFoundException, BadRequestException {

        if (orderStatusDTO == null) {
            throw new BadRequestException("Cannot update the status of the order with id: " + id + " because orderStatusDTO is null.");
        }

        OrderEntity orderEntity = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order does not exist with this id: " + id));
        orderEntity.setStatus(orderStatusDTO.orderStatusEnum());
        orderRepository.save(orderEntity);
        return OrderMapper.mapToDTO(orderEntity);
    }

    private List<OrderProductEntity> setOrderProductEntities(OrderEntity savedOrder, OrderDTO orderDTO) throws ResourceNotFoundException {
        List<OrderProductEntity> orderProductEntities = new LinkedList<>();
        for (OrderProductDTO orderProduct : orderDTO.orderProducts()) {
            ProductEntity productEntity = productRepository.findById(orderProduct.productId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Product not found with id: " + orderProduct.productId()));

            OrderProductEntity orderProductEntity = new OrderProductEntity();
            orderProductEntity.setOrder(savedOrder);
            orderProductEntity.setProduct(productEntity);
            orderProductEntity.setProductPrice(orderProduct.productPrice());
            orderProductEntity.setProductQuantity(orderProduct.productQuantity()); 
            orderProductEntity.setDeleted(false);
            orderProductEntities.add(orderProductEntity);
        }

        List<OrderProductEntity> savedOrderProducts = new LinkedList<>();
        savedOrderProducts = orderProductRepository.saveAll(orderProductEntities);

        return savedOrderProducts;
    }
}
