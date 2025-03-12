package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.dto.OrderDTO;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.order.OrderEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

public class OrderMapper {

    private OrderMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static OrderDTO mapToOrderDTO(OrderEntity orderEntity) throws DataMappingException {
        try {
            CafeteriaDTO cafeteriaDTO = CafeteriaMapper.mapToCafeteriaDTO(orderEntity.getCafeteria());
            Set<ProductDTO> productDTOSet = new HashSet<>();

            for (ProductEntity productEntity: orderEntity.getProducts()) {
                productDTOSet.add(ProductMapper.mapToProductDTO(productEntity));
            }

            return new OrderDTO(
                    orderEntity.getId(),
                    orderEntity.getAmount(),
                    orderEntity.getDiscount(),
                    orderEntity.getReadyPickupTime(),
                    orderEntity.getStatus(),
                    orderEntity.getTip(),
                    cafeteriaDTO,
                    productDTOSet
            );

        } catch (DataMappingException e) {
            throw new DataMappingException("Could not map to orderDTO", e);
        }
    }

    public static OrderEntity mapToEntity(OrderDTO orderDTO) throws DataMappingException {
        try {
            CafeteriaEntity cafeteria = CafeteriaMapper.mapToCafeteria(orderDTO.cafeteria());
            Set<ProductEntity> productEntities = new HashSet<>();
            for (ProductDTO product: orderDTO.products()) {
                productEntities.add(ProductMapper.mapToProduct(product));
            }
            return new OrderEntity(
                    orderDTO.id(),
                    orderDTO.amount(),
                    orderDTO.discount(),
                    orderDTO.expectedDelivery(),
                    orderDTO.orderStatus(),
                    orderDTO.tip(),
                    cafeteria,
                    productEntities
            );
        } catch (DataMappingException e) {
            throw new DataMappingException("Could not map to orderEntity.", e);
        }
    }
}
