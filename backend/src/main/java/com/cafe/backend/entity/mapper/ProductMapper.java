package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.product.Product;
import com.cafe.backend.exception.DataMappingException;

public class ProductMapper {

    private ProductMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static ProductDTO mapToProductDTO(Product product) {
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null.");
        }
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

    public static Product mapToProduct(ProductDTO productDTO) {
        try{
            return new Product(
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
