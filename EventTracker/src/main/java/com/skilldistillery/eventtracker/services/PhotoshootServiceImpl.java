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
}
