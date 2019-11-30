package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public List<User> findAllUser() {
		return svc.findAllUsers();
	}

	@GetMapping("users/{email}")
	public User showUser(@PathVariable String email, HttpServletRequest request, HttpServletResponse response) {

		User user = svc.findUserByEmail(email);
		if (user == null) {
			response.setStatus(404);
		}
		return user;
	}

	@PostMapping("users")
	public User createUser(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {
		if ((user = svc.createUser(user)) != null) {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(user.getEmail());
			response.addHeader("Location", url.toString());
			return user;
		} else {
			response.setStatus(400);
			return null;
		}
	}

	@PutMapping("users/{email}")
	public User updateUser(@PathVariable String email, @RequestBody User user, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			user = svc.updateUser(email, user);
			if (user == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			user = null;
		}
		return user;
	}

	@DeleteMapping("users/{email}")
	public void deleteUser(@PathVariable String email, HttpServletRequest request, HttpServletResponse response) {

		try {
			boolean deleted = svc.deleteUserByEmail(email);
			if (deleted) {
				response.setStatus(204);
			} else {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
		}

	}

}
