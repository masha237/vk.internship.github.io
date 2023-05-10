package com.example.vk.form;

public class RequestData<T> {
    private String jwt;
    private T data;

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getJwt() {
        return jwt;
    }

    public T getData() {
        return data;
    }

    public RequestData() {
    }
}
