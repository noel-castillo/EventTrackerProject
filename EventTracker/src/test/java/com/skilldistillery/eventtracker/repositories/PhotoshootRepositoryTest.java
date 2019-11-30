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

@RunWith(SpringRunner.class)
@SpringBootTest
class PhotoshootRepositoryTest {

	@Autowired
	private PhotoshootRepository repo;

	@Test
	@DisplayName("Test photoshoot repository find by id")
	void test() {

		Optional<Photoshoot> opt = repo.findById(1);
		assertTrue(opt.isPresent());
		Photoshoot photoshoot = opt.get();
		assertEquals("Annie", photoshoot.getUser().getName());
	}

}
