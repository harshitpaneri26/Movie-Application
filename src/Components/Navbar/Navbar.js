import React, { Component } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className='header'>
        <nav className='navbar nav'>
          <Link to='/'>
            <h1 className='logo'>Movie App</h1>
          </Link>

          <Link to='/favourites'>
            <button type='button' className='btn btn-danger'>
              Favourites
            </button>
          </Link>
        </nav>
      </div>
    );
  }
}
