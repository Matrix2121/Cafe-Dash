package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.entity.cafeteria.CafeteriaEntity;
import com.cafe.backend.entity.product.ProductEntity;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;

public class CafeteriaMapper {

    private CafeteriaMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static CafeteriaDTO mapToCafeteriaDTO(CafeteriaEntity cafeteria) throws DataMappingException {
        if (cafeteria == null) {
            throw new DataMappingException("Cafeteria cannot be null");
        }

        try {
            Set<ProductDTO> productDTOs = new HashSet<>();
            for (ProductEntity product : cafeteria.getProducts()) {
                ProductDTO productDTO = ProductMapper.mapToProductDTO(product);
                productDTOs.add(productDTO);
            }

            return new CafeteriaDTO(
                    cafeteria.getId(),
                    cafeteria.getName(),
                    cafeteria.getBrand(),
                    cafeteria.getLocation(),
                    cafeteria.getRating(),
                    cafeteria.getPhoneNumber(),
                    cafeteria.getDeliveryStatus(),
                    productDTOs
            );
        } catch (Exception e) {
            throw new DataMappingException("Could not map to cafeteriaDTO", e);
        }
    }

    public static CafeteriaEntity mapToCafeteria(CafeteriaDTO cafeteriaDTO) throws DataMappingException {
        try {
            CafeteriaEntity cafeteria = new CafeteriaEntity(
                    cafeteriaDTO.id(),
                    cafeteriaDTO.name(),
                    cafeteriaDTO.brand(),
                    cafeteriaDTO.location(),
                    cafeteriaDTO.rating(),
                    cafeteriaDTO.phoneNumber(),
                    cafeteriaDTO.cafeteriaDeliveryStatus(),
                    new HashSet<>()
            );
            if (cafeteriaDTO.products() != null) {
                Set<ProductEntity> productEntities = new HashSet<>();
                for (ProductDTO productDTO : cafeteriaDTO.products()) {
                    ProductEntity productEntity = ProductMapper.mapToProduct(productDTO);
                    productEntities.add(productEntity);
                }
                cafeteria.setProducts(productEntities);
            }
            return cafeteria;
        } catch (Exception e) {
            throw new DataMappingException("Could not map to product", e);
        }
    }
}
