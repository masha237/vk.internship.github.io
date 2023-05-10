package com.example.vk.form;

import org.springframework.web.multipart.MultipartFile;

public class PostForm {
    private String title;
    private String text;

    private String jwt;

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    private MultipartFile image;

    public void setImage(MultipartFile image) {
        this.image = image;
    }

    public MultipartFile getImage() {
        return image;
    }

    public PostForm() {
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setText(String text) {
        this.text = text;
    }


    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }
}
