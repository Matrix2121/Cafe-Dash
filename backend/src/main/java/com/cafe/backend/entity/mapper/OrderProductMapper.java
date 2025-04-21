package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderProductDTO;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * {@code OrderProductMapper} is a utility class used for mapping between {@code OrderProductEntity} and {@code OrderProductDTO}.
 * This class provides methods to convert an {@code OrderProductEntity} to an {@code OrderProductDTO} and vice versa.
 * <p>
 * The methods in this class will throw a {@link DataMappingException} if the input is {@code null}.
 * </p>
 *
 * @author ZapryanZapryanov, AngelStoynov
 */
public class OrderProductMapper {

    /**
     * Maps an {@code OrderProductEntity} to an {@code OrderProductDTO}.
     *
     * @param orderProductEntity the {@code OrderProductEntity} to map.
     * @return a {@code OrderProductDTO} representing the given entity.
     * @throws DataMappingException if the input {@code orderProductEntity} is {@code null}.
     */
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

    /**
     * Maps an {@code OrderProductDTO} to an {@code OrderProductEntity}.
     *
     * @param orderProductDTO the {@code OrderProductDTO} to map.
     * @return a {@code OrderProductEntity} representing the given DTO.
     * @throws DataMappingException if the input {@code orderProductDTO} is {@code null}.
     */
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