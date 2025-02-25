package com.cafe.backend.service;

import com.cafe.backend.dto.CafeteriaDTO;

import java.util.List;

/**
 * {@code CafeteriaService} is an interface that defines basic CRUD methods.
 * @author AngelStoynov
 */
public interface CafeteriaService {
    CafeteriaDTO getCafeteriaById(Long id);
    List<CafeteriaDTO> getAllCafeterias();
    CafeteriaDTO createCafeteria(CafeteriaDTO cafeteriaDTO);
}
