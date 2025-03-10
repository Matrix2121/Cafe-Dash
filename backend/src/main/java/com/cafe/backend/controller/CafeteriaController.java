package com.cafe.backend.controller;

import com.cafe.backend.dto.CafeteriaDTO;
import com.cafe.backend.exception.BadRequestException;
import com.cafe.backend.exception.NotFoundException;
import com.cafe.backend.service.CafeteriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * The {@code CafeteriaController} serves as the RESTful API entry point for managing cafeterias.
 * <p>This controller handles HTTP requests from the frontend and interacts with the service layer
 * to perform CRUD operations on products.</p>
 *
 * @author AngelStoynov
 */

@RestController
@RequestMapping("/api/cafeterias")

public class CafeteriaController {

    @Autowired
    private CafeteriaService cafeteriaService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public CafeteriaDTO createCafeteria(@RequestBody CafeteriaDTO cafeteriaDTO) throws BadRequestException {
        return cafeteriaService.createCafeteria(cafeteriaDTO);
    }

    @GetMapping("{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public CafeteriaDTO getCafeteriaById(@PathVariable("id") Long id) throws BadRequestException, NotFoundException {
        return cafeteriaService.getCafeteriaById(id);
    }

    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<CafeteriaDTO> getAllCafeterias() throws BadRequestException, NotFoundException {
        return cafeteriaService.getAllCafeterias();
    }
}
