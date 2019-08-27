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
        console.log(`Current Load State ${xhr.readyState}`)
    }

    xhr.send();
});
