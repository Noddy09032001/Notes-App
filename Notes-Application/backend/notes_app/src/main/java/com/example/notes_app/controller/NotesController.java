package com.example.notes_app.controller;

import com.example.notes_app.dto.NotesRequestDto;
import com.example.notes_app.dto.NotesResponseDto;
import com.example.notes_app.service.NotesService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springdoc.core.annotations.ParameterObject;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notes")
@CrossOrigin("*")
public class NotesController {

    private final NotesService noteService;

    @Autowired
    public NotesController(NotesService noteService) {
        this.noteService = noteService;
    }

    @PostMapping
    @Operation(description = "add new note", summary = "create new note and save it in the database")
    public ResponseEntity<NotesResponseDto> createNote(@RequestBody NotesRequestDto noteRequestDto) {
        return ResponseEntity.ok(noteService.createNote(noteRequestDto));
    }

    @PostMapping("/{noteId}/tags/{tagId}")
    @Operation(description = "add new tag to the note", summary = "adding a new tag to the existing note")
    public ResponseEntity<NotesResponseDto> addTagToNote(@PathVariable Long noteId, @PathVariable Long tagId) {
        return ResponseEntity.ok(noteService.addTagToNote(noteId, tagId));
    }

    @DeleteMapping("/{noteId}/tags/{tagId}")
    @Operation(description = "remove tag from the note", summary = "removing a tag from the existing note")
    public ResponseEntity<NotesResponseDto> removeTagFromNote(@PathVariable Long noteId, @PathVariable Long tagId) {
        return ResponseEntity.ok(noteService.removeTagFromNote(noteId, tagId));
    }

    @GetMapping("/{id}")
    @Operation(description = "get note by id", summary = "getting the note by the id from the database")
    public ResponseEntity<NotesResponseDto> getNoteById(@PathVariable Long id) {
        return ResponseEntity.ok(noteService.getNoteById(id));
    }

    @GetMapping
    @Operation(description = "get all the notes", summary = "getting all the notes from the database")
    public ResponseEntity<Page<NotesResponseDto>> getAllNotes(@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(noteService.getAllNotes(pageable));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "delete note by the id from the database", description = "delete a note")
    public ResponseEntity<Void> deleteNoteById(@PathVariable Long id) {
        noteService.deleteNoteById(id);
        return ResponseEntity.noContent().build();
    }
}
