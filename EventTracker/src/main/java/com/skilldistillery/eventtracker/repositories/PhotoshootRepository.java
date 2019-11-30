package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.Photoshoot;

public interface PhotoshootRepository extends JpaRepository<Photoshoot, Integer>{

}
