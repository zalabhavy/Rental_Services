package com.rental.rental.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI rentalOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("🚗 RentWheels - Vehicle Rental API")
                        .description("Industry-grade Vehicle Rental Management System API. "
                                + "Manage branches, vehicles, and bookings with full CRUD operations, "
                                + "search & filtering, dashboard analytics, and more.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Rental Services")
                                .email("contact@rentwheels.com")))
                .servers(List.of(
                        new Server().url("/").description("Current Server")));
    }
}
