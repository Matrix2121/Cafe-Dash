package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;

/**
 * @author ZapryanZapryanov
 */

public class ProductMapper {
    public static ProductDTO toDTO(ProductEntity productEntity) {
        if (productEntity == null) return null;

        return new ProductDTO(
                productEntity.getId(),
                productEntity.getName(),
                productEntity.getPrice(),
                productEntity.getProductType(),
                productEntity.getCafeteria().getId()
        );
    }

    public static ProductEntity toEntity(ProductDTO productDTO, CafeteriaEntity cafeteriaEntity) {
        if (productDTO == null) return null;

        return ProductEntity.builder()
                .id(productDTO.id())
                .name(productDTO.name())
                .price(productDTO.price())
                .productType(productDTO.productType())
                .cafeteria(cafeteriaEntity)
                .build();
    }
}
