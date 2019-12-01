package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.PhotoshootImage;

public interface PhotoshootImageService {

	List<PhotoshootImage> findImagesOfPhotoshootById(int psId);

	PhotoshootImage createPhotoshootImage(PhotoshootImage photoshootImage, int psId);

	boolean deletePhotoshootImageById(int imgId, int psId);

}
