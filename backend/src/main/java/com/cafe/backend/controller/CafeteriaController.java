package com.cafe.backend.controller;

import com.cafe.backend.dto.CafeteriaDTO;

import com.cafe.backend.service.CafeteriaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    private final CafeteriaService cafeteriaService;

    public CafeteriaController(CafeteriaService cafeteriaService) {
        this.cafeteriaService = cafeteriaService;
    }

    @GetMapping("{id}")
    public ResponseEntity<CafeteriaDTO> getCafeteriaById(@PathVariable("id") Long id) {
        CafeteriaDTO cafeteria = cafeteriaService.getCafeteriaById(id);
        return ResponseEntity.ok(cafeteria);
    }

    @GetMapping
    public ResponseEntity<List<CafeteriaDTO>> getAllCafeterias() {
        List<CafeteriaDTO> cafeteriaDTOS = cafeteriaService.getAllCafeterias();
        return ResponseEntity.ok(cafeteriaDTOS);
    }

    @PostMapping
    public ResponseEntity<CafeteriaDTO> createCafeteria(@RequestBody CafeteriaDTO cafeteriaDTO){
        CafeteriaDTO cafeteria = cafeteriaService.createCafeteria(cafeteriaDTO);
        return new ResponseEntity<>(cafeteria, HttpStatus.CREATED);
    }
}
