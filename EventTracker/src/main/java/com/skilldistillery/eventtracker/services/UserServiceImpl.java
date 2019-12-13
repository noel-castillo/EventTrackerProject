package com.skilldistillery.eventtracker.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.User;
import com.skilldistillery.eventtracker.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository repo;

	static int sockMerchant(int n, int[] ar) {
		List<Integer> newList = new ArrayList<>();
		for(int element : ar) {
			newList.add(element);
		}
		int results = 0;
		for (int c = 0; c < n; c++) {
			for (int i = 0; i < newList.size(); i++) {
				if (ar[c] == ar[i] && i != c) {
					results++;
					newList.remove(c);
					newList.remove(i);
				}
			}
		}
		return results;
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
