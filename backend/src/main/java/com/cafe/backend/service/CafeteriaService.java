package com.cafe.backend.service;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.dto.ProductDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;

import java.util.List;

/**
 * {@code CafeteriaService} is an interface that defines basic CRUD methods.
 * 
 * @author AngelStoynov
 */
public interface CafeteriaService {
    CafeteriaDTO createCafeteria(CafeteriaDTO cafeteriaDTO) throws BadRequestException;

    CafeteriaDTO getCafeteriaById(Long id) throws NotFoundException, BadRequestException;

    List<CafeteriaDTO> getAllCafeterias() throws NotFoundException, BadRequestException;

    CafeteriaDTO updateCafeteria(Long id, CafeteriaDTO cafeteriaDTO) throws NotFoundException, BadRequestException;

    List<ProductDTO> getAllProductsForCafeteriaId(Long id) throws NotFoundException;
}
