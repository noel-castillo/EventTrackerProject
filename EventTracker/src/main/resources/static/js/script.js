window.addEventListener('load', function() {
	console.log("Document loaded");
	init();
});

function init() {
	document.loginForm.login.addEventListener('click', function(event) {
		event.preventDefault();
		var email = document.loginForm.email.value;
		var password = document.loginForm.password.value;
		getUser(email, password);
	});
	document.registerForm.create.addEventListener('click', function(event) {
		event.preventDefault();
		addNewUser();
	});

}
function addNewUser() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/users', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var userObject = JSON.parse(xhr.responseText);
			displayUser(userObject);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('userData');
			dataDiv.textContent = 'Error Adding User';
		}
	};
	let form = document.addRegisterForm;
	var newUserObject = {
		email : document.registerForm.email.value,
		name : document.registerForm.name.value,
		password : document.registerForm.password.value
	};
	var newUserJsonString = JSON.stringify(newUserObject);
	xhr.send(newUserJsonString);
}

function createPhotoshoot(user) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/users/' + user.email + '/photoshoots', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var psObject = JSON.parse(xhr.responseText);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('userData');
			dataDiv.textContent = 'Error Adding Photoshoot';
		}
	};
	let form = document.addNewPsForm;
	var newPsObject = {
		name : document.newPsForm.name.value,
		description : document.newPsForm.description.value,
		length : document.newPsForm.length.value,
		address : {
			street : document.newPsForm.street.value,
			city : document.newPsForm.city.value,
			state : document.newPsForm.state.value,
			zip : document.newPsForm.zip.value,
			phone : document.newPsForm.phone.value
		}
	};
	var newPsJsonString = JSON.stringify(newPsObject);
	xhr.send(newPsJsonString);
	getUser(user.email, user.password);
	reload();
}

function addImage(user, photoshoot) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/users/' + user.email + '/photoshoots/'
			+ photoshoot.id + '/images/', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var imageObject = JSON.parse(xhr.responseText);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('userData');
			dataDiv.textContent = 'Error Adding Image';
		}
	};
	let form = document.addAddImageForm;
	var newImageObject = {
		url : document.addImageForm.url.value,
		photoshoot : photoshoot
	};
	var newImageJsonString = JSON.stringify(newImageObject);
	xhr.send(newImageJsonString);
}

function getUser(email, password) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/users/' + email, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var userObject = JSON.parse(xhr.responseText);
			if (userObject.password === password) {
				displayUser(userObject);
			} else {

				console.error(xhr.status + ': ' + xhr.responseText);
				var dataDiv = document.getElementById('userData');
				dataDiv.textContent = 'Credentials not valid';

			}
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('userData');
			dataDiv.textContent = 'User Not Found';
		}
	};
	xhr.send(null);
}

