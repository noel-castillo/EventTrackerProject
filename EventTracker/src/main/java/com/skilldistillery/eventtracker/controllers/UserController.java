package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.User;
import com.skilldistillery.eventtracker.services.UserService;

@RestController
@RequestMapping("api")
public class UserController {
	
	@Autowired
	private UserService svc;
	
	@GetMapping("users")
	public List<User> findAll() {
		return svc.findAll();
	}

}
