import React from 'react';

import { init, sendForm } from 'emailjs-com';
init("user_ZGLwvVORet3PzIJZhL8ne");

class Contact extends React.Component {

    form() {
        return <form id="contact-form" onSubmit={(event) =>{
            event.preventDefault();
            
            sendForm('gmail', this, 'contact_form').then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
        }}>

            <input type="hidden" name="contact_number" />
            <label>Name</label>
            <input type="text" name="user_name" />
            <label>Email</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message"></textarea>
            <input type="submit" value="Send" />
        </form>
    }
    render() {
        return <div>
            {this.form()}
        </div>
    }
}

export default Contact;
