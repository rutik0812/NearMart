package com.nearmart.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.nearmart.security.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(
            AuthenticationProvider authenticationProvider,
            JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

            // ==============================
            // CORS
            // ==============================
            .cors(Customizer.withDefaults())

            // ==============================
            // CSRF
            // ==============================
            .csrf(csrf -> csrf.disable())

            // ==============================
            // STATELESS SESSION
            // ==============================
            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            // ==============================
            // AUTHORIZATION
            // ==============================
            .authorizeHttpRequests(auth -> auth

                // Allow CORS preflight
                .requestMatchers(
                    HttpMethod.OPTIONS,
                    "/**"
                ).permitAll()

                // ==========================
                // PUBLIC USER APIs
                // ==========================
                .requestMatchers(
                    "/users/register",
                    "/users/login"
                ).permitAll()

                // ==========================
                // PUBLIC SHOP REGISTRATION
                // ==========================
                // No login/JWT required
                .requestMatchers(
                    HttpMethod.POST,
                    "/shops"
                ).permitAll()

                // ==========================
                // EVERYTHING ELSE
                // ==========================
                .anyRequest().authenticated()
            )

            // ==============================
            // AUTHENTICATION PROVIDER
            // ==============================
            .authenticationProvider(
                authenticationProvider
            )

            // ==============================
            // JWT FILTER
            // ==============================
            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}