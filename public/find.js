
const log = console.log
const userUrl = '/tables';

let tablesFetched = [];
    fetch(userUrl)
    .then((res) => {
        if (res.status === 200) {
           return res.json()
       } else {
            alert('Could not get students')
       }
    }).then((json) => {
          for (let i = 0; i < json.tables.length; i++){
             tablesFetched.push(json.tables[i])
          }
                })





//define table structure, and pulling data---------------------------------------------------------------------------
let numberOfTables = 0; // total number of tables

let joined = false;

const tables = []
// console.log(tables);
const buildingSearchList = []
const checkBoxList = []

class Table {
	constructor(location, floor, description, numberOfSeats, start, end, subject, ID) {
		this.location = location;
		this.floor = floor;
        this.description = description
		this.numberOfSeats = numberOfSeats;
		this.start = start;
		this.end = end;
		this.subject = subject;
		this.tableID = ID;
	}

}

//get tables from server
//code below requires server call
setTimeout(function(){
    for(let i= 0;i < tablesFetched.length; i++){
         const location = tablesFetched[i].location;
         const floor= tablesFetched[i].floor;
         const description= tablesFetched[i].description;
         const numberOfSeats= tablesFetched[i].numberOfSeats;
         const start= tablesFetched[i].start;
         const end= tablesFetched[i].end;
         const subject= tablesFetched[i].subject;
         const table  = new Table(location, floor, description, numberOfSeats, start, end, subject, i)
         tables.push(table);

    }
    refreshTables()
  },50);



//add event listener-----------------------------------------------------------------------------
const buildingAddForm = document.querySelector('#BuildingAddForm');
buildingAddForm.addEventListener('submit', addNewBuilding);

const tagList = document.querySelector('#tagList');
tagList.addEventListener('click', removeTag);

const checkbox2 = document.querySelector('#size2');
checkbox2.addEventListener('click', checkbox2Listen);

const checkbox6 = document.querySelector('#size6');
checkbox6.addEventListener('click', checkbox6Listen);

const checkbox4 = document.querySelector('#size4');
checkbox4.addEventListener('click', checkbox4Listen);

const checkboxMore = document.querySelector('#sizeMore');
checkboxMore.addEventListener('click', checkboxMoreListen);

const timeSearch = document.querySelector('#timeSearch');
timeSearch.addEventListener('input', timeSearchListen);

const durationSearch = document.querySelector('#durationSearch');
durationSearch.addEventListener('input', durationSearchListen);

const subjectSearch = document.querySelector('#subjectSearch');
subjectSearch.addEventListener('input', subjectSearchListen);

//const joinTable = document.querySelector('#join')
//joinTable.addEventListener('click', joinTableListen)


//define event listener --------------------------------------------------------------------
function addNewBuilding(e) {
	e.preventDefault();
	if(joined){
	   return;
	}
    const buildingName = document.querySelector('#BuildingSearch').value
	addNewBuildingInHtml(buildingName);
	refreshTables();


}

function removeTag(e){
	e.preventDefault();
	if(joined){
	   return;
	}
    if (e.target.classList.contains('deleteButton') ) {
            for (let i = 0; i < buildingSearchList.length; i++) {
                if(e.target.previousElementSibling.innerText == buildingSearchList[i]){
                   removeTagHTML(i);
                }

            }
	 }
	 refreshTables();

}

function checkbox2Listen(e){
	if(joined){
	   return;
	}
     if(checkbox2.checked){
       checkBoxList.push(2)
     }else{
       checkBoxList.splice(checkBoxList.indexOf(2), 1)

     }
     refreshTables();

}

function checkbox6Listen(e){
	if(joined){
	   return;
	}
     if(checkbox6.checked){
       checkBoxList.push(6)
     }else{
       checkBoxList.splice(checkBoxList.indexOf(6), 1)

     }
     refreshTables();

}

function checkbox4Listen(e){
	if(joined){
	   return;
	}
     if(checkbox4.checked){
       checkBoxList.push(4)
     }else{
       checkBoxList.splice(checkBoxList.indexOf(4), 1)

     }
     refreshTables();

}

function checkboxMoreListen(e){
	if(joined){
	   return;
	}
     if(checkboxMore.checked){
       for(let i = 7; i < 21; i++){
       checkBoxList.push(i)
       }

     }else{
       for(let i = 7; i < 21; i++){
        checkBoxList.splice(checkBoxList.indexOf(i), 1)
       }
     }
     refreshTables();

}

function timeSearchListen(e){
	if(joined){
	   return;
	}

    refreshTables();
}


function durationSearchListen(e){
	if(joined){
	   return;
	}

   refreshTables();

}

function subjectSearchListen(e){
	if(joined){
	   return;
	}
   refreshTables();
}

//function joinTableListen(e){
//
//   window.location.href = "joinedTable.html"
//
//
//}


/*helper function-----------------------------------------------------------*/


function removeTagHTML(index){
       tagList.innerHTML = "";
       const temporyList = buildingSearchList.slice();
       temporyList.splice(index,1);
       buildingSearchList.splice(0, buildingSearchList.length)


       for (let i = 0; i < temporyList.length; i++){
           addNewBuildingInHtml(temporyList[i]);
       }


}

