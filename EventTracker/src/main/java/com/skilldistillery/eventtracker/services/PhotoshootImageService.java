package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.PhotoshootImage;

public interface PhotoshootImageService {

	List<PhotoshootImage> findImagesOfPhotoshootById(int psId);

}
