const log = console.log

// global arrays
const admins = []
const regular_users = []

// User 'class'
class User {
	constructor(name, pswd) {
		this.name = name;
		this.pswd = pswd;
		// numberOfBooks++;
	}
}

// Setting up admins and regular_users array
const admin = new User('admin123', 'nopassword');
admins.push(admin)

//get user information from server
//code below requires server call
const usr = new User('usr123', 'hahahaha');
regular_users.push(usr);


/* Event listeners for login button*/
const logForm = document.querySelector('#loginForm');
// log(logForm)
logForm.addEventListener('submit', userCheck);

function userCheck(e) {
	e.preventDefault();

	// Get the user info from server
	// console.log("login check");
	const name = document.querySelector('#usrname').value;
	const pswd = document.querySelector('#pswd').value;
	let user = new User(name, pswd);

	// Check if the user info is correct with server

	// Check if the user is administrator or not
	var found = admins.some(function(e) {
    return user["name"] === "admin123" && user["pswd"] === "nopassword"
  });

	// Change href to administrators page if is admin logging in
	if (found) {
		window.location.href = "admin.html";
	}

	// else, Change href to regular user interface
	else {window.location.href = "create.html";}

}