function displayPhotoshoot(user, psId) {
	console.log("Inside display ps");
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/users/' + user.email + '/photoshoots/' + psId, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var photoshoot = JSON.parse(xhr.responseText);
			// displayUser(user);
			var dataDiv = document.getElementById('psImages');
			var dataTitleDiv = document.getElementById('psTitle');
			dataTitleDiv.innerHTML = '';
			dataTitleDiv.innerHTML = '<hr>' + photoshoot.name + '</hr><br>';
			dataDiv.innerHTML = '';
			dataDiv.innerHTML = '<hr>' + photoshoot.description + '</hr><br>';
			for (let c = 0; c < photoshoot.photoshootImages.length; c++) {

				try {
					throw c
				} catch (cc) {
					console.log(photoshoot.photoshootImages[cc].url);
					dataDiv.innerHTML += '<br>';
					dataDiv.innerHTML += '<hr>'
							+ photoshoot.photoshootImages[cc].url + '</hr><br>';
				}
			}

			dataDiv.innerHTML += '<div><button type="button" id="dropdownMenu1" data-toggle="dropdown"'
					+ 'class="btn btn-outline-secondary dropdown-toggle">'
					+ 'ADD IMAGE<span class="caret"></span>'
					+ '</button>'
					+ '<ul class="dropdown-menu dropdown-menu-right mt-2">'
					+ '<li class="px-3 py-2">'
					+ '<form class="form" name="addImageForm" role="form">'
					+ '<div class="form-group">'
					+ '<input name="url"'
					+ 'placeholder="Image URL"'
					+ 'class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<button id="addImage" type="button" class="btn btn-secondary btn-block">Add to '
					+ photoshoot.name
					+ '</button>'
					+ '</div>'
					+ '</form>'
					+ '</li>' + '</ul></div>';

			dataDiv.innerHTML += '<div><button type="button" id="dropdownMenu2" data-toggle="dropdown"'
					+ 'class="btn btn-outline-secondary dropdown-toggle">'
					+ 'Update Details<span class="caret"></span>'
					+ '</button>'
					+ '<ul class="dropdown-menu dropdown-menu-right mt-2">'
					+ '<li class="px-3 py-2">'
					+ '<form class="form" name="updatePSForm" role="form">'
					+ '<div class="form-group">'
					+ '<input name="name"'
					+ 'value="'
					+ photoshoot.name
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<input name="description"'
					+ 'value="'
					+ photoshoot.description
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<input name="length"'
					+ 'value="'
					+ photoshoot.length
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<input name="street"'
					+ 'value="'
					+ photoshoot.address.street
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<input name="city"'
					+ 'value="'
					+ photoshoot.address.city
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<input name="state"'
					+ 'value="'
					+ photoshoot.address.state
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<input name="zip"'
					+ 'value="'
					+ photoshoot.address.zip
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<input name="phone"'
					+ 'value="'
					+ photoshoot.address.phone
					+ '" class="form-control form-control-sm"'
					+ ' type="text" required="required">'
					+ '</div>'
					+ '<div class="form-group">'
					+ '<button id="updatePS" type="button" class="btn btn-secondary btn-block">Update'
					+ '</button>' + '</div>' + '</form>' + '</li>' + '</ul></div>';

			document.addImageForm.addImage.addEventListener('click', function(
					event) {
				event.preventDefault();
				addImage(user, photoshoot);
			});

			document.updatePSForm.updatePS.addEventListener('click', function(
					event) {
				event.preventDefault();
				updatePhotoshoot(user, photoshoot);
			});

		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('psImages');
			dataDiv.textContent = 'No Photoshoot Found';
		}
	};
	xhr.send(null);
}

function deleteUser(email) {
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/users/' + email, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			displayHome();
			JSON.parse(xhr.responseText);

		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('userData');
			dataDiv.textContent = 'Unable to Delete User';
		}
	};
	xhr.send(null);
}

function updateUser(user) {
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/users/' + user.email, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var userObject = JSON.parse(xhr.responseText);
			displayUser(userObject);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('userData');
			dataDiv.textContent = 'Error Updating Name';
		}
	};
	let form = document.addUpdateForm;
	var updateUserObject = {
		name : document.updateForm.name.value,
		password : user.password
	};
	var updateUserJsonString = JSON.stringify(updateUserObject);
	xhr.send(updateUserJsonString);
}

function updatePhotoshoot(user, photoshoot) {
	var xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/users/' + user.email + '/photoshoots/' + photoshoot.id,
			true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var psObject = JSON.parse(xhr.responseText);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var dataDiv = document.getElementById('userData');
			dataDiv.textContent = 'Error Updating Photoshoot';
		}
	};
	let form = document.addUpdatePSForm;
	var updatePSObject = {
		name : document.updatePSForm.name.value,
		description : document.updatePSForm.description.value,
		length : document.updatePSForm.length.value,
		address : {
			street : document.updatePSForm.street.value,
			city : document.updatePSForm.city.value,
			state : document.updatePSForm.state.value,
			zip : document.updatePSForm.zip.value,
			phone : document.updatePSForm.phone.value
		}
	};
	var updatePSJsonString = JSON.stringify(updatePSObject);
	xhr.send(updatePSJsonString);
}

