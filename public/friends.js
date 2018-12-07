//pulling data ----------------------------------------------

const friends = []


//get friends names from server
//code below requires server call
friends.push("Mengze Liu");
friends.push("Du Xiaoyi");
friends.push("Rui Luo");
friends.push("Zty");

//add event listener ---------------------------------------------------------

const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', addButtonListener);

const deleteButton = document.querySelector('#deleteButton');
deleteButton.addEventListener('click', deleteButtonListener);

//define event listener--------------------------------------------------
function addButtonListener(e) {
	e.preventDefault();
	const name = document.querySelector('#inputs').value
	friends.push(name);
	const friendsList = document.querySelector('#friendsList')

	const friend = document.createElement("div")
	friend.className ="friend"

    const input = document.createElement("input")
    input.type = "checkbox"
    input.className = "checkBox"

    const nameText = document.createElement("a")
    nameText.className = "nameText"
    nameText.appendChild(document.createTextNode(name))

    friend.appendChild(input);
    friend.appendChild(nameText);

    friendsList.appendChild(friend)
    friendsList.appendChild(document.createElement("br"))

	
}

function deleteButtonListener(e) {
	e.preventDefault();
	const friendsList = document.querySelector('#friendsList')
	const checkBoxCollection = document.getElementsByClassName('checkBox')
	const removeIndex = [];
	for(let i = 0; i< checkBoxCollection.length; i++){
	    if (checkBoxCollection[i].checked){
	        const removeName = checkBoxCollection[i].nextElementSibling.innerText
	        friends.splice(friends.indexOf(removeName), 1);
	        checkBoxCollection[i].parentElement.nextElementSibling.remove();
	        checkBoxCollection[i].parentElement.remove();
	        i = -1;
	    }

	}
	console.log(friends);

}




