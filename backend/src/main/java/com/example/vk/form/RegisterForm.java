package com.example.vk.form;

import org.springframework.web.multipart.MultipartFile;

public class RegisterForm {
    private String login;
    private String password;
    private String username;
    private String city;
    private String university;
    private int age;
    private MultipartFile avatar;

    public void setAvatar(MultipartFile avatar) {
        this.avatar = avatar;
    }

    public MultipartFile getAvatar() {
        return avatar;
    }

    public RegisterForm() {
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public String getCity() {
        return city;
    }

    public String getUniversity() {
        return university;
    }

    public int getAge() {
        return age;
    }
}
