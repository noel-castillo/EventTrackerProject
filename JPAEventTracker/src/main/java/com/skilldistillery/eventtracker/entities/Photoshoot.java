package com.skilldistillery.eventtracker.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Photoshoot {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private int length;

	private String name;

	private String description;

	@ManyToOne
	@JoinColumn(name = "address_id")
	private Address address;

	@ManyToOne
	@JsonIgnore
	@JoinColumn(name = "user_email")
	private User user;

	@OneToMany(mappedBy = "photoshoot")
	private List<PhotoshootImage> photoshootImages;

//	C O N S T R U C T O R S

	public Photoshoot() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "Photoshoot [id=" + id + ", length=" + length + ", name=" + name + ", description=" + description
				+ ", address=" + address + ", photoshootImages=" + photoshootImages + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<PhotoshootImage> getPhotoshootImages() {
		return photoshootImages;
	}

	public void setPhotoshootImages(List<PhotoshootImage> photoshootImages) {
		this.photoshootImages = photoshootImages;
	}

	public void addPhotoshootImage(PhotoshootImage psImage) {
		if (photoshootImages == null)
			photoshootImages = new ArrayList<>();
		if (!photoshootImages.contains(psImage)) {
			photoshootImages.add(psImage);
			psImage.setPhotoshoot(this);
		}
	}

	public void removePhotoshootImage(PhotoshootImage psImage) {
		if (photoshootImages != null && photoshootImages.contains(psImage)) {
			photoshootImages.remove(psImage);
			psImage.setPhotoshoot(null);
		}
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + id;
		result = prime * result + length;
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((photoshootImages == null) ? 0 : photoshootImages.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		Photoshoot other = (Photoshoot) obj;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (id != other.id)
			return false;
		if (length != other.length)
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (photoshootImages == null) {
			if (other.photoshootImages != null)
				return false;
		} else if (!photoshootImages.equals(other.photoshootImages))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

}
