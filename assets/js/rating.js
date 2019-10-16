window.onload = function() {
        setTimeout(function(){
            let ratingArea = document.getElementsByClassName("text");
        let selected = "./assets/img/selected.png"
        let unselected = "./assets/img/unselected.png"

        for (let i = 0; i < ratingArea.length; i++){

            
            ratingArea[i].innerHTML += `<div class="rating">
                                        <img id="star1" class="stars1" src="${unselected}" alt="stars"></img>
                                        <img id="star2" class="stars2" src="${unselected}" alt="stars"></img>
                                        <img id="star3" class="stars3" src="${unselected}" alt="stars"></img>
                                        <img id="star4" class="stars4" src="${unselected}" alt="stars"></img>
                                        <img id="star5" class="stars5" src="${unselected}" alt="stars"></img>
                                        </div>`
        
        let stars = []
        let ids = []

        let star = document.getElementsByClassName("stars1");
        stars.push(star[star.length-1])
        let identity = document.getElementsByClassName("stars1");
        ids.push(identity[identity.length - 1].id)
        
        star = document.getElementsByClassName("stars2");
        stars.push(star[star.length-1])
        identity = document.getElementsByClassName("stars2");
        ids.push(identity[identity.length - 1].id)

        star = document.getElementsByClassName("stars3");
        stars.push(star[star.length-1])
        identity = document.getElementsByClassName("stars3");
        ids.push(identity[identity.length - 1].id)

        star = document.getElementsByClassName("stars4");
        stars.push(star[star.length-1])
        identity = document.getElementsByClassName("stars4");
        ids.push(identity[identity.length - 1].id)

        star = document.getElementsByClassName("stars5");
        stars.push(star[star.length-1])
        identity = document.getElementsByClassName("stars5");
        ids.push(identity[identity.length - 1].id)

        let clicked = false;

        for (let i = 0; i < stars.length; i++){
            stars[i].addEventListener("mouseover", () => {
                if (!clicked){
                    stars[i].src = selected
                let id = ids[i]

                for (let i = 0; i < stars.length; i++){
                    stars[i].src = selected;
                    if (ids[i] == id){
                        i = stars.length;
                    }
                }

                }
                
            })
            stars[i].addEventListener("mouseleave", () => {
                if (!clicked){
                    stars[i].src = unselected
                    let id = ids[i]

                        for (let i = 0; i < stars.length; i++){
                            stars[i].src = unselected;
                            if (ids[i] == id){
                            i = stars.length;
                        }
                    }
                }
            })
            stars[i].addEventListener("click", () => {
                if(!clicked){
                    clicked = true;
                    stars[i].src = selected
                let id = ids[i]

                for (let i = 0; i < stars.length; i++){
                    stars[i].src = selected;
                    if (ids[i] == id){
                        i = stars.length;
                    }
                }
                }
                else{
                    clicked = false;
                    for (let i = 0; i < stars.length; i++){
                        stars[i].src = unselected;
                }
            }
            })
        }
    }

        }, 150); 

        
}
        
        