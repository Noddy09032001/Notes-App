package com.example.notes_app.service;

import com.example.notes_app.dto.TagsDto;
import java.util.List;

public interface TagsService {

    TagsDto createTag(TagsDto tagsDto);
    TagsDto getTagById(Long id);
    List<TagsDto> getAllTags();
    TagsDto updateTag(Long id, TagsDto tagsDto);
    void deleteTagById(Long id);
}
