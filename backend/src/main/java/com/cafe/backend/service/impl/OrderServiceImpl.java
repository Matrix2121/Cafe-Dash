package com.cafe.backend.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

/**
 * @author ZapryanZapryanov
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

    public List<OrderDTO> getAllOrders() throws ResourceNotFoundException {
        List<OrderEntity> ordersList = orderRepository.findAllByIsDeletedFalse();
        if (ordersList.isEmpty()) {
            throw new ResourceNotFoundException("No orders found");
        }
        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (OrderEntity entity : ordersList) {
            orderDTOs.add(OrderMapper.mapToDTO(entity));
        }
        return orderDTOs;
    }

    public OrderDTO getOrderById(Long id) throws ResourceNotFoundException {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + id));
        return OrderMapper.mapToDTO(order);
    }

    public OrderDTO createOrder(OrderDTO orderDTO) throws ResourceNotFoundException {
        Set<OrderProductEntity> orderProductEntities = new HashSet<>();

        for (OrderProductDTO orderProduct : orderDTO.orderProducts()) {
            ProductEntity productEntity = productRepository.findById(orderProduct.productId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Product not found with id: " + orderProduct.productId()));

            OrderProductEntity orderProductEntity = new OrderProductEntity();
            orderProductEntity.setOrder(null);
            orderProductEntity.setDeleted(false);
            orderProductEntity.setProduct(productEntity);
            orderProductEntity.setProductQuantity(orderProduct.productQuantity());
            orderProductEntity.setProductPrice(orderProduct.productPrice());
            orderProductEntities.add(orderProductEntity);
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

        for (OrderProductEntity orderProductEntity : orderProductEntities) {
            orderProductEntity.setOrder(savedOrder);
        }

        orderProductRepository.saveAll(orderProductEntities);
        savedOrder.setOrderProducts(orderProductEntities);

        return OrderMapper.mapToDTO(savedOrder);
    }

    public OrderDTO updateOrder(Long id, OrderDTO updatedOrderDTO) throws ResourceNotFoundException {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product does no exist with this id: " + id));
        order.setDiscount(updatedOrderDTO.discount());
        order.setReadyPickupTime(updatedOrderDTO.readyPickupTime());
        order.setStatus(updatedOrderDTO.status());
        order.setTip(updatedOrderDTO.tip());
        OrderEntity savedOrder = orderRepository.save(order);
        return OrderMapper.mapToDTO(savedOrder);
    }
}