function addNewBuildingInHtml(buildingName) {

	// log(buildingSearchList)
	const tags = document.querySelector('#tagList')
	if (buildingSearchList.length % 2 == 0){
	   const newline = document.createElement('div')
	   newline.className = 'tags'
	   const leftTag = document.createElement('div')
	   leftTag.className = 'leftTag'
	   const tagText = document.createElement('a')
	   tagText.className = "tagText"
	   tagText.appendChild(document.createTextNode(buildingName));
	   const button = document.createElement('button')
	   button.className  = 'deleteButton'


	   button.appendChild(document.createTextNode('×'));
	   leftTag.appendChild(tagText);
	   leftTag.appendChild(button);
	   newline.appendChild(leftTag);
	   tags.appendChild(newline);

	}else{
	   const tagsCollection = tags.getElementsByClassName('tags')
	   lastTag = tagsCollection[tagsCollection.length - 1]
	   const rightTag = document.createElement('div')
	   rightTag.className = 'rightTag'
	   const tagText = document.createElement('a')
	   tagText.className = "tagText"
	   tagText.appendChild(document.createTextNode(buildingName));
	   const button = document.createElement('button')
	   button.className  = 'deleteButton'

	   button.appendChild(document.createTextNode('×'));
	   rightTag.appendChild(tagText);
	   rightTag.appendChild(button);
	   lastTag.appendChild(rightTag);
		 // console.log(lastTag);

	}
	buildingSearchList.push(buildingName);
	// log(buildingSearchList)


}

function refreshTables(){
       const tablesElement = document.querySelector('#tables')
       tablesElement.innerHTML = ""
       const searchText = document.querySelector("#timeSearch").value
       const durationText = document.querySelector("#durationSearch").value
       const subjectText = document.querySelector("#subjectSearch").value
       if(buildingSearchList.length == 0){

           for (let i = 0; i < tables.length; i++){

                if((checkBoxList.length == 0 || checkBoxList.indexOf(tables[i].numberOfSeats)> -1) &&     (searchText == "" || (tables[i].start + ":00").includes(searchText)) &&       (durationText == "" || tables[i].end -tables[i].start == parseInt(durationText))  && (subjectText == "" || tables[i].subject.includes(subjectText))){
                    addTable(i);
                }
           }


       }

       else{
           for (let i = 0; i < tables.length; i++){
						 // console.log(tables[i].location);
						 for (let j = 0; j < buildingSearchList.length; j++) {
							 const target = buildingSearchList[j].toLowerCase()
							 // log(typeof(target))
							 // log(target, tables[i].location.toLowerCase())
							 // log(tables[i].location.toLowerCase().includes(target))
	               if(tables[i].location.toLowerCase().includes(target)){
	                  if((checkBoxList.length == 0 || checkBoxList.indexOf(tables[i].numberOfSeats)> -1)&& (searchText == "" || (tables[i].start + ":00").includes(searchText))&& (durationText == "" || tables[i].end -tables[i].start == parseInt(durationText))    && (subjectText == "" || tables[i].subject.includes(subjectText)))
	                     addTable(i);
	               }
						 }
           }

       }




}

function addTable(i){

	const tablesElement = document.querySelector('#tables')
	const table = document.createElement("div")
	table.className = 'table'

	const join = document.createElement("button")
	join.className = 'join'
	join.appendChild(document.createTextNode('JOIN THE SEAT'))
	join.addEventListener("click", function() {
	    const tableIndex = parseInt(join.nextElementSibling.nextElementSibling.children[1].innerText);
//        const userUrl = '/userInfo';
//        fetch(userUrl)
//        .then((res) => {
//            if (res.status === 200) {
//               return res.json()
//           } else {
//                alert('Could not get students')
//           }
//        })
//        .then((json) => {
//            let table = json.table
//
//        }).catch((error) => {
//            console.log(error)
//        })

        const url = '/table';
        let data = {
            id: tablesFetched[tableIndex]._id
        }
        const request = new Request(url, {
            method: 'post',
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
        log(tablesFetched[tableIndex]._id)




		document.location.href = 'joinedTable.html';
	})

	const info = document.createElement("button")
	// info.innerHTML = "<location.href = 'table_info.html'>"
	info.className = 'viewinfo'
	// info.innerHTML = "location.href = 'table_info.html';"
	info.addEventListener("click", function() {
		document.location.href = 'table_info.html';
	})
	info.appendChild(document.createTextNode('INFO'))

	const ID = document.createElement("a")
	// info.innerHTML = "<location.href = 'table_info.html'>"
	ID.className = 'ID'
	// info.innerHTML = "location.href = 'table_info.html';"
	const IDtext = document.createElement("a")
	IDtext.appendChild(document.createTextNode("ID: "))
	const IDnumber = document.createElement("a")
	IDnumber.appendChild(document.createTextNode(tables[i].tableID))
	ID.appendChild(IDtext);
	ID.appendChild(IDnumber)



	const tableLocation = document.createElement("a")
	tableLocation.className = 'location'
	if(tables[i].description != ""){
	   tableLocation.appendChild(document.createTextNode(tables[i].location + ', ' + tables[i].floor + ', ' + tables[i].description));
	}else{
	   tableLocation.appendChild(document.createTextNode(tables[i].location + ', ' + tables[i].floor));
	}


	const seat = document.createElement("a")
	seat.className = 'seat'
	seat.appendChild(document.createTextNode(tables[i].numberOfSeats + " Seats"));

	const time = document.createElement("a")
	time.className = 'time'
	time.appendChild(document.createTextNode(tables[i].start + ":00 - " + tables[i].end + ":00" ));

	const course= document.createElement("a")
	course.className = 'course'
	course.appendChild(document.createTextNode(tables[i].subject));


	table.appendChild(join);
	table.appendChild(info);
	table.appendChild(ID);
	table.appendChild(tableLocation);
	table.appendChild(seat);
	table.appendChild(time);
	table.appendChild(course);
	// log(table)
	tablesElement.appendChild(table)


}
