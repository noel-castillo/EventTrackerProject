# Event Tracker Project

## Overview

A photoshoot event tracker. A user will be able to create, update, delete, or view
a photoshoot event on the site. User will be able to view other user's events as well.

### Technologies Used

Java, JPA, STS, Gradle, Hibernate, MySQL Workbench, Atom, Git, Github, Tomcat, Apache,
Spring Boot, REST, JSON, Postman.

### Routes

| Return Type             | Route                                                       | Functionality                                  |
| ---------------------   | ----------------------------------------------------------- | ---------------------------------------------- |
| `List<User>`            | `GET api/users`                                             | Get all users                                  |
| `User`                  | `GET api/users/{email}`                                     | Get a user by email                            |
| `User`                  | `POST api/users`                                            | Create a user                                  |
| `User`                  | `PUT api/users/{email}`                                     | Update a user by email                         |
| `Void`                  | `DELETE api/users/{email}`                                  | Delete a user by email                         |
| `List<Photoshoot>`      | `GET api/users/photoshoots`                                 | Get all photoshoots by user                    |
| `Photoshoot`            | `GET api/photoshoots/{psId}`                                | Get a photoshoot by id                         |
| `List<Photoshoot>`      | `GET api/photoshoots`                                       | Get all photoshoots                            |
| `Photoshoot`            | `POST api/users/{email}/photoshoots`                        | Create a new photoshoot under a user           |
| `Photoshoot`            | `PUT  api/users{email}/photoshoots/{psId}`                  | Update a photoshoot under a user by Id         |
| `Void`                  | `DELETE api/users/{email}/photoshoots/{psId}`               | Delete a photoshoot                            |
| `Address`               | `GET api/users/{email}/photoshoots/{psId}/address`          | Get address of a photoshoot                    |
| `Address`               | `PUT api/users/{email}/photoshoots/{psId}/address`          | Update address for a photoshoot                |
| `Void`                  | `DELETE api/users/{email}/photoshoots/{psId}/address`       | Delete a beverage by user id and beverage id   |
| `List<PhotoshootImage>' | `GET api/users/{email}/photoshoots/{psId}/images `          | Get all images of a photoshoot                 |
| `PhotoshootImage`       | `POST api/users/{email}/photoshoots/{psId}/images`          | Add an image to a photoshoot                   |
| `Void`                  | `DELETE api/users/{email}/photoshoots/{psId}/images/{imgId}`| Delete a image in a photoshoot                 |


### Topics Covered/Learning Objectives

* Create a MySql DB table
* Create a JPA Project
* Create a Java entity class POJO that models your database table.
* Map a POJO using JPA.
* Configure a Spring Boot app to publish a REST API.
* Use Spring REST annotations.
* Use Spring Data JPA to perform all CRUD operations.
* Send and receive JSON.
