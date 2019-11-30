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

import com.skilldistillery.eventtracker.entities.User;

@RunWith(SpringRunner.class)
@SpringBootTest
class UserRepositoryTest {

	@Autowired
	private UserRepository repo;

	@Test
	@DisplayName("Test user repository find by id")
	void test() {

		Optional<User> opt = repo.findById("noel@es");
		assertTrue(opt.isPresent());
		User user = opt.get();
		assertEquals("Noel", user.getName());
	}

}
