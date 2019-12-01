package com.skilldistillery.eventtracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Photoshoot;
import com.skilldistillery.eventtracker.entities.User;
import com.skilldistillery.eventtracker.repositories.AddressRepository;
import com.skilldistillery.eventtracker.repositories.PhotoshootRepository;
import com.skilldistillery.eventtracker.repositories.UserRepository;

@Service
public class PhotoshootServiceImpl implements PhotoshootService {

	@Autowired
	private PhotoshootRepository psRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private AddressRepository addrRepo;

	@Override
	public List<Photoshoot> findAllPhotoshootsByUser(String email) {
		User user = userRepo.findById(email).get();
		return user.getPhotoshoots();
	}

	@Override
	public List<Photoshoot> findAllPhotoshoots() {
		return psRepo.findAll();
	}

	@Override
	public Photoshoot createPhotoshoot(Photoshoot photoshoot, String email) {

		User user = userRepo.findById(email).get();
		photoshoot.setUser(user);
		photoshoot.setAddress(addrRepo.saveAndFlush(photoshoot.getAddress()));
		return psRepo.saveAndFlush(photoshoot);
	}

	@Override
	public Photoshoot updatePhotoshoot(Photoshoot photoshoot, int id) {

		if (psRepo.existsById(id)) {
			Photoshoot existingPs = psRepo.findById(id).get();

			existingPs.setLength(photoshoot.getLength());
			existingPs.setDescription(photoshoot.getDescription());
			existingPs.getAddress().setStreet(photoshoot.getAddress().getStreet());
			existingPs.getAddress().setCity(photoshoot.getAddress().getCity());
			existingPs.getAddress().setState(photoshoot.getAddress().getState());
			existingPs.getAddress().setZip(photoshoot.getAddress().getZip());
			existingPs.getAddress().setPhone(photoshoot.getAddress().getPhone());

			return psRepo.saveAndFlush(existingPs);
		} else {
			return null;
		}
	}

	@Override
	public boolean deletePhotoshootById(int psId) {
		if (psRepo.existsById(psId)) {
			psRepo.deleteById(psId);
			return true;
		} else {
			return false;
		}
	}
}
