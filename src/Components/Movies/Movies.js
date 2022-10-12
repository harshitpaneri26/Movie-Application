import React, { Component } from "react";
import "../Movies/Movies.css";
import axios from "axios";

export default class Movies extends Component {
  constructor() {
    super();

    this.state = {
      hover: "",
      page: [1],
      currentPage: 1,
      movies: [],
      fav_movies: [],
    };
  }

  async componentDidMount() {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=09902262cc66aaa601c0efdc68b52125&language=en-US&page=${this.state.currentPage}`
    );

    const data = res.data;

    this.setState({
      movies: [...data.results],
    });
  }

  // Functions
  handleMouseOver = (id) => {
    this.setState({
      hover: id,
    });
  };

  handleMouseOut = () => {
    this.setState({
      hover: "",
    });
  };

  // set Movies
  updateMovie = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=09902262cc66aaa601c0efdc68b52125&language=en-US&page=${this.state.currentPage}`
    );

    const data = res.data;

    this.setState({
      movies: [...data.results],
    });
  };

  // previous-Page
  handlePrevious = () => {
    if (this.state.currentPage !== 1) {
      this.setState(
        {
          currentPage: this.state.currentPage - 1,
        },
        this.updateMovie
      );
    }
  };

  // handle-Click
  handleClick = (page) => {
    if (page !== this.state.currentPage) {
      this.setState(
        {
          currentPage: page,
        },
        this.updateMovie
      );
    }
  };

  // Next-Page
  handleNext = () => {
    let temp = [];
    for (let i = 1; i <= this.state.page.length + 1; i++) {
      temp.push(i);
    }

    this.setState(
      {
        page: [...temp],
        currentPage: this.state.currentPage + 1,
      },
      this.updateMovie
    );
  };

  // update favourites Also.

  handleFavouriteState = () => {
    let localdata = JSON.parse(localStorage.getItem("Movies") || "[]");

    let temp = localdata.map((movie) => movie.id);

    this.setState({
      fav_movies: [...temp],
    });
  };

  // handle Favourites

  handleFavourite = (movieObj) => {
    let localdata = JSON.parse(localStorage.getItem("Movies") || "[]");

    if (this.state.fav_movies.includes(movieObj.id)) {
      localdata = localdata.filter((m) => {
        return m.id !== movieObj.id;
      });
    } else {
      localdata.push(movieObj);
    }

    localStorage.setItem("Movies", JSON.stringify(localdata));

    this.handleFavouriteState();
  };

  render() {
    return (
      <>
        {this.state.movies.length === 0 ? (
          <div className='loader'>
            <div className='spinner-border text-primary' role='status'>
              <span className='sr-only'></span>
            </div>
          </div>
        ) : (
          <div className='container' id='container-1'>
            <h1 className='movie-heading'>Trending</h1>

            <div className='primary-container'>
              {this.state.movies.map((movieObj) => (
                <div
                  key={movieObj.id}
                  className='card Card'
                  onMouseOver={() => {
                    this.handleMouseOver(movieObj.id);
                  }}
                  onMouseOut={this.handleMouseOver}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                    className='card-img-top card-img'
                    alt={movieObj.title}
                  />
                  <div className='card-body Movie-card-info'>
                    <h5 className='card-title'>{movieObj.title}</h5>
                    {movieObj.id === this.state.hover && (
                      <a
                        className='btn btn-primary'
                        onClick={() => {
                          this.handleFavourite(movieObj);
                        }}>
                        {this.state.fav_movies.includes(movieObj.id)
                          ? "Remove to Favourites"
                          : "Add to Favourites"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Paginations */}
            <div className='pagination-section'>
              <nav aria-label='Page navigation example'>
                <ul className='pagination'>
                  <li className='page-item'>
                    <a className='page-link' onClick={this.handlePrevious}>
                      Previous
                    </a>
                  </li>

                  {this.state.page.map((page) => (
                    <li key={page} className='page-item'>
                      <a
                        className='page-link'
                        onClick={() => {
                          this.handleClick(page);
                        }}>
                        {page}
                      </a>
                    </li>
                  ))}

                  <li className='page-item'>
                    <a className='page-link' onClick={this.handleNext}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
