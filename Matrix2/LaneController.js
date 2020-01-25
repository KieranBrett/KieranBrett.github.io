class LaneController{
    constructor(string){

        this.lanes = [];

        for (let i = 0; i < string.length; i++){

            this.lanes.push(new Lane(string.charAt(i),
            (i * (windowWidth / string.length)) + ((windowWidth / string.length) / 2)));
        }
        console.log(this.lanes)
    }

    update(){
        for (let i = 0; i < this.lanes.length; i++){
            this.lanes[i].update();
        }

        if (frameCount % 2 == 0)
        {

                let randomLane = parseInt(random(0, this.lanes.length))

                if (this.lanes[randomLane].available){
    
                    this.lanes[randomLane].spawnString();
                    this.lanes[randomLane].available = false;
                }
        }

        // Randomly updating characters
      for (let i = 0; i < 5; i++){

          if (random(0, 15) < charUpdate){
              this.lanes[parseInt(random(0, this.lanes.length))].updateCharacters();
          }
      }
    }
}