package com.example.notes_app.service;

import com.example.notes_app.dto.NotesRequestDto;
import com.example.notes_app.dto.NotesResponseDto;
import com.example.notes_app.dto.TagsDto;
import com.example.notes_app.model.NoteTag;
import com.example.notes_app.model.Notes;
import com.example.notes_app.model.Tags;
import com.example.notes_app.repository.NoteTagRepository;
import com.example.notes_app.repository.NotesRepository;
import com.example.notes_app.repository.TagsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotesServiceImplementation implements NotesService{

    private final NotesRepository notesRepository;
    private final TagsRepository tagsRepository;
    private final NoteTagRepository noteTagRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public NotesServiceImplementation(NotesRepository notesRepository, TagsRepository tagsRepository, NoteTagRepository noteTagRepository, ModelMapper modelMapper) {
        this.notesRepository = notesRepository;
        this.tagsRepository = tagsRepository;
        this.noteTagRepository = noteTagRepository;
        this.modelMapper = modelMapper;
    }


    @Override
    public NotesResponseDto createNote(NotesRequestDto noteRequestDto) {
        Notes note = modelMapper.map(noteRequestDto, Notes.class);
        note = notesRepository.save(note);

        // Add tags if provided in the request
        if (noteRequestDto.getTags() != null) {
            List<Tags> tags = tagsRepository.findAllById(noteRequestDto.getTags());
            for (Tags tag : tags) {
                NoteTag noteTag = new NoteTag();
                noteTag.setNote(note);
                noteTag.setTag(tag);
                noteTagRepository.save(noteTag);
            }
        }

        return mapNoteToResponseDto(note);
    }

    @Override
    public NotesResponseDto addTagToNote(Long noteId, Long tagId) {
        Notes note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        Tags tag = tagsRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        NoteTag noteTag = new NoteTag();
        noteTag.setNote(note);
        noteTag.setTag(tag);
        noteTagRepository.save(noteTag);

        return mapNoteToResponseDto(note);
    }

    @Override
    public NotesResponseDto removeTagFromNote(Long noteId, Long tagId) {
        Notes note = notesRepository.findById(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        Tags tag = tagsRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        noteTagRepository.deleteByNoteIdAndTagId(noteId, tagId);
        return mapNoteToResponseDto(note);
    }

    @Override
    public NotesResponseDto getNoteById(Long id) {
        Notes note = notesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
        return mapNoteToResponseDto(note);
    }

    @Override
    public Page<NotesResponseDto> getAllNotes(Pageable pageable) {
        Page<Notes> notes = notesRepository.findAll(pageable);
        return notes.map(this::mapNoteToResponseDto);
    }

    @Override
    public void deleteNoteById(Long id) {
        notesRepository.deleteById(id);
    }

    private NotesResponseDto mapNoteToResponseDto(Notes note) {
        NotesResponseDto responseDto = modelMapper.map(note, NotesResponseDto.class);

        List<NoteTag> noteTags = noteTagRepository.findByNoteId(note.getId());
        List<TagsDto> tagsDto = noteTags.stream()
                .map(noteTag -> modelMapper.map(noteTag.getTag(), TagsDto.class))
                .collect(Collectors.toList());

        responseDto.setTags(tagsDto);
        return responseDto;
    }
}