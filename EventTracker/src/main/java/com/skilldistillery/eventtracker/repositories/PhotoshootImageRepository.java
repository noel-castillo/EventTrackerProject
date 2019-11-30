package com.skilldistillery.eventtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.eventtracker.entities.PhotoshootImage;

public interface PhotoshootImageRepository extends JpaRepository<PhotoshootImage, Integer>{

}
