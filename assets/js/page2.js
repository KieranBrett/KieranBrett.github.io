const text = document.getElementById('get-txt');
const json = document.getElementById('get-json');

const xhr = new XMLHttpRequest();

text.addEventListener('click', () => { // TXT EVENT
    xhr.open('GET', 'lorem.txt', true);
    xhr.onload = () => {
        if (xhr.status === 200)
            document.getElementById('txt').innerHTML = `<p> ${xhr.responseText} </p>`
        else if (xhr.status === 404){
            console.log("File Not Found");
        }
    }

    xhr.onerror = () =>{
        console.log(`Current Load State ${xhr.readyState}`)
    }

    xhr.send();
});

json.addEventListener('click', () => { // JSON EVENT
    xhr.open('GET', 'people.json', true);
    xhr.onload = () => {
        if (xhr.status === 200){
            const per = JSON.parse(xhr.responseText);
            console.log(per);
            per.forEach(p => {
                let list = document.getElementById('json');
                list.innerHTML = list.innerHTML + `<li>${p.lastName}, ${p.firstName} ID: ${p.id}`;
            })
        }
        else if (xhr.status === 404){
            console.log("File Not Found");
        }
    }

    xhr.onerror = () =>{
        console.log(`Current Load State ${xhr.readyState}`);
    }

    xhr.send();
});



// PHP Code 

const form = document.getElementById('php-form');

const sendPhp = (e) => {
    e.preventDefault();
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const emailAddress = document.getElementById('email-address').value;

    const params = `firstName=${firstName}&lastName=${lastName}&emailAddress=${emailAddress}`;
    xhr.open('POST', 'http://kate.ict.op.ac.nz/~orrgl1/server.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); // Going to use content type of this query string
    xhr.onload = () => {
        if (xhr.status === 200){
            console.log(xhr.responseText);
            const formRes = document.getElementById('php')
            formRes.textContent = `${xhr.responseText}`
            formRes.style.color = "red"
            formRes.style.background = "white"
            formRes.style.border = "thick solid #000"
            formRes.style.padding = "12px"
        } 
        else if (xhr.status === 500){ // 500 is internal server error
            console.log("Internal server error");
        }
    }
    xhr.send(params);
}

form.addEventListener('submit', sendPhp);