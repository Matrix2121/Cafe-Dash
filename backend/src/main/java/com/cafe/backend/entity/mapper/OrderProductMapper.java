 package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderProductDTO;
import com.cafe.backend.entity.order_product.OrderProductEntity;

/**
 * @author ZapryanZapryanov
 */

public class OrderProductMapper {
    public static OrderProductDTO toDTO(OrderProductEntity orderProductEntity) {
        if (orderProductEntity == null) return null;

        return new OrderProductDTO(
                orderProductEntity.getId(),
                orderProductEntity.getOrder().getId(),
                orderProductEntity.getProduct().getId(),
                orderProductEntity.getProductPrice(),
                orderProductEntity.getProductQuantity()
        );
    }

    public static OrderProductEntity toEntity(OrderProductDTO orderProductDTO) {
        if (orderProductDTO == null) return null;

        return OrderProductEntity.builder()
                .id(orderProductDTO.id())
                .productPrice(orderProductDTO.productPrice())
                .productQuantity(orderProductDTO.productQuantity())
                .build();
    }
}
