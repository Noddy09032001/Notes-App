package com.example.notes_app.controller;

import com.example.notes_app.dto.TagsDto;
import com.example.notes_app.service.TagsService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tags")
@CrossOrigin("*")
public class TagsController {

    private final TagsService tagsService;

    @Autowired
    public TagsController(TagsService tagsService) {
        this.tagsService = tagsService;
    }

    @PostMapping
    @Operation(description = "add new tag", summary = "creating a new tag and adding it to the database")
    public ResponseEntity<TagsDto> createTag(@RequestBody TagsDto tagsDto) {
        return ResponseEntity.ok(tagsService.createTag(tagsDto));
    }

    @GetMapping("/{id}")
    @Operation(description = "get tag by id", summary = "getting the tag by the id from the database")
    public ResponseEntity<TagsDto> getTagById(@PathVariable Long id) {
        return ResponseEntity.ok(tagsService.getTagById(id));
    }

    @GetMapping
    @Operation(description = "get all tags", summary = "getting all the tags from the database")
    public ResponseEntity<List<TagsDto>> getAllTags() {
        return ResponseEntity.ok(tagsService.getAllTags());
    }

    @PutMapping("/{id}")
    @Operation(description = "update tag by id", summary = "updating the tag by the id from the database")
    public ResponseEntity<TagsDto> updateTag(@PathVariable Long id, @RequestBody TagsDto tagsDto) {
        return ResponseEntity.ok(tagsService.updateTag(id, tagsDto));
    }

    @DeleteMapping("/{id}")
    @Operation(description = "delete tag by id", summary = "deleting the tag by the id from the database")
    public ResponseEntity<Void> deleteTagById(@PathVariable Long id) {
        tagsService.deleteTagById(id);
        return ResponseEntity.noContent().build();
    }
}

