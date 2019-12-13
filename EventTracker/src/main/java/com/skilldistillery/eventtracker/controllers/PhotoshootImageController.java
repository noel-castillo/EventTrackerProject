package com.skilldistillery.eventtracker.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.PhotoshootImage;
import com.skilldistillery.eventtracker.services.PhotoshootImageService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4209"})
public class PhotoshootImageController {

	@Autowired
	private PhotoshootImageService svc;

	@GetMapping("users/{email}/photoshoots/{psId}/images")
	public List<PhotoshootImage> findImagesOfPhotoshootById(@PathVariable String email, @PathVariable int psId,
			HttpServletRequest request, HttpServletResponse response) {
		return svc.findImagesOfPhotoshootById(psId);
	}

	@PostMapping("users/{email}/photoshoots/{psId}/images")
	public PhotoshootImage createPhotoshootImage(@RequestBody PhotoshootImage photoshootImage,
			@PathVariable String email, @PathVariable int psId, HttpServletRequest request,
			HttpServletResponse response) {
		if ((photoshootImage = svc.createPhotoshootImage(photoshootImage, psId)) != null) {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(photoshootImage.getId());
			response.addHeader("Location", url.toString());
			return photoshootImage;
		} else {
			response.setStatus(400);
			return null;
		}
	}
	
	@DeleteMapping("users/{email}/photoshoots/{psId}/images/{imgId}")
	public void deletePhotoshootImage(@PathVariable String email, @PathVariable int psId, @PathVariable int imgId, HttpServletRequest request,
			HttpServletResponse response) {

		try {
			boolean deleted = svc.deletePhotoshootImageById(imgId, psId);
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
