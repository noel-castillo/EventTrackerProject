package com.skilldistillery.eventtracker.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.skilldistillery.eventtracker.entities.User;
import com.skilldistillery.eventtracker.repositories.UserRepository;

@Repository
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User register(User user) {
		String encodedPW = encoder.encode(user.getPassword());
		user.setPassword(encodedPW); // only persist encoded password

		// set other fields to default values

		repo.saveAndFlush(user);
		return user;
	}

	@Override
	public List<User> findAllUsers() {
		return repo.findAll();
	}

	@Override
	public User findUserByEmail(String email) {
		return repo.findById(email).get();
	}

	@Override
	public User createUser(User user) {

		if (repo.findById(user.getEmail()).isPresent()) {
			return null;
		} else {
			user.setRole("standard");
			user.setEnabled(true);
			return repo.saveAndFlush(user);
		}
	}

	@Override
	public User updateUser(String email, User user) {
		User existingUser = repo.findById(email).get();
		existingUser.setUsername(user.getUsername());
		existingUser.setPassword(user.getPassword());

		return repo.saveAndFlush(existingUser);
	}

	@Override
	public boolean deleteUserByEmail(String email) {

		if (repo.existsById(email)) {
			repo.deleteById(email);
			return true;
		} else {
			return false;
		}
	}

}
