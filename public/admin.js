const users = []
const tables = []
const usersName = []
const tablesId = []
const usersDeleted = []
const tablesDeleted = []

    fetch('/users')
    .then((res) => {
        if (res.status === 200) {
           return res.json()
       } else {
            alert('Could not get students')
       }
    }).then((json) => {
          for (let i = 0; i < json.users.length; i++){
             users.push(json.users[i])
             usersName.push(json.users[i].name)

          }


          for(let i = 0; i < users.length; i++){
                const accounts = document.querySelector('#accountsList')

                const user = document.createElement("div")
                user.className = 'account'

                const checkBox = document.createElement("input")
                checkBox.className = "checkbox1"
                checkBox.type = "checkbox"

                const name = document.createElement("a")
                name.className = "sizeText"
                name.appendChild(document.createTextNode(users[i].name))

                const br = document.createElement("br")

                user.appendChild(checkBox)
                user.appendChild(name)

                accounts.appendChild(user)
                accounts.appendChild(br)
            }

          fetch('/tables')
          .then((res) => {
              if (res.status === 200) {
                 return res.json()
             } else {
                  alert('Could not get students')
             }
          }).then((json) => {
                for (let i = 0; i < json.tables.length; i++){
                   tables.push(json.tables[i])
                   tablesId.push(json.tables[i]._id)

                }
                console.log(tables)
                  for(let i = 0; i < tables.length; i++){
                        const tablesList = document.querySelector('#tablesList')

                        const table = document.createElement("div")
                        table.className = 'table'

                        const checkBox2 = document.createElement("input")
                        checkBox2.className = "checkbox2"
                        checkBox2.type = "checkbox"

                        const id = document.createElement("a")
                        id.className = "sizeText"
                        id.appendChild(document.createTextNode("table ID: " + tables[i]._id))

                        const br = document.createElement("br")

                        table.appendChild(checkBox2)
                        table.appendChild(id)

                        tablesList.appendChild(table)
                        tablesList.appendChild(br)
                    }
          })


    })







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
	        const index = usersName.indexOf(removeName)
	        usersDeleted.push(users[index]);
	        usersName.splice(index, 1);
	        users.splice(index, 1);
	        console.log(usersName)
	        console.log(usersDeleted)
	        checkBoxCollection[i].parentElement.nextElementSibling.remove();
	        checkBoxCollection[i].parentElement.remove();
	        i = -1;
	    }

	}

}

function deleteButton2Listener(e) {
	e.preventDefault();
	const accountsList = document.querySelector('#tablesList')
	const checkBoxCollection = document.getElementsByClassName('checkbox2')
	for(let i = 0; i< checkBoxCollection.length; i++){
	    if (checkBoxCollection[i].checked){
            tablesDeleted.push(tables[i])
	        tables.splice(i, 1);
	        tablesId.splice(i,1);
	        console.log(tablesId);
	        console.log(tablesDeleted)
	        checkBoxCollection[i].parentElement.nextElementSibling.remove();
	        checkBoxCollection[i].parentElement.remove();
	        i = -1;
	    }
	}

}



function save(){

	for (let i = 0; i < usersDeleted.length; i++){
	    console.log(usersDeleted[i])
        const url = '/deleteUser/'
        let data = {
            id: usersDeleted[i]._id
        }
        const request = new Request(url, {
            method: 'delete',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        fetch(request)
        .then(function(res) {
        }).catch((error) => {
            console.log(error)
        })
    }



	for (let i = 0; i < tablesDeleted.length; i++){
	    console.log(tablesDeleted[i])
        const url2 = '/deleteTable/'
        let data2 = {
            id: tablesDeleted[i]._id
        }
        const request2 = new Request(url2, {
            method: 'delete',
            body: JSON.stringify(data2),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        fetch(request2)
        .then(function(res) {
        }).catch((error) => {
            console.log(error)
        })
    }
}

