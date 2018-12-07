
//pulling data-------------------------------------------------
const users = []
const tables = []


//get user names from server
//code below requires server call
users.push("Mengze Liu");
users.push("Du Xiaoyi");
users.push("Rui Luo");
users.push("Zty");

//get table information from server
//code below requires server call
tables.push("table1");
tables.push("table2");
tables.push("table3");
tables.push("table4");




//add event listener--------------------------------------------------------
const deleteButton1 = document.querySelector('#deleteButton1');
deleteButton1.addEventListener('click', deleteButton1Listener);

const deleteButton2 = document.querySelector('#deleteButton2');
deleteButton2.addEventListener('click', deleteButton2Listener);



//define event listener-------------------------------------------
function deleteButton1Listener(e) {
	e.preventDefault();
	const accountsList = document.querySelector('#accountsList')
	const checkBoxCollection = document.getElementsByClassName('checkbox1')
	for(let i = 0; i< checkBoxCollection.length; i++){
	    if (checkBoxCollection[i].checked){
	        const removeName = checkBoxCollection[i].nextElementSibling.innerText
	        users.splice(users.indexOf(removeName), 1);
	        checkBoxCollection[i].parentElement.nextElementSibling.remove();
	        checkBoxCollection[i].parentElement.remove();
	        i = -1;
	    }

	}
	console.log(users);

}

function deleteButton2Listener(e) {
	e.preventDefault();
	const accountsList = document.querySelector('#tablesList')
	const checkBoxCollection = document.getElementsByClassName('checkbox2')
	for(let i = 0; i< checkBoxCollection.length; i++){
	    if (checkBoxCollection[i].checked){
	        tables.splice(i, 1);
	        checkBoxCollection[i].parentElement.nextElementSibling.remove();
	        checkBoxCollection[i].parentElement.remove();
	        i = -1;
	    }

	}
	console.log(tables);

}




