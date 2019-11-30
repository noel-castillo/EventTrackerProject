package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Photoshoot;

public interface PhotoshootService {

	List<Photoshoot> findAllPhotoshootsByUser(String email);

	List<Photoshoot> findAllPhotoshoots();

}
