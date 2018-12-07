
const log = console.log
const url = '/userInfo';

let fetched = [];
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
           return res.json()
       } else {
            alert('Could not get students')
       }
    }).then((json) => {
          fetched.push(json)
                })





setTimeout(function(){
    const subject = document.querySelector('#subject')
    subject.innerText = fetched[0].table[0].subject;

    const location = document.querySelector('#location')
    location.innerText = fetched[0].table[0].location;

    const description = document.querySelector('#description')
    description.innerText = fetched[0].table[0].description;

    const start = document.querySelector('#start')
    start.innerText = fetched[0].table[0].start;

    const end = document.querySelector('#end')
    end.innerText = fetched[0].table[0].end;

    const users = document.querySelector('#User')
    const newUser = document.createElement('div')
    for (let i=0; i < fetched[0].table[0].users.length; i++){
            const user = document.createElement('div')
            user.className = "user";
            user.innerText = fetched[0].table[0].users[i]
            newUser.appendChild(user)
    }
    users.innerHTML =""
    users.appendChild(newUser)

    const seatsLeft = document.querySelector('#seatsLeft')
    seatsLeft.innerText = fetched[0].table[0].numberOfSeats - fetched[0].table[0].users.length ;




  },20);


function leaveTable() {
        const url = '/leave';
        let data = {

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



        window.location = "/create";





  }


