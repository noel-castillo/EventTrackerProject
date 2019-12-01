package com.skilldistillery.eventtracker.services;

import com.skilldistillery.eventtracker.entities.Address;

public interface AddressService {

	Address findAddressOfPhotoshoot(int psId);

	Address updateAddress(Address address, int psId);

	boolean deleteAddressOfPhotoshootById(int psId);

}