function displayHome() {
	var dataDiv = document.getElementById('userData');
	var descNameDiv = document.getElementById('descName');
	var descNameBgDiv = document.getElementById('descNameBg');
	var signature = document.getElementById('signature');
	var logoutDiv = document.getElementById('logoutDiv');
	var updateDiv = document.getElementById('updateDiv');
	var deleteDiv = document.getElementById('deleteDiv');
	var psDiv = document.getElementById('psDiv');
	var deleteDiv = document.getElementById('deleteDiv');
	var loginDiv = document.getElementById('loginDiv');
	var registerDiv = document.getElementById('registerDiv');

	dataDiv.textContent = '';
	logoutDiv.innerHTML = '';
	deleteDiv.innerHTML = '';
	updateDiv.innerHTML = '';
	psDiv.innerHTML = '';

	loginDiv.innerHTML = '<button type="button" id="dropdownMenu1" data-toggle="dropdown"'
			+ 'class="btn btn-outline-secondary dropdown-toggle">'
			+ 'Login'
			+ '<span class="caret"></span>'
			+ '</button>'
			+ '<ul class="dropdown-menu dropdown-menu-right mt-2">'
			+ '<li class="px-3 py-2">'
			+ '<form class="form" name="loginForm" role="form">'
			+ '<div class="form-group">'
			+ '<input id="emailLogin" name="email"'
			+ 'placeholder="Email" class="form-control form-control-sm"'
			+ 'type="text" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input id="passwordLogin" name="password"'
			+ 'placeholder="Password" class="form-control form-control-sm"'
			+ 'type="password" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<button type="submit" name="login" class="btn btn-secondary btn-block">Login</button>'
			+ '</div>' + '</form>' + '</li>' + '</ul>';

	registerDiv.innerHTML = '<button type="button" id="dropdownMenu1" data-toggle="dropdown"'
			+ 'class="btn btn-outline-secondary dropdown-toggle">'
			+ 'Register <span class="caret"></span>'
			+ '</button>'
			+ '<ul class="dropdown-menu dropdown-menu-right mt-2">'
			+ '<li class="px-3 py-2">'
			+ '<form class="form" name="registerForm" role="form">'
			+ '<div class="form-group">'
			+ '<input id="nameRegister" name="name"'
			+ 'placeholder="Name" class="form-control form-control-sm"'
			+ 'type="text" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input id="emailRegister" name="email"'
			+ 'placeholder="Email" class="form-control form-control-sm"'
			+ 'type="text" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input id="passwordRegister" name="password"'
			+ 'placeholder="Password" class="form-control form-control-sm"'
			+ 'type="password" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<button type="submit" name="create" class="btn btn-secondary btn-block">Register</button>'
			+ '</div>' + '</form>' + '</li>' + '</ul>';
	descNameDiv.textContent = '';
	descNameBgDiv.textContent = '';
	signature.textContent = '';
	while (dataDiv.firstElementChild) {
		dataDiv.removeChild(dataDiv.firstElementChild);
	}
	let nameh5 = document.createElement('h5');
	dataDiv.appendChild(nameh5);
	nameh5.textContent = '';
	let emailh6 = document.createElement('h6');
	dataDiv.appendChild(emailh6);
	emailh6.textContent = '';

}

