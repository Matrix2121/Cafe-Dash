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
 * The {@code CafeteriaController} serves as the RESTful API entry point for
 * managing cafeterias.
 *
 * <p>This controller handles HTTP requests from the frontend and interacts with
 * the service layer to perform CRUD operations on {@link CafeteriaDTO} objects.</p>
 *
 * <p>Supported operations include creation, retrieval (by ID and list), and update of cafeterias.</p>
 *
 * @author AngelStoynov
 */
@RestController
@RequestMapping("/api/cafeterias")
public class CafeteriaController {

    /**
     * Service layer responsible for the business logic related to cafeterias.
     */
    @Autowired
    private CafeteriaService cafeteriaService;

    /**
     * Creates a new cafeteria based on the provided {@link CafeteriaDTO}.
     *
     * @param cafeteriaDTO The data of the cafeteria to be created.
     * @return The created cafeteria as a {@link CafeteriaDTO}.
     * @throws BadRequestException if input validation fails or required fields are missing.
     */
    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public CafeteriaDTO createCafeteria(@RequestBody CafeteriaDTO cafeteriaDTO) throws BadRequestException {
        return cafeteriaService.createCafeteria(cafeteriaDTO);
    }

    /**
     * Retrieves a cafeteria by its unique identifier.
     *
     * @param id The ID of the cafeteria to retrieve.
     * @return The matching cafeteria as a {@link CafeteriaDTO}.
     * @throws BadRequestException if the ID is invalid or null.
     * @throws NotFoundException if no cafeteria is found with the given ID.
     */
    @GetMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public CafeteriaDTO getCafeteriaById(@PathVariable("id") Long id) throws BadRequestException, NotFoundException {
        return cafeteriaService.getCafeteriaById(id);
    }

    /**
     * Retrieves a list of all cafeterias in the system.
     *
     * @return A list of all cafeterias as {@link CafeteriaDTO} objects.
     * @throws BadRequestException if a request error occurs.
     * @throws NotFoundException if no cafeterias are found.
     */
    @GetMapping
    @ResponseStatus(value = HttpStatus.OK)
    public List<CafeteriaDTO> getAllCafeterias() throws BadRequestException, NotFoundException {
        return cafeteriaService.getAllCafeterias();
    }

    /**
     * Updates an existing cafeteria with the provided updated information.
     *
     * @param id The ID of the cafeteria to update.
     * @param updatedCafeteriaDTO The updated cafeteria data.
     * @return The updated cafeteria as a {@link CafeteriaDTO}.
     * @throws NotFoundException if the cafeteria with the specified ID does not exist.
     * @throws BadRequestException if the request is invalid or contains bad data.
     */
    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public CafeteriaDTO updateCafeteria(@PathVariable("id") Long id, @RequestBody CafeteriaDTO updatedCafeteriaDTO)
            throws NotFoundException, BadRequestException {
        return cafeteriaService.updateCafeteria(id, updatedCafeteriaDTO);
    }
}
