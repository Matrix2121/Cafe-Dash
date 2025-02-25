package com.cafe.backend.entity.mapper;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.entity.cafeteria.Cafeteria;
import com.cafe.backend.entity.cafeteria.CafeteriaBulgaria;
import com.cafe.backend.entity.product.Product;
import com.cafe.backend.exception.DataMappingException;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class CafeteriaMapper {

    private CafeteriaMapper() {
        throw new UnsupportedOperationException("Cannot initialize this class " + getClass().getSimpleName());
    }

    public static CafeteriaDTO mapToCafeteriaDTO(Cafeteria cafeteria) {
        if (cafeteria == null) {
            throw new IllegalArgumentException("Cafeteria cannot be null");
        }
        try {
            return new CafeteriaDTO(
                    cafeteria.getId(),
                    cafeteria.getName(),
                    cafeteria.getLocation(),
                    cafeteria.getRating(),
                    cafeteria.getPhoneNumber(),
                    cafeteria.getCafeteriaDeliveryStatus(),
                    cafeteria.getProducts().stream().map(ProductMapper::mapToProductDTO).collect(Collectors.toSet())
            );
        } catch (Exception e) {
            throw new DataMappingException("Could not map to productDTO", e);
        }
    }

    public static Cafeteria mapToCafeteriaBulgaria(CafeteriaDTO cafeteriaDTO) {
        try {
            CafeteriaBulgaria cafeteriaBulgaria = new CafeteriaBulgaria(
                    cafeteriaDTO.id(),
                    cafeteriaDTO.name(),
                    cafeteriaDTO.location(),
                    cafeteriaDTO.rating(),
                    cafeteriaDTO.phoneNumber(),
                    cafeteriaDTO.cafeteriaDeliveryStatus(),
                    new HashSet<>()
            );
            if (cafeteriaDTO.products() != null) {
                Set<Product> products = cafeteriaDTO.products().stream()
                        .map(ProductMapper::mapToProduct)
                        .collect(Collectors.toSet());

                cafeteriaBulgaria.setProducts(products);
            }
            return cafeteriaBulgaria;
        } catch (Exception e) {
            throw new DataMappingException("Could not map to product", e);
        }
    }
}
