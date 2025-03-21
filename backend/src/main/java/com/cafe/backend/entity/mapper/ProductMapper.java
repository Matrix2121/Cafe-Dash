package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.DataMappingException;

/**
 * @author ZapryanZapryanov
 */

public class ProductMapper {

    public static ProductDTO mapToDTO(ProductEntity productEntity) throws DataMappingException {
        if (productEntity == null) {
            throw new DataMappingException("ProductEntity cannot be null");
        }

        return new ProductDTO(
                productEntity.getId(),
                productEntity.getName(),
                productEntity.getPrice(),
                productEntity.getProductType(),
                productEntity.getCafeteria().getId()
        );
    }

    public static ProductEntity mapToEntity(ProductDTO productDTO, CafeteriaEntity cafeteriaEntity) throws DataMappingException {
        if (productDTO == null || cafeteriaEntity == null) {
            throw new DataMappingException("ProductDTO or CafeteriaEntity cannot be null");
        }

        return ProductEntity.builder()
                .id(productDTO.id())
                .name(productDTO.name())
                .price(productDTO.price())
                .productType(productDTO.productType())
                .cafeteria(cafeteriaEntity)
                .build();
    }
}
