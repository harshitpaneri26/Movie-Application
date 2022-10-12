import React, { Component } from "react";
import "../Favourite/Favourite.css";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      Genres: [],
      movies: [],
      curr_Genres: "All Genres",
      curr_text: "",
      limit: 5,
      current_page: 1,
    };
  }

  componentDidMount() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    const arr = JSON.parse(localStorage.getItem("Movies") || "[]");

    const ids = arr.map((o) => o.id);
    const data = arr.filter(({ id }, index) => !ids.includes(id, index + 1));

    let temp = [];
    temp.push("All Genres");
    data.forEach((movie) => {
      let value = movie.genre_ids[0];
      if (temp.includes(genreids[value]) !== true) {
        temp.push(genreids[value]);
      }
    });

    // Remove Duplicate id

    this.setState({
      Genres: [...temp],
      movies: [...data],
    });
  }

  // Change Genres....

  handleChangeGenres = (data) => {
    this.setState({
      curr_Genres: data,
    });
  };

  // Search

  search = (event) => {
    this.setState({
      curr_text: event.target.value,
    });
  };

  // Sorting

  // Sort Popularity....
  handleSortPopularityDesc = () => {
    let arr = this.state.movies;

    arr.sort(function (obj1, obj2) {
      return obj2.popularity - obj1.popularity;
    });

    this.setState({
      movies: [...arr],
    });
  };

  handleSortPopularityAsce = () => {
    let arr = this.state.movies;

    arr.sort(function (obj1, obj2) {
      return obj1.popularity - obj2.popularity;
    });

    this.setState({
      movies: [...arr],
    });
  };

  // Sort Rating...
  handleSortRatingDesc = () => {
    let arr = this.state.movies;

    arr.sort(function (obj1, obj2) {
      return obj2.vote_average - obj1.vote_average;
    });

    this.setState({
      movies: [...arr],
    });
  };

  handleSortRatingAsce = () => {
    let arr = this.state.movies;

    arr.sort(function (obj1, obj2) {
      return obj1.vote_average - obj2.vote_average;
    });

    this.setState({
      movies: [...arr],
    });
  };

  // Page change

  handleChangepage = (page) => {
    this.setState({
      current_page: page,
    });
  };

  // handle Movie page.
  handleMovielimit = (event) => {
    this.setState({
      limit: event.target.value,
    });
  };

  // Delete Movies
  handleMoviedelete = (id) => {
    let Delete = this.state.movies.filter((movie) => {
      return movie.id != id;
    });

    this.setState({
      movies: [...Delete],
    });
    localStorage.setItem("Movies", JSON.stringify(Delete));
  };

  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filter = [];

    // Search

    if (this.state.curr_text === "") {
      filter = this.state.movies;
    } else {
      filter = this.state.movies.filter((movie) => {
        let temp = movie.original_title.toLowerCase();

        return temp.includes(this.state.curr_text.toLocaleLowerCase());
      });
    }

    if (this.state.curr_Genres !== "All Genres") {
      filter = this.state.movies.filter(
        (movie) => genreids[movie.genre_ids[0]] === this.state.curr_Genres
      );
    }

    // Pagination
    let page = Math.ceil(filter.length / this.state.limit);
    let pagesarr = [];

    for (let i = 1; i <= page; i++) {
      pagesarr.push(i);
    }

    let si = (this.state.current_page - 1) * this.state.limit;
    let e = si + this.state.limit;

    filter = filter.slice(si, e);

    return (
      <>
        <div className='fav_container'>
          <div className='row'>
            <div className='col-lg-3 col-sm-12'>
              <ul className='list-group'>
                {this.state.Genres.map((data) =>
                  this.state.curr_Genres === data ? (
                    <li
                      key={this.state.current_page}
                      className='list-group-item active'
                      aria-current='true'>
                      {data}
                    </li>
                  ) : (
                    <li
                      key={Math.random()}
                      className='list-group-item'
                      aria-current='true'
                      onClick={() => {
                        this.handleChangeGenres(data);
                      }}>
                      {data}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className='col-9'>
              {/* Search Field */}
              <div className='input_fields'>
                <div className='col'>
                  <input
                    type='search'
                    name='search'
                    id='Search'
                    placeholder='Search'
                    onChange={this.search}
                  />
                </div>
                <div className='col'>
                  <input
                    type='number'
                    name='number'
                    id='number'
                    placeholder='Number'
                    min={1}
                    value={this.state.limit}
                    onChange={this.handleMovielimit}
                  />
                </div>
              </div>

              {/* table */}
              <table className='table container'>
                <thead>
                  <tr>
                    <th scope='col'>Title</th>
                    <th scope='col'></th>
                    <th scope='col'>Genres</th>
                    <th scope='col'>
                      <i
                        className='fa-solid fa-sort-up'
                        onClick={this.handleSortPopularityDesc}
                      />{" "}
                      Popularity{" "}
                      <i
                        className='fa-solid fa-sort-down'
                        onClick={this.handleSortPopularityAsce}
                      />
                    </th>
                    <th scope='col'>
                      <i
                        className='fa-solid fa-sort-up'
                        onClick={this.handleSortRatingDesc}
                      />{" "}
                      Rating{" "}
                      <i
                        className='fa-solid fa-sort-down'
                        onClick={this.handleSortRatingAsce}
                      />
                    </th>

                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {filter.map((movieObj) => (
                    <tr key={movieObj.id}>
                      <th scope='row'>
                        <img
                          src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                          alt='Movies'
                          id='fav_movies'
                        />
                      </th>
                      <td>{movieObj.original_title}</td>
                      <td>{genreids[movieObj.genre_ids[0]]}</td>
                      <td>{movieObj.popularity}</td>
                      <td>{movieObj.vote_average}</td>
                      <td>
                        <button
                          type='button'
                          className='btn btn-danger delete-data-btn'
                          onClick={() => {
                            this.handleMoviedelete(movieObj.id);
                          }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div>
                <nav aria-label=' navbar navbar-expand-lg Page navigation example'>
                  <ul className='pagination'>
                    {pagesarr.map((page) => (
                      <li key={page} className='page-item'>
                        <a
                          className='page-link'
                          onClick={() => {
                            this.handleChangepage(page);
                          }}>
                          {page}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
