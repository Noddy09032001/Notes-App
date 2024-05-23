package com.example.notes_app.service;

import com.example.notes_app.dto.NotesRequestDto;
import com.example.notes_app.dto.NotesResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NotesService {

    NotesResponseDto createNote(NotesRequestDto noteRequestDto);
    NotesResponseDto addTagToNote(Long noteId, Long tagId);
    NotesResponseDto removeTagFromNote(Long noteId, Long tagId);
    NotesResponseDto getNoteById(Long id);
    Page<NotesResponseDto> getAllNotes(Pageable pageable);
    void deleteNoteById(Long id);
}
