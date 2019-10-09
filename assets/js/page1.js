document.getElementById('comment-data').addEventListener('click', () =>{
    document.getElementById('comment-txt').innerHTML = `<b>Comment</b> ${document.getElementById("comment-input").value}`
    document.getElementById('comment-mod').innerHTML = `<b>Last Modified</b> ${document.lastModified}`
    document.getElementById('postid').innerHTML = `<b>Button ID</b> ${document.getElementById("comment-data").id}`
})


// LIST FUNCTION
function addItem() {
    let item = document.getElementById('todoInput').value
    let text = document.createTextNode(item)
    let newItem = document.createElement('li')

    let div = document.getElementById('item-main')

    let temp = div.clientHeight
    div.style.height = div.clientHeight + 25 + "px"
    console.log(temp)

    newItem.appendChild(text)
    document.getElementById('todoList').appendChild(newItem)
}
 
document.getElementById('todolistButton').addEventListener('click', addItem)

// TITLE MODIFIER
let title = document.getElementById('title')
title.addEventListener('mouseover', () => {
    title.style.color = 'yellow'
    title.style.fontSize = "50px"
    title.textContent = 'DOM Manipulation'
})

title.addEventListener('mouseleave', () => {
    title.textContent = 'Waitaki Boys - 3.1'
    title.style.color = 'red'
    title.style.fontSize = "40px"
})

let oddItem = document.querySelectorAll('tr:nth-child(odd)')
oddItem.forEach(o => {
    o.style.backgroundColor = '#000000'
    o.style.color = '#ffffff'
})
