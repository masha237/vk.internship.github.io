package com.example.vk.service;

import com.example.vk.domain.File;
import com.example.vk.domain.User;
import com.example.vk.domain.UserInfo;
import com.example.vk.exception.ValidationException;
import com.example.vk.form.LoginForm;
import com.example.vk.form.RegisterForm;
import com.example.vk.repository.UserRepository;
import com.example.vk.utils.FileUploadUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<User> findById(long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByLoginAndPassword(LoginForm loginForm) {
        return userRepository.findByLoginAndPassword(loginForm.getLogin(), loginForm.getPassword());
    }

    public Optional<User> findByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    public User register(RegisterForm registerForm) {
        if (!userRepository.findByLogin(registerForm.getLogin()).isEmpty()) {
            throw new ValidationException("Not unique login");
        }
        if (registerForm.getAge() < 0) {
            throw new ValidationException("Invalid age");
        }

        User newUser = new User();
        UserInfo newUserInfo = new UserInfo();
        newUserInfo.setAge(registerForm.getAge());
        newUserInfo.setCity(registerForm.getCity());
        newUserInfo.setUniversity(registerForm.getUniversity());
        newUserInfo.setUsername(registerForm.getUsername());
        if (registerForm.getAvatar() != null) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(registerForm.getAvatar().getOriginalFilename()));
            newUserInfo.setFileName(fileName);
        }
        newUser.setLogin(registerForm.getLogin());
        newUser.setPassword(registerForm.getPassword());
        newUser.setUserInfo(newUserInfo);
        try {
            User savedUser = userRepository.save(newUser);

            String uploadDir = "user-photos/" + savedUser.getLogin();
            if (newUserInfo.getFileName() != null) {
                FileUploadUtil.saveFile(uploadDir, newUserInfo.getFileName(), registerForm.getAvatar());
            }
        } catch (Exception e) {
            throw new ValidationException("Register failed", e);
        }
        return newUser;
    }

    public File sendFile(String login, String fileName) throws IOException {
        return FileUploadUtil.sendFile("user-photos/" + login, fileName);
    }

    public void addFriend(User first, User second) {
        first.getFriends().add(second);
        first.getFriendOf().add(second);
        userRepository.save(first);
    }

    public void deleteFriend(User first, User second) {
        first.getFriends().remove(second);
        first.getFriendOf().remove(second);
        userRepository.save(first);
    }


}
