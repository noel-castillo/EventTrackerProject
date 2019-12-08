package com.skilldistillery.eventtracker.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "photoshoot_image")
public class PhotoshootImage {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String url;

	@ManyToOne
	@JoinColumn(name = "photoshoot_id")
	@JsonIgnore
	private Photoshoot photoshoot;

//	C O N S T R U C T O R S

	public PhotoshootImage() {
		super();
	}

//	M E T H O D S

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Photoshoot getPhotoshoot() {
		return photoshoot;
	}

	public void setPhotoshoot(Photoshoot photoshoot) {
		this.photoshoot = photoshoot;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		result = prime * result + ((photoshoot == null) ? 0 : photoshoot.hashCode());
		result = prime * result + ((url == null) ? 0 : url.hashCode());
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
		PhotoshootImage other = (PhotoshootImage) obj;
		if (id != other.id)
			return false;
		if (photoshoot == null) {
			if (other.photoshoot != null)
				return false;
		} else if (!photoshoot.equals(other.photoshoot))
			return false;
		if (url == null) {
			if (other.url != null)
				return false;
		} else if (!url.equals(other.url))
			return false;
		return true;
	}

}
