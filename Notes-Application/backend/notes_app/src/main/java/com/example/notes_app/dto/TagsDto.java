package com.example.notes_app.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
public class TagsDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String name;

    public TagsDto() {
    }

    public TagsDto(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "TagsDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
