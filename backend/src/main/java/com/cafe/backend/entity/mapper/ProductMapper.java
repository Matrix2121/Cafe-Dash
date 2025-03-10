package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.DataMappingException;

public class ProductMapper {

    private ProductMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static ProductDTO mapToProductDTO(ProductEntity product) throws DataMappingException {
        try{
            return new ProductDTO(
                    product.getId(),
                    product.getName(),
                    product.getPrice(),
                    product.getQuantity(),
                    product.getProductType()
            );
        } catch (Exception e) {
            throw new DataMappingException("Could not map to productDTO", e);
        }
    }

    public static ProductEntity mapToProduct(ProductDTO productDTO) throws DataMappingException {
        try{
            return new ProductEntity(
                    productDTO.id(),
                    productDTO.name(),
                    productDTO.price(),
                    productDTO.quantity(),
                    productDTO.productType()
            );
        } catch (Exception e) {
            throw new DataMappingException("Could not map to product entity", e);
        }
    }
}
