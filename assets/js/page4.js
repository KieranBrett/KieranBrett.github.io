const container = document.getElementById("mainSection");
const form = document.getElementById("contact-form");

const contactUs = e => {
  e.preventDefault();
  
  const name = document.getElementById("name-input").value;
  const email = document.getElementById("email-input").value;
  const number = document.getElementById("number-input").value;
  const comment = document.getElementById("comment-input").value;

  container.innerHTML = `<h1 id="thankYou">Thank you for your message</h1>`
};

form.addEventListener('submit', contactUs);
