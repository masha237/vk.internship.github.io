package com.example.vk.controller;

import com.example.vk.domain.File;
import com.example.vk.domain.Post;
import com.example.vk.domain.User;
import com.example.vk.exception.ValidationException;
import com.example.vk.form.RequestData;
import com.example.vk.service.JwtService;
import com.example.vk.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;
    @GetMapping("userInfo")
    public ResponseEntity<?> getInfo(@RequestParam String login) {
        User user = userService.findByLogin(login).orElseThrow(() -> new ValidationException("invalid login or password"));
        return ResponseEntity.ok(user.getUserInfo());
    }

    @GetMapping("file")
    public ResponseEntity<?> getFile(@RequestParam String login, @RequestParam String fileName) {
        try {
            File file = userService.sendFile(login, fileName);
            return ResponseEntity.ok(file);
        } catch (Exception e) {
            return ResponseEntity.ok(null);
        }
    }

    @GetMapping("login")
    public ResponseEntity<?> login(@RequestParam String jwt) {
        User user = validateUser(jwt);
        return ResponseEntity.ok(user.getLogin());
    }

    @GetMapping("friends")
    public ResponseEntity<?> getFriends(@RequestParam String login) {
        User user = userService.findByLogin(login).orElseThrow(() -> new ValidationException("invalid login or password"));
        return ResponseEntity.ok(user.getFriends());
    }

    @GetMapping("friendsPosts")
    public ResponseEntity<?> getFriendsPosts(@RequestParam String login) {
        User user = userService.findByLogin(login).orElseThrow(() -> new ValidationException("invalid login or password"));
        Set<User> friends = user.getFriends();
        List<Post> friendsPost = new ArrayList<>();
        for (User curUser: friends) {
            friendsPost.addAll(curUser.getPosts());
        }
        friendsPost.addAll(user.getPosts());
        friendsPost.sort(Comparator.comparing(Post::getCreationTime).reversed());
        return ResponseEntity.ok(friendsPost);
    }

    @GetMapping("posts")
    public ResponseEntity<?> getPosts(@RequestParam String login) {
        User user = userService.findByLogin(login).orElseThrow(() -> new ValidationException("invalid login or password"));
        return ResponseEntity.ok(user.getPosts());
    }

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PostMapping("addFriend")
    public ResponseEntity<?> addFriend(@RequestBody RequestData<String> json) {
        User curUser = validateUser(json.getJwt());
        User friedUser = userService.findByLogin(json.getData()).orElseThrow(() -> new ValidationException("unknown user"));
        if (curUser.getId() == friedUser.getId()) {
            throw new ValidationException("invalid operation: you can't add yourself as a friend");
        }
        if (curUser.getFriends().contains(friedUser)) {
            throw new ValidationException("you are already friends");
        }

        userService.addFriend(curUser, friedUser);

        return ResponseEntity.ok("you are friends now");
    }

    @PostMapping("deleteFriend")
    public ResponseEntity<?> deleteFriend(@RequestBody RequestData<String> json) {
        User curUser = validateUser(json.getJwt());
        System.out.println(json.getJwt());
        System.out.println(json.getData());

        User friedUser = userService.findByLogin(json.getData()).orElseThrow(() -> new ValidationException("unknown user"));
        if (!curUser.getFriends().contains(friedUser)) {
            throw new ValidationException("invalid operation: you aren't friends");
        }
        userService.deleteFriend(curUser, friedUser);

        return ResponseEntity.ok(String.format("you removed %s from friends", friedUser.getUserInfo().getUsername()));
    }


    private User validateUser(String jwt) {
        return jwtService.find(jwt).orElseThrow(() -> new ValidationException("invalid session"));
    }

}
