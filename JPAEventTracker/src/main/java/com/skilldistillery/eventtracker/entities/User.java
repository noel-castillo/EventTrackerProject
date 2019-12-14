package com.skilldistillery.eventtracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {

//	F I E L D S

	@Id
	private String email;

	private String username;

	private String password;

	private boolean enabled;

	private String role;

	@OneToMany(mappedBy = "user")
	private List<Photoshoot> photoshoots;

//	C O N S T R U C T O R S

	public User() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "User [email=" + email + ", username=" + username + ", password=" + password + ", enabled=" + enabled
				+ ", role=" + role + ", photoshoots=" + photoshoots + "]";
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

	public void addPhotoshoot(Photoshoot photoshoot) {
		if (photoshoots == null)
			photoshoots = new ArrayList<>();
		if (!photoshoots.contains(photoshoot)) {
			photoshoots.add(photoshoot);
			photoshoot.setUser(this);
		}
	}

	public void removePhotoshoot(Photoshoot photoshoot) {
		if (photoshoots != null && photoshoots.contains(photoshoot)) {
			photoshoots.remove(photoshoot);
			photoshoot.setUser(null);
		}
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + (enabled ? 1231 : 1237);
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((photoshoots == null) ? 0 : photoshoots.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		if (enabled != other.enabled)
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
		if (role == null) {
			if (other.role != null)
				return false;
		} else if (!role.equals(other.role))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

}
