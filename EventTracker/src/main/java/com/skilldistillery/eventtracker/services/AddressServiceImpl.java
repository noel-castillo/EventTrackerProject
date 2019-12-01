package com.skilldistillery.eventtracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.entities.Address;
import com.skilldistillery.eventtracker.entities.Photoshoot;
import com.skilldistillery.eventtracker.repositories.AddressRepository;
import com.skilldistillery.eventtracker.repositories.PhotoshootRepository;

@Service
public class AddressServiceImpl implements AddressService {

	@Autowired
	private AddressRepository addrRepo;

	@Autowired
	private PhotoshootRepository psRepo;

	@Override
	public Address findAddressOfPhotoshoot(int psId) {
		return psRepo.findById(psId).get().getAddress();
	}

	@Override
	public Address updateAddress(Address address, int psId) {

		Photoshoot ps = psRepo.findById(psId).get();

		if (addrRepo.existsById(ps.getAddress().getId())) {

			Address existingAddr = addrRepo.findById(ps.getAddress().getId()).get();
			existingAddr.setStreet(address.getStreet());
			existingAddr.setCity(address.getCity());
			existingAddr.setState(address.getState());
			existingAddr.setZip(address.getZip());
			existingAddr.setPhone(address.getPhone());

			return addrRepo.saveAndFlush(existingAddr);
		} else {

			return null;
		}
	}

	@Override
	public boolean deleteAddressOfPhotoshootById(int psId) {
		Photoshoot ps = psRepo.findById(psId).get();
		if (addrRepo.existsById(ps.getAddress().getId())) {
			addrRepo.deleteById(ps.getAddress().getId());
			return true;
		} else {
			return false;
		}
	}
}
