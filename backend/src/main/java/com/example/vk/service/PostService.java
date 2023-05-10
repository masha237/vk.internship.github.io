package com.example.vk.service;

import com.example.vk.domain.Post;
import com.example.vk.domain.User;
import com.example.vk.domain.UserInfo;
import com.example.vk.exception.ValidationException;
import com.example.vk.form.PostForm;
import com.example.vk.form.RegisterForm;
import com.example.vk.repository.PostRepository;
import com.example.vk.utils.FileUploadUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;
import java.util.Optional;

@Service
public class PostService {

    PostRepository postRepository;

    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Optional<Post> findById(long id) {
        return postRepository.findById(id);
    }

    public Post write(PostForm postForm, User user) {
        Post newPost = new Post();
        newPost.setUser(user);
        newPost.setTitle(postForm.getTitle());
        newPost.setText(postForm.getText());
        if (postForm.getImage() != null) {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(postForm.getImage().getOriginalFilename()));
            newPost.setFileName(fileName);
        }
        try {
            Post savedPost = postRepository.save(newPost);

            String uploadDir = "user-photos/" + user.getLogin();
            if (savedPost.getFileName() != null) {
                FileUploadUtil.saveFile(uploadDir, savedPost.getFileName(), postForm.getImage());
            }
        } catch (Exception e) {
            throw new ValidationException("Write post failed", e);
        }
        return newPost;
    }


    public boolean like(Post post, User user) {
        if (post.getLikes().contains(user)) {
            post.getLikes().remove(user);
            postRepository.save(post);
            return false;
        } else {
            post.getLikes().add(user);
            postRepository.save(post);
            return true;
        }
    }
}
