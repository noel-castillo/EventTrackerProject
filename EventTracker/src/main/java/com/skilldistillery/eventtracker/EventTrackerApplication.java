package com.skilldistillery.eventtracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
@EntityScan("com.skilldistillery.eventtracker")
public class EventTrackerApplication extends SpringBootServletInitializer {

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(EventTrackerApplication.class);
	}

	public static void main(String[] args) {
		SpringApplication.run(EventTrackerApplication.class, args);
	}

	@Bean
	public PasswordEncoder configurePasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
