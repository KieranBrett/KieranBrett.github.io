const items = document.getElementById("items");

const xhr = new XMLHttpRequest();

xhr.open("GET", "helmets.json", true);
xhr.onload = () => {
  if (xhr.status === 200) {
    const per = JSON.parse(xhr.responseText);
    //console.log(per);

    per.forEach(p => {
      // let list = document.getElementById('json');
      // list.innerHTML = list.innerHTML + `<li>${p.lastName}, ${p.firstName} ID: ${p.id}`;

      items.innerHTML =
        items.innerHTML +
        `<div class="frames">
                                                    <div class="images"> 
                                                        <img src="${p.imgsrc}" height="250"> </div> 

                                                        <div class="text"> 
                                                            <p class="manufacs">${p.manufacturer}</p>
                                                            <p class="models">${p.model}</p>
                                                            <p class="sizes">${p.size}</p>
                                                            <p class="descriptions">${p.description}</p>
                                                            <p class="link"><a href="${p.website}">Click here for the manufacturers website</a></p>
                                                        </div>

                                                    </div></br>`;
    });
  } else if (xhr.status === 404) {
    console.log("File Not Found");
  }
};

xhr.onerror = () => {
  console.log(`Current Load State ${xhr.readyState}`);
};

xhr.send();

const form = document.getElementById("comment-form");
const comments = document.getElementById("comment-area");

const addComment = e => {
  e.preventDefault();
  const name = document.getElementById("name-input").value;
  const comment = document.getElementById("comment").value;
  let time = new Date();
  let timeString = `${time.getFullYear()}/${time.getMonth()}/${time.getDate()} - ${time.getHours()}:${time.getMinutes()}`;

  comments.innerHTML =
    `<div class="comment">
                                    <p class="name">${name}</p> 
                                    <p class="time">${timeString}</p>    <br>
                                    <p class="comment-text">${comment}</p>
                                    <br>
                                </div> <br>
                            ` + comments.innerHTML;
};

form.addEventListener("submit", addComment);
