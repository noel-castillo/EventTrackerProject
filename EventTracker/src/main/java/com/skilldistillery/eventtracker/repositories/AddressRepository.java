package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer>{

}
