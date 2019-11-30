package com.skilldistillery.eventtracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.repositories.PhotoshootImageRepository;

@Service
public class PhotoshootImageServiceImpl implements PhotoshootImageService {

	@Autowired
	private PhotoshootImageRepository repo;
}
