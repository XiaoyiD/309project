/* AJAX fetch() calls */

const log = console.log
log('Our script')

function createTable() {

    const userUrl = '/user';

    fetch(userUrl)
    .then((res) => {
        if (res.status === 200) {
           return res.json()
       } else {
            alert('Could not get students')
       }
    })
    .then((json) => {

        const url = '/tables';
        // The data we are going to send in our request
        let data = {
            location: document.querySelector('#location').value,
            floor: document.querySelector('#floor').value,
            description: document.querySelector('#description').value,
            numberOfSeats: parseInt(document.querySelector('#numberOfSeats').value),
            start: parseInt(document.querySelector('#start').value),
            end: parseInt(document.querySelector('#end').value),
            subject: document.querySelector('#subject').value,
            users:[],
        }
        // Create our request constructor with all the parameters we need
        const request = new Request(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        // Fetch AJAX call
        fetch(request)
        .then(function(res) {
            return res.json()
        }).then((json)=>{
            const url2 = '/table';
            let data2 = {
                id: json._id
            }
            const request2 = new Request(url2, {
                method: 'post',
                body: JSON.stringify(data2),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            });
//            setTimeout(function(){
//
//                document.location.href = 'joinedTable.html';
//            },400);
            fetch(request2)
            .then(function(res2) {
                setTimeout(function(){

                    document.location.href = 'joinedTable.html';
                },300);
            }).catch((error) => {
                console.log(error)
            })

        })






    }).catch((error) => {
        console.log(error)
    })


}  