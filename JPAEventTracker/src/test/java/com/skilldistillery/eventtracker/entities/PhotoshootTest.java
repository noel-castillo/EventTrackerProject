package com.skilldistillery.eventtracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class PhotoshootTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Photoshoot photoshoot;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("EventTrackerPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		photoshoot = em.find(Photoshoot.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		photoshoot = null;
	}

	@Test
	@DisplayName("Test Photoshoot Entity Mapping")
	void test1() {
		assertNotNull(photoshoot);
		assertEquals(120, photoshoot.getLength());
	}

	@Test
	@DisplayName("Test Photoshoot and User Relationship")
	void test2() {
		assertNotNull(photoshoot.getUser());
		assertEquals("Annie", photoshoot.getUser().getName());
	}
	
	@Test
	@DisplayName("Test Photoshoot and Address Relationship")
	void test3() {
		assertNotNull(photoshoot.getAddress());
		assertEquals("MA", photoshoot.getAddress().getState());
	}
	
	@Test
	@DisplayName("Test Photoshoot and PhotoshootImage Relationship")
	void test4() {
		assertNotNull(photoshoot.getPhotoshootImages());
		assertEquals(1, photoshoot.getPhotoshootImages().get(0).getId());
	}

}
