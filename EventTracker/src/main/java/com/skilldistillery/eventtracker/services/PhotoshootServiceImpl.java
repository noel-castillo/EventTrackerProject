package com.skilldistillery.eventtracker.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.eventtracker.repositories.PhotoshootRepository;

@Service
public class PhotoshootServiceImpl implements PhotoshootService {

	@Autowired
	private PhotoshootRepository repo;
}
