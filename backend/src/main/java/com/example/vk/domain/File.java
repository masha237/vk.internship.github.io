package com.example.vk.domain;

public class File {
    private String base64;
    private String type;

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getBase64() {
        return base64;
    }

    public String getType() {
        return type;
    }
}
