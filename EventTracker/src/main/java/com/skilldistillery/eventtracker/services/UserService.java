package com.skilldistillery.eventtracker.services;

import java.util.List;

import com.skilldistillery.eventtracker.entities.User;

public interface UserService {

	List<User> findAll();

}
