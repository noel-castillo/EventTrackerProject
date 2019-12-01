package com.skilldistillery.eventtracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Photoshoot;
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

	@Override
	public PhotoshootImage createPhotoshootImage(PhotoshootImage psImage, int psId) {

		Photoshoot existingPs = psRepo.findById(psId).get();
		psImage.setPhotoshoot(existingPs);
		psImage = imgRepo.saveAndFlush(psImage);
		existingPs.addPhotoshootImage(psImage);

		return psImage;
	}

	@Override
	public boolean deletePhotoshootImageById(int imgId, int psId) {

		if (imgRepo.existsById(imgId)) {
			Photoshoot ps = psRepo.findById(psId).get();
			ps.removePhotoshootImage(imgRepo.findById(imgId).get());
			imgRepo.deleteById(imgId);
			return true;
		} else {
			return false;
		}
	}
}
