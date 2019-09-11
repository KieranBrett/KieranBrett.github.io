
$(_ =>{
    
    // TASK ONE

    $('div#outer-container').css({ // Outer Container
        backgroundColor: 'red',
        width: '100px',
        height: '100px'
    })
    
    $('div#middle-container').css({ // Middle Container
        backgroundColor: 'green',
        width: '80px',
        height: '80px'
    })
    
    $('div#inner-container').css({ // Inner Container
        backgroundColor: 'yellow',
        width: '60px',
        height: '60px'
    })
    
    $('button#toggle-inner').click(_ => { // Toggle Inner Container Event
        $('div#inner-container').toggle()
    })

    // AJAX KEY PRESS

    const textInput = document.getElementById('text-entry');
    const textOuput = document.getElementById('keypress-output');

    $('input#text-entry').keypress(() => {
        fetch('mynameis.txt')
        .then(res => res.text())
        .then(data => {
            textOuput.textContent = data + textInput.value
        })
    })

    // JQUERY UI

    $('div#draggable').draggable();
    $('div#draggable').css({ // Inner Container
        backgroundColor: 'red',
        width: '80px',
        height: '80px'
    })

    $( "#datepicker" ).datepicker();

    $( document ).tooltip();

})

