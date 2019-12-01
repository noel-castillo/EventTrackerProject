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

import com.skilldistillery.eventtracker.entities.Photoshoot;
import com.skilldistillery.eventtracker.services.PhotoshootService;

@RestController
@RequestMapping("api")
public class PhotoshootController {

	@Autowired
	private PhotoshootService svc;

	@GetMapping("users/{email}/photoshoots")
	public List<Photoshoot> findAllPhotoshootsByUser(@PathVariable String email, HttpServletRequest request,
			HttpServletResponse response) {
		return svc.findAllPhotoshootsByUser(email);
	}
	
	@GetMapping("users/{email}/photoshoots/{psId}")
	public Photoshoot findPhotoshootById(@PathVariable String email, @PathVariable int psId, HttpServletRequest request,
			HttpServletResponse response) {
		return svc.findPhotoshootById(psId);
	}

	@GetMapping("photoshoots")
	public List<Photoshoot> findAllPhotoshoots() {

		return svc.findAllPhotoshoots();
	}

	@PostMapping("users/{email}/photoshoots")
	public Photoshoot createPhotoshoot(@RequestBody Photoshoot photoshoot, @PathVariable String email,
			HttpServletRequest request, HttpServletResponse response) {
		if ((photoshoot = svc.createPhotoshoot(photoshoot, email)) != null) {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(photoshoot.getId());
			response.addHeader("Location", url.toString());
			return photoshoot;
		} else {
			response.setStatus(400);
			return null;
		}
	}

	@PutMapping("users/{email}/photoshoots/{psId}")
	public Photoshoot updatePhotoshoot(@PathVariable String email, @PathVariable int psId,
			@RequestBody Photoshoot photoshoot, HttpServletRequest request, HttpServletResponse response) {
		try {
			photoshoot = svc.updatePhotoshoot(photoshoot, psId);
			if (photoshoot == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			photoshoot = null;
		}
		return photoshoot;
	}

	@DeleteMapping("users/{email}/photoshoots/{psId}")
	public void deletePhotoshoot(@PathVariable String email, @PathVariable int psId, HttpServletRequest request,
			HttpServletResponse response) {

		try {
			boolean deleted = svc.deletePhotoshootById(psId);
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
