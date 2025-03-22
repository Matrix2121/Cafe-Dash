package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.OrderProductDTO;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

/**
 * @author ZapryanZapryanov, AngelStoynov
 */

public class OrderMapper {

    public static OrderDTO mapToDTO(OrderEntity orderEntity) throws DataMappingException {
        if (orderEntity == null) {
            throw new DataMappingException("OrderEntity cannot be null");
        }

        Set<OrderProductDTO> orderProductDTOs = new HashSet<>();
        Set<OrderProductEntity> orderProductEntities = orderEntity.getOrderProducts();

        return new OrderDTO(
                orderEntity.getId(),
                orderEntity.getDiscount(),
                orderEntity.getReadyPickupTime(),
                orderEntity.getStatus(),
                orderEntity.getTip(),
                orderEntity.getUser().getId(),
                orderEntity.getCafeteria().getId(),
                calculateTotalPrice(orderProductEntities, orderProductDTOs),
                orderProductDTOs
        );
    }

    public static OrderEntity mapToEntity(OrderDTO orderDTO) throws DataMappingException {
        if (orderDTO == null) {
            throw new DataMappingException("OrderDTO cannot be null");
        }

        return OrderEntity.builder()
                .id(orderDTO.id())
                .discount(orderDTO.discount())
                .readyPickupTime(orderDTO.readyPickupTime())
                .status(orderDTO.status())
                .tip(orderDTO.tip())
                .build();
    }

    private static double calculateTotalPrice(Set<OrderProductEntity> orderProductEntities, Set<OrderProductDTO> orderProductDTOs) throws DataMappingException {
        double totalPrice = 0.0;
        for (OrderProductEntity orderProductEntity : orderProductEntities) {
            orderProductDTOs.add(OrderProductMapper.mapToDTO(orderProductEntity));
            totalPrice += orderProductEntity.getProductPrice() * orderProductEntity.getProductQuantity();
        }
        return totalPrice;
    }
}
