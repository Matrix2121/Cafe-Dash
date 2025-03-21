package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderProductDTO;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * @author ZapryanZapryanov, AngelStoynov
 */

public class OrderProductMapper {

    public static OrderProductDTO mapToDTO(OrderProductEntity orderProductEntity) throws DataMappingException {
        if (orderProductEntity == null) {
            throw new DataMappingException("OrderProductEntity cannot be null.");
        }

        return new OrderProductDTO(
                orderProductEntity.getId(),
                orderProductEntity.getOrder().getId(),
                orderProductEntity.getProduct().getId(),
                orderProductEntity.getProductPrice(),
                orderProductEntity.getProductQuantity()
        );
    }

    public static OrderProductEntity mapToEntity(OrderProductDTO orderProductDTO) throws DataMappingException {
        if (orderProductDTO == null)
            throw new DataMappingException("OrderProductDTO cannot be null.");

        return OrderProductEntity.builder()
                .id(orderProductDTO.id())
                .productPrice(orderProductDTO.productPrice())
                .productQuantity(orderProductDTO.productQuantity())
                .build();
    }
}
