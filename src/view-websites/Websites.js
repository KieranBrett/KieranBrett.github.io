import React from 'react';
import './websites.css';

class Websites extends React.Component {

    todo_list() {
        return <div class="row project shadow">
            <div class="sketch-text col-sm-6">
                <h2>To Do List <small class="text-muted">React Js & Google Firebase</small></h2>
                <p>This is a simple to do list application where the user can create as many lists as they would like, and share a list with someone else as long as they are registered on the website</p>

                <p>You can find the website <a href="https://advanced-app-dev.web.app/#/">here</a></p>
            </div>

            <div class="col-sm-6 no-padding" id="gravity">
                <span>(Image to be added)</span>
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
