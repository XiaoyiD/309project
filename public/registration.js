/* AJAX fetch() calls */

const log = console.log
log('Our script')

function createAccount() {
    const url = '/users';
    // The data we are going to send in our request
    let data = {
        email: document.querySelector('#email').value,
        name: document.querySelector('#name').value,
        password: document.querySelector('#password').value

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
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        const message = document.querySelector('#message')
        if (res.status === 200) {
            console.log('create account')
            message.innerText = 'Success: created an account.'
            message.setAttribute("style", "color: green")
           
        } else {
            message.innerText = 'Could not create an account'
            message.setAttribute("style", "color: red")
     
        }
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })
    window.location = "/login";
}  



