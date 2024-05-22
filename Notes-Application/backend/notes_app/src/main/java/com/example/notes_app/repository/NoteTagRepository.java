package com.example.notes_app.repository;

import com.example.notes_app.model.NoteTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteTagRepository extends JpaRepository<NoteTag, Long> {

    @Query("SELECT nt FROM NoteTag nt WHERE nt.note.id = :noteId")
    List<NoteTag> findByNoteId(@Param("noteId") Long noteId);

    @Query("DELETE FROM NoteTag nt WHERE nt.note.id = :noteId AND nt.tag.id = :tagId")
    void deleteByNoteIdAndTagId(@Param("noteId") Long noteId, @Param("tagId") Long tagId);
}

