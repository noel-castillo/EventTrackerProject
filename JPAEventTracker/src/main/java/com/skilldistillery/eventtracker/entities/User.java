package com.skilldistillery.eventtracker.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

//	F I E L D S

	@Id
	private String email;

	private String name;

	private String password;
	
	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<Photoshoot> photoshoots;

//	C O N S T R U C T O R S

	public User() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "User [email=" + email + ", name=" + name + ", password=" + password + "]";
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	

	public List<Photoshoot> getPhotoshoots() {
		return photoshoots;
	}

	public void setPhotoshoots(List<Photoshoot> photoshoots) {
		this.photoshoots = photoshoots;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((photoshoots == null) ? 0 : photoshoots.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (photoshoots == null) {
			if (other.photoshoots != null)
				return false;
		} else if (!photoshoots.equals(other.photoshoots))
			return false;
		return true;
	}

}
