package com.skilldistillery.eventtracker.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.eventtracker.entities.Address;
import com.skilldistillery.eventtracker.services.AddressService;

@RestController
@RequestMapping("api")
public class AddressController {

	@Autowired
	private AddressService svc;

	@GetMapping("users/{email}/photoshoots/{psId}/address")
	public Address findAddressOfPhotoshoot(@PathVariable String email, @PathVariable int psId,
			HttpServletRequest request, HttpServletResponse response) {
		return svc.findAddressOfPhotoshoot(psId);
	}

	@PutMapping("users/{email}/photoshoots/{psId}/address")
	public Address updateAddressOfPhotoshoot(@PathVariable String email, @PathVariable int psId,
			@RequestBody Address address, HttpServletRequest request, HttpServletResponse response) {
		try {
			address = svc.updateAddress(address, psId);
			if (address == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			address = null;
		}
		return address;
	}

	@DeleteMapping("users/{email}/photoshoots/{psId}/address")
	public void deleteAddressOfPhotoshoot(@PathVariable String email, @PathVariable int psId, HttpServletRequest request,
			HttpServletResponse response) {

		try {
			boolean deleted = svc.deleteAddressOfPhotoshootById(psId);
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
