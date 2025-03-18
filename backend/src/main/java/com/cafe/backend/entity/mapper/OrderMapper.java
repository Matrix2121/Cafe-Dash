package com.cafe.backend.entity.mapper;

import java.util.HashSet;
import java.util.Set;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.OrderProductDTO;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;

/**
 * @author ZapryanZapryanov
 */

public class OrderMapper {
    public static OrderDTO toDTO(OrderEntity orderEntity) {
        if (orderEntity == null) return null;
       Set<OrderProductDTO> orderProductDTOs = new HashSet<OrderProductDTO>();
       Double totalPrice = 0.0;
       Set<OrderProductEntity> orderProductEntities = orderEntity.getOrderProducts();
       if(orderProductEntities == null) {
    	   return null; // exception
       }
       for(OrderProductEntity orderProductEntity : orderProductEntities) {
    	   orderProductDTOs.add(OrderProductMapper.toDTO(orderProductEntity));
    	   totalPrice += orderProductEntity.getProductPrice()*orderProductEntity.getProductQuantity();
       }
       OrderDTO dto = new OrderDTO(
                orderEntity.getId(),
                orderEntity.getDiscount(),
                orderEntity.getReadyPickupTime(),
                orderEntity.getStatus(),
                orderEntity.getTip(),
                orderEntity.getUser().getId(),
                orderEntity.getCafeteria().getId(),
                totalPrice,
                orderProductDTOs
        );
       return dto;
    }

    public static OrderEntity toEntity(OrderDTO orderDTO) {
        if (orderDTO == null) return null;

        return OrderEntity.builder()
                .id(orderDTO.id())
                .discount(orderDTO.discount())
                .readyPickupTime(orderDTO.readyPickupTime())
                .status(orderDTO.status())
                .tip(orderDTO.tip())
                .build();
    }
}
