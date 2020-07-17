let sideBar = document.getElementById('sideBar');
let contentPane = document.getElementById('contentPane');
let navButton = document.getElementById('navButton');

function minimizeBar() {
    sideBar.style.left = '-270px'; // Gives smooth transition effect to move entire div off screen than set hidden
    contentPane.style.marginLeft = '0px';
    contentPane.style.paddingLeft = '10%';
    sideBar.style.visibility = 'hidden';
}

function expandBar() { 
    sideBar.style.left = '0px' // Setting div to be on screen
    contentPane.style.marginLeft = '260px'; // Setting margin for content pane
    contentPane.style.paddingLeft = '0%';
    sideBar.style.visibility = 'visible'; // Showing sidebar
}

navButton.onclick = () => {
    if (sideBar.style.left == '-270px'){ // If the div is off the screen
        expandBar();                   // Expand it
    }
    else{
        minimizeBar();                  // Minimize It
    }
}