package com.skilldistillery.eventtracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.User;
import com.skilldistillery.eventtracker.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;

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
			return repo.saveAndFlush(user);
		}
	}

	@Override
	public User updateUser(String email, User user) {
		User existingUser = repo.findById(email).get();
		existingUser.setName(user.getName());
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
