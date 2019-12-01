package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.Photoshoot;

public interface PhotoshootService {

	List<Photoshoot> findAllPhotoshootsByUser(String email);

	List<Photoshoot> findAllPhotoshoots();

	Photoshoot createPhotoshoot(Photoshoot photoshoot, String email);

	Photoshoot updatePhotoshoot(Photoshoot photoshoot, int id);

	boolean deletePhotoshootById(int psId);

	Photoshoot findPhotoshootById(int psId);

}
