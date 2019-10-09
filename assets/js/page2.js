const items = document.getElementById('items');
const list = document.getElementById('item-list');

const xhr = new XMLHttpRequest();


    xhr.open('GET', 'motorbikes.json', true);
    xhr.onload = () => {
        if (xhr.status === 200){
            const per = JSON.parse(xhr.responseText);
            //console.log(per);

            per.forEach(p => {
                // let list = document.getElementById('json');
                // list.innerHTML = list.innerHTML + `<li>${p.lastName}, ${p.firstName} ID: ${p.id}`;

                list.innerHTML = list.innerHTML + `<img src="${p.imgsrc}" height="200"> <li>${p.manufacturer}, ${p.model}, ${p.enginesize} </li>`
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


