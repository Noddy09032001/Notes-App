package com.example.notes_app.service;

import com.example.notes_app.dto.TagsDto;
import com.example.notes_app.model.Tags;
import com.example.notes_app.repository.TagsRepository;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagsServiceImplementation implements TagsService{

    private final TagsRepository tagsRepository;
    private final ModelMapper modelMapper;
    private static final Logger logger = LoggerFactory.getLogger(TagsServiceImplementation.class);

    @Autowired
    public TagsServiceImplementation(TagsRepository tagsRepository, ModelMapper modelMapper) {
        this.tagsRepository = tagsRepository;
        this.modelMapper = modelMapper;
    }
    @Override
    public TagsDto createTag(TagsDto tagsDto) {
        logger.info("The parameters: " + tagsDto.getName());
        Tags tag = modelMapper.map(tagsDto, Tags.class);
        logger.info("Tags object before saving: " + tag);
        try {
            tag = tagsRepository.save(tag);
        } catch (Exception e) {
            logger.error(e.getMessage());
            throw new RuntimeException("Conflict occurred while creating the tag. Please try again.", e);
        }
        return modelMapper.map(tag, TagsDto.class);
    }

    @Override
    public TagsDto getTagById(Long id) {
        Tags tag = tagsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));
        return modelMapper.map(tag, TagsDto.class);
    }

    @Override
    public List<TagsDto> getAllTags() {
        List<Tags> tags = tagsRepository.findAll();
        return tags.stream()
                .map(tag -> modelMapper.map(tag, TagsDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public TagsDto updateTag(Long id, TagsDto tagsDto) {
        Tags tag = tagsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tag not found"));

        tag.setName(tagsDto.getName());
        tag = tagsRepository.save(tag);

        return modelMapper.map(tag, TagsDto.class);
    }

    @Override
    public void deleteTagById(Long id) {
        if (!tagsRepository.existsById(id)) {
            throw new RuntimeException("Tag not found");
        }
        tagsRepository.deleteById(id);
    }
}
