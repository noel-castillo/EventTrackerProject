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
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/photoshoots/' + psId, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status < 400) {
			var photoshoot = JSON.parse(xhr.responseText);
			displayUser(user);
			var dataDiv = document.getElementById('psImages');
			dataDiv.innerHTML = '';
			for (let c = 0; c < photoshoot.photoshootImages.length; c++) {
				console.log(photoshoot.photoshootImages[c].url);
				dataDiv.innerHTML += '<div class="col-sm-12 col-md ftco-animate">' 
					+ '<a href="' 
					+ photoshoot.photoshootImages[c].url 
					+ '" class="insta-img image-popup" style="background-image:url("' 
					+ photoshoot.photoshootImages[c].url
					+ '");">' 
					+ '<div class="icon d-flex justify-content-center">' 
					+ '<span class="icon-instagram align-self-center"></span>' 
					+ '</div></a></div>';
//				dataDiv.innerHTML += '<div class="slider-item js-fullheight" style="background-image:url('
//						+ photoshoot.photoshootImages[c].url
//						+ ');">'
//						+ '</div>';
			}

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

function displayHome() {
	var dataDiv = document.getElementById('userData');
	var descNameDiv = document.getElementById('descName');
	var descNameBgDiv = document.getElementById('descNameBg');
	var signature = document.getElementById('signature');
	var logoutDiv = document.getElementById('logoutDiv');
	var deleteDiv = document.getElementById('deleteDiv');
	var loginDiv = document.getElementById('loginDiv');
	var registerDiv = document.getElementById('registerDiv');

	dataDiv.textContent = '';
	logoutDiv.innerHTML = '';
	deleteDiv.innerHTML = '';

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
	logoutDiv.innerHTML = '<button type="submit" class="btn btn-secondary btn-block">Logout</button>';

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
			+ '<button id="update" type="submit" class="btn btn-secondary btn-block">Update Name</button>'
			+ '</div>' + '</form>' + '</li>' + '</ul>';

	deleteDiv.innerHTML = '<form class="form" name="deleteForm" role="form">'
			+ '<div class="form-group">'
			+ '<button id="remove" type="submit" class="btn btn-secondary btn-block">Delete Acct</button>'
			+ '</div>' + '</form>';

	psDiv.innerHTML = '';
	var c;
	for (c = 0; c < user.photoshoots.length; c++) {
		psDiv.innerHTML += '<form class="form" name="psForm" role="form">'
				+ '<div class="form-group">'
				+ '<input name="psId"'
				+ 'type="hidden" class="form-control form-control-sm"'
				+ 'value="' + user.photoshoots[c].id + '" required="required">'
				+ '</div>'
				+ '<div class="form-group">'
				+ '<button type="submit" class="btn btn-secondary btn-warning">'
				+ user.photoshoots[c].id 
				+ '</button></div></form>';
		console.log(user.photoshoots[c].id);
	}
	var allPs = document.getElementsByClassName('btn btn-secondary btn-warning');
	var index = '';
	for (c = 0; c < allPs.length; c++) {
		index = user.photoshoots[c].id;
		allPs[c].addEventListener('click', function(event) {
			event.preventDefault();
			displayPhotoshoot(user, index);
		});
	}

	loginDiv.textContent = '';
	registerDiv.textContent = '';
	descNameDiv.textContent = user.name + '\'s Profile ';
	descNameBgDiv.textContent = user.name;
	signature.textContent = user.name;
	while (dataDiv.firstElementChild) {
		dataDiv.removeChild(dataDiv.firstElementChild);
	}
	let nameh5 = document.createElement('h5');
	dataDiv.appendChild(nameh5);
	nameh5.textContent = user.name;
	let emailh6 = document.createElement('h6');
	dataDiv.appendChild(emailh6);
	emailh6.textContent = user.email;
	console.log(user);

	document.deleteForm.remove.addEventListener('click', function(event) {
		event.preventDefault();
		deleteUser(user.email);
	});
	document.updateForm.update.addEventListener('click', function(event) {
		event.preventDefault();
		updateUser(user);
	});

}