function displayUser(user) {
	var dataDiv = document.getElementById('userData');
	var descNameDiv = document.getElementById('descName');
	var descNameBgDiv = document.getElementById('descNameBg');
	var signature = document.getElementById('signature');
	var logoutDiv = document.getElementById('logoutDiv');
	var updateDiv = document.getElementById('updateDiv');
	var deleteDiv = document.getElementById('deleteDiv');
	var psDiv = document.getElementById('psDiv');
	var loginDiv = document.getElementById('loginDiv');
	var registerDiv = document.getElementById('registerDiv');
	dataDiv.textContent = '';
	logoutDiv.innerHTML = '<button type="submit" class="btn btn-primary btn-block">Logout</button>';

	updateDiv.innerHTML = '<button type="button" id="dropdownMenu1" data-toggle="dropdown"'
			+ 'class="btn btn-outline-secondary dropdown-toggle">'
			+ 'Update Name<span class="caret"></span>'
			+ '</button>'
			+ '<ul class="dropdown-menu dropdown-menu-right mt-2">'
			+ '<li class="px-3 py-2">'
			+ '<form class="form" name="updateForm" role="form">'
			+ '<div class="form-group">'
			+ '<input id="nameUpdate" name="name"'
			+ 'placeholder="'
			+ user.name
			+ '" class="form-control form-control-sm"'
			+ ' type="text" required="required">'
			+ '</div>'
			+
			// '<div class="form-group">' +
			// '<input id="emailUpdate" name="email"' +
			// 'class="form-control form-control-sm"' +
			// 'type="hidden" required="required" value="' + user.email + '">' +
			// '</div>' +
			// '<div class="form-group">' +
			// '<input id="passwordUpdate" name="password"' +
			// 'class="form-control form-control-sm"' +
			// 'type="hidden" required="required value="' + user.password + '">'
			// +
			// '</div>' +
			'<div class="form-group">'
			+ '<button id="update" type="button" class="btn btn-secondary btn-block">Update Name</button>'
			+ '</div>' + '</form>' + '</li>' + '</ul>';

	deleteDiv.innerHTML = '<form class="form" name="deleteForm" role="form">'
			+ '<div class="form-group">'
			+ '<button id="remove" type="button" class="btn btn-secondary btn-block">Delete Acct</button>'
			+ '</div>' + '</form>';

	psDiv.innerHTML = '';
	var c;
	if (user.photoshoots != null) {
		for (c = 0; c < user.photoshoots.length; c++) {
			var cc = c;
			psDiv.innerHTML += '<form class="form" name="psForm" role="form">'
					+ '<div class="form-group">' + '<input name="psId"'
					+ 'type="hidden" class="form-control form-control-sm"'
					+ 'value="' + user.photoshoots[cc].id
					+ '" required="required">' + '</div>'
					+ '<div class="form-group">'
					+ '<button type="button" class="btn btn-danger">'
					+ user.photoshoots[cc].name + '</button></div></form>';
			console.log(user.photoshoots[cc].id);
		}

	}
	psDiv.innerHTML += '<button type="button" id="dropdownMenu1" data-toggle="dropdown"'
			+ 'class="btn btn-outline-secondary dropdown-toggle">'
			+ 'Add New PS<span class="caret"></span>'
			+ '</button>'
			+ '<ul class="dropdown-menu dropdown-menu-right mt-2">'
			+ '<li class="px-3 py-2">'
			+ '<form class="form" name="newPsForm" role="form">'
			+ '<div class="form-group">'
			+ '<input name="name"'
			+ 'type="text" class="form-control form-control-sm"'
			+ 'placeholder="Title" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input name="description"'
			+ 'type="text" class="form-control form-control-sm"'
			+ 'placeholder="Description" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input name="length"'
			+ 'type="number" class="form-control form-control-sm"'
			+ 'placeholder="Length" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input name="street"'
			+ 'type="text" class="form-control form-control-sm"'
			+ 'placeholder="Street" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input name="city"'
			+ 'type="text" class="form-control form-control-sm"'
			+ 'placeholder="City" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input name="state"'
			+ 'type="text" class="form-control form-control-sm"'
			+ 'placeholder="State" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input name="zip"'
			+ 'type="number" class="form-control form-control-sm"'
			+ 'placeholder="Zip" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<input name="phone"'
			+ 'type="text" class="form-control form-control-sm"'
			+ 'placeholder="Phone" required="required">'
			+ '</div>'
			+ '<div class="form-group">'
			+ '<button id="createPs" type="button" class="btn btn-warning">'
			+ 'Create</button></div></form>';

	newPsForm.createPs.addEventListener('click', function(event) {
		event.preventDefault();
		createPhotoshoot(user);
	});

	loginDiv.textContent = '';
	registerDiv.textContent = '';
	descNameDiv.textContent = user.name + '\'s Profile ';
	descNameBgDiv.textContent = user.name;
	signature.textContent = user.name;
	while (dataDiv.firstElementChild) {
		dataDiv.removeChild(dataDiv.firstElementChild);
	}
	let nameh5 = document.createElement('h5');
	nameh5.setAttribute('id', 'refreshMe');
	dataDiv.appendChild(nameh5);
	nameh5.textContent = user.name;
	let emailh6 = document.createElement('h6');
	dataDiv.appendChild(emailh6);
	emailh6.textContent = user.email;
	let psh6 = document.createElement('h6');
	dataDiv.appendChild(psh6);
	psh6.textContent = user.photoshoots.length + ' photoshoots';
	console.log(user);

	document.deleteForm.remove.addEventListener('click', function(event) {
		event.preventDefault();
		deleteUser(user.email);
	});
	document.updateForm.update.addEventListener('click', function(event) {
		event.preventDefault();
		updateUser(user);
	});

	refreshMe.addEventListener('click', function(event) {
		event.preventDefault();
		getUser(user.email, user.password);
	});

	var allPs = document.getElementsByClassName('btn btn-danger');
	var index = '';
	var i, ii;
	console.log(allPs.length);
	for (i = 0; i < allPs.length; i++) {
		ii = i;
		console.log("adding listener to " + user.photoshoots[ii].id);
		allPs[ii].addEventListener('click', function(event) {
			console.log("CLICKY");
			event.preventDefault();
			var psId = document.psForm.psId.value;
			displayPhotoshoot(user, psId);
		});
	}

}