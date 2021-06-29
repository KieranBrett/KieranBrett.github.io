import React from 'react';
import './Navbar.css'
import {
    Link
} from "react-router-dom";

class Navbar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark custom-colour">
                <Link class="navbar-brand" to="/">KieranBrett</Link>
                
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/">Projects</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/websites">Websites</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;
