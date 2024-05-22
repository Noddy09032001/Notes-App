package com.example.notes_app.model;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "notes_tag")
public class NoteTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "note_id", nullable = false)
    private Notes note;

    @ManyToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tags tag;

    public NoteTag(){}

    public NoteTag(Long id, Notes note, Tags tag) {
        this.id = id;
        this.note = note;
        this.tag = tag;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Notes getNote() {
        return note;
    }

    public void setNote(Notes note) {
        this.note = note;
    }

    public Tags getTag() {
        return tag;
    }

    public void setTag(Tags tag) {
        this.tag = tag;
    }
}
