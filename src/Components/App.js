import "./App.css";
import Navbar from "./Navbar/Navbar";
import Banner from "./Banner/Banner";
import Movies from "./Movies/Movies";
import Favourite from "./Favourite/Favourite";
import NotFound from "./PageNotFound/NotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <Banner />
              <Movies />
            </>
          }
        />
        <Route exact path='/favourites' element={<Favourite />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
