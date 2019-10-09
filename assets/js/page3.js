const text = document.getElementById('get-txt');
const json = document.getElementById('get-json');
const php = document.getElementById('php-form');

const api = document.getElementById('api-get');

const xhr = new XMLHttpRequest();


// TXT EVENT
text.addEventListener('click', () => {
    fetch('lorem.txt')              // File to fetch
    .then(res => res.text())        // Type text
    .then(data => {
        document.getElementById('txt').innerHTML = `<p> ${data} </p>`
    }) // Log data
    .catch(err => console.log(err)); // if there is an error
    
});

// JSON EVENT
json.addEventListener('click', () => {
    fetch('people.json') // Fetches this file
    .then(res => res.json()) // Specifies file type
    .then(data => {
        data.forEach(p => { // For each bit of data
            const { id, firstName, lastName} = p; // Parse the data
            console.log(`ID: ${id}`);                   // Logs fields recieved
            console.log(`First Name: ${firstName}`)
            console.log(`Last Name: ${lastName}`)
            const jason = document.getElementById('json');
            jason.innerHTML = jason.innerHTML + `<li> ID: ${id}, ${firstName} ${lastName}`
        })
    })
});

// PHP CODE
php.addEventListener('submit', e => {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;;
    const email = document.getElementById('email-address').value;

    fetch('http://kate.ict.op.ac.nz/~orrgl1/server.php', {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded'}, 
        body: `firstName=${firstName}&lastName=${lastName}&emailAddress=${email}`
    }) // ^^^ What method, something, and how to send the data to the server
    .then(res => res.text())
    .then(data => {
        document.getElementById('php').innerHTML = `<p>${data}</p>`
    })
    .catch(err => console.log(err));
});

// API CODE
api.addEventListener('click', () => {
    fetch('http://api.open-notify.org/iss-now.json')
    .then(res => res.json())
    .then(data => {
            const { timestamp, message, iss_position} = data;

            var time = new Date();
            time.setSeconds(timestamp);

            console.log(timestamp);
            document.getElementById('time').innerHTML = `<p>The Time Is: ${time.toTimeString()}</p>`
            console.log(message);
            console.log(iss_position.longitude);
            document.getElementById('longitude').innerHTML = `<p>Longitude: ${iss_position.longitude}</p>`
            console.log(iss_position.latitude);
            document.getElementById('latitude').innerHTML = `<p>Latitude: ${iss_position.latitude}</p>`

    })
})
