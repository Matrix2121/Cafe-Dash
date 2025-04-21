package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.OrderProductDTO;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.order_product.OrderProductEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.List;
import java.util.LinkedList;

/**
 * The {@code OrderMapper} is a utility class used for converting between
 * {@link OrderEntity} and {@link OrderDTO}.
 *
 * <p>It handles the transformation of full order data, including embedded product information,
 * discount, tip, status, and relationships with users and cafeterias.</p>
 *
 * <p>This class is commonly used in the service layer to prepare entities for persistence
 * or DTOs for API responses.</p>
 *
 * @author ZapryanZapryanov, AngelStoynov
 */
public class OrderMapper {

    /**
     * Converts an {@link OrderEntity} into an {@link OrderDTO}, including order products and calculated total price.
     *
     * @param orderEntity The entity to be converted.
     * @return A fully populated {@link OrderDTO}.
     * @throws DataMappingException if the entity is null or a nested mapping fails.
     */
    public static OrderDTO mapToDTO(OrderEntity orderEntity) throws DataMappingException {
        if (orderEntity == null) {
            throw new DataMappingException("OrderEntity cannot be null");
        }

        List<OrderProductDTO> orderProductDTOs = new LinkedList<>();
        List<OrderProductEntity> orderProductEntities = orderEntity.getOrderProducts();

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

    /**
     * Converts an {@link OrderDTO} into an {@link OrderEntity} for persistence.
     *
     * <p>Note: This method builds a partial entity with the assumption that related user and cafeteria entities
     * will be set elsewhere in the business logic.</p>
     *
     * @param orderDTO The DTO to be converted.
     * @return A basic {@link OrderEntity} with core fields set.
     * @throws DataMappingException if the DTO is null.
     */
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

    /**
     * Calculates the total price for the given list of order-product entities
     * and populates the corresponding list of {@link OrderProductDTO}s.
     *
     * @param orderProductEntities The list of entities containing product price and quantity.
     * @param orderProductDTOs The list to be populated with mapped {@link OrderProductDTO}s.
     * @return The total calculated price of the order.
     * @throws DataMappingException if mapping of a product fails.
     */
    private static double calculateTotalPrice(List<OrderProductEntity> orderProductEntities, List<OrderProductDTO> orderProductDTOs) throws DataMappingException {
        double totalPrice = 0.0;
        for (OrderProductEntity orderProductEntity : orderProductEntities) {
            orderProductDTOs.add(OrderProductMapper.mapToDTO(orderProductEntity));
            totalPrice += orderProductEntity.getProductPrice() * orderProductEntity.getProductQuantity();
        }
        return totalPrice;
    }
}