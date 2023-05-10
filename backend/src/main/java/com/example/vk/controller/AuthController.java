package com.example.vk.controller;

import com.example.vk.domain.User;
import com.example.vk.exception.ValidationException;
import com.example.vk.form.LoginForm;
import com.example.vk.form.RegisterForm;
import com.example.vk.service.JwtService;
import com.example.vk.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final JwtService jwtService;
    private final UserService userService;

    public AuthController(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm) {
        User user = userService.findByLoginAndPassword(loginForm).orElseThrow(() -> new ValidationException("invalid login or password"));
        return ResponseEntity.ok(jwtService.create(user));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@ModelAttribute RegisterForm registerForm) {
        User user = userService.register(registerForm);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.status(HttpStatus.PERMANENT_REDIRECT).build();
    }
}
