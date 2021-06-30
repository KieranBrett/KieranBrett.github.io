import React from 'react';
import './websites.css';

import image from './todo.PNG';

class Websites extends React.Component {

    todo_list() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>To Do List <small class="text-muted">React & Firebase</small></h2>
                <p>This is a simple, easy to use Progressive Web App (PWA) that caches as you use it, so you can revisit the App and use it offline</p>
                <p>The user can create as many lists as they would like, and also share a list with someone using the same email they use on the App</p>

                <p>You can find the web app here <a href="https://makeatodo.web.app/#/">here</a></p>
            </div>

            <div class="col-sm-6 no-padding" id="gravity">
                <img src={image} alt="Screenshot of ToDo web app" class="placeholder-image"/>
            </div>

        </div>
    }
    render() {
        return <div>

            {this.todo_list()}

        </div>
    }
}

export default Websites;
