package com.cafe.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * The {@code CorsConfig} class is a Spring configuration component that defines global
 * CORS (Cross-Origin Resource Sharing) settings for the application.
 *
 * <p>This configuration enables frontend applications hosted on different origins to make
 * HTTP requests to the backend, supporting operations like login, registration, and API access.</p>
 *
 * <p>All origins, headers, and standard HTTP methods are allowed. Credentials (such as cookies and tokens)
 * are also supported in cross-origin requests.</p>
 *
 * @author ZapryanZapryanov
 */
@Configuration
public class CorsConfig {

    /**
     * Registers a {@link WebMvcConfigurer} bean to define global CORS rules.
     *
     * @return A configured {@link WebMvcConfigurer} instance that applies CORS settings.
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {

            /**
             * Configures allowed CORS mappings for all endpoints.
             *
             * @param registry The {@link CorsRegistry} used to define path and CORS policies.
             */
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("*")
                        .allowedMethods("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
