package com.example.notes_app.model;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "notes")
public class Notes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;

    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<NoteTag> noteTags;

    public Notes(){}

    public Notes(Long id, String title, String description, Set<NoteTag> noteTags) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.noteTags = noteTags;
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

    public Set<NoteTag> getNoteTags() {
        return noteTags;
    }

    public void setNoteTags(Set<NoteTag> noteTags) {
        this.noteTags = noteTags;
    }
}
