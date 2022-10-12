import React, { Component } from "react";
import "../Banner/Banner.css";

export default class Banner extends Component {
  render() {
    return (
      <>
        <div className='cardBanner'>
          <div className='card-Container'>
            <h1 className='cardtitle'>Ready to watch?</h1>
            <p className='cardtext'>
              - Watch your favorite movie to make your day! Sometimes it's the
              "journey that teaches you a lot about your destination."
            </p>
          </div>
        </div>
      </>
    );
  }
}
