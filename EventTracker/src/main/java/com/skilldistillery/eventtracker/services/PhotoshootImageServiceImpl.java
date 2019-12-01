package com.skilldistillery.eventtracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.PhotoshootImage;
import com.skilldistillery.eventtracker.repositories.PhotoshootImageRepository;
import com.skilldistillery.eventtracker.repositories.PhotoshootRepository;

@Service
public class PhotoshootImageServiceImpl implements PhotoshootImageService {

	@Autowired
	private PhotoshootImageRepository imgRepo;

	@Autowired
	private PhotoshootRepository psRepo;

	@Override
	public List<PhotoshootImage> findImagesOfPhotoshootById(int psId) {

		return psRepo.findById(psId).get().getPhotoshootImages();
	}
}
