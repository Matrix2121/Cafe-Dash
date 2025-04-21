package com.cafe.backend.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

/**
 * The {@code SwaggerConfig} class configures the Swagger/OpenAPI documentation for the application.
 *
 * <p>This configuration sets up the public API group and enables JWT bearer authentication
 * to be visible and usable within the Swagger UI.</p>
 *
 * <p>Endpoints under {@code /**} are included in the documented API group.</p>
 *
 * <p>JWT-based security is configured using a bearer authentication scheme, allowing secured
 * endpoints to be tested directly via the Swagger interface.</p>
 *
 * @author ZapryanZapryanov
 */
@Configuration
public class SwaggerConfig {

    /**
     * Defines the public API group to be included in Swagger documentation.
     *
     * @return A {@link GroupedOpenApi} bean for all public endpoints.
     */
    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/**")
                .build();
    }

    /**
     * Configures custom OpenAPI metadata and JWT bearer security schema.
     *
     * @return A customized {@link OpenAPI} object used by Swagger UI.
     */
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .info(new Info().title("Cafe-Dash").version("1.0.0"));
    }
}