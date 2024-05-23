package com.example.notes_app.dto;

import java.util.ArrayList;
import java.util.List;

public class NotesResponseDto {

    private Long id;
    private String title;
    private String description;
    private List<TagsDto> tags = new ArrayList<>();

    public NotesResponseDto(){}

    public NotesResponseDto(Long id, String title, String description, List<TagsDto> tags) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.tags = tags;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<TagsDto> getTags() {
        return tags;
    }

    public void setTags(List<TagsDto> tags) {
        this.tags = tags;
    }
}
