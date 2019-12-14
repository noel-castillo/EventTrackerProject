package com.skilldistillery.eventtracker.repositories;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.skilldistillery.eventtracker.entities.Photoshoot;
import com.skilldistillery.eventtracker.entities.PhotoshootImage;

@RunWith(SpringRunner.class)
@SpringBootTest
class PhotoshootImageRepositoryTest {

	@Autowired
	private PhotoshootImageRepository repo;

	@Test
	@DisplayName("Test photoshoot image repository find by id")
	void test() {

		Optional<PhotoshootImage> opt = repo.findById(1);
		assertTrue(opt.isPresent());
		PhotoshootImage photoshootImage = opt.get();
		assertEquals("Annie", photoshootImage.getPhotoshoot().getUser().getUsername());
	}

}
