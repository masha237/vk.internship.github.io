package com.example.vk.controller;

import com.example.vk.domain.Post;
import com.example.vk.domain.User;
import com.example.vk.exception.ValidationException;
import com.example.vk.form.PostForm;
import com.example.vk.form.RequestData;
import com.example.vk.service.JwtService;
import com.example.vk.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/post")
public class PostController {
    private final JwtService jwtService;
    private final PostService postService;

    public PostController(JwtService jwtService, PostService postService) {
        this.jwtService = jwtService;
        this.postService = postService;
    }

    @PostMapping("/write")
    public ResponseEntity<?> write(@ModelAttribute PostForm json) {
        User user = jwtService.find(json.getJwt()).orElseThrow(() -> new ValidationException("invalid session"));
        Post post = postService.write(json, user);
        return ResponseEntity.ok(post);
    }

    @PostMapping("/like")
    public ResponseEntity<?> like(@RequestBody RequestData<Long> json) {
        User user = jwtService.find(json.getJwt()).orElseThrow(() -> new ValidationException("invalid session"));
        Post post = postService.findById(json.getData()).orElseThrow(() -> new ValidationException("invalid post"));
        boolean fl = postService.like(post, user);
        if (fl) {
            return ResponseEntity.ok("you liked post");
        } else {
            return ResponseEntity.ok("you unliked post");
        }
    }

}
