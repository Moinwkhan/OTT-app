import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import image from "../images/ectroCinema-2-12-2024-removebg-preview.png";

function Tvshowcarousel() {
  const [poster, setPoster] = useState([]);
  const [selectedMoviesind, setSelectedMoviesind] = useState(0);

  useEffect(() => {
    const fetchTvshow = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/tv",
          {
            params: {
              include_adult: "false",
              include_null_first_air_dates: "false",
              language: "en-US",
              page: "1",
              sort_by: "popularity.desc",
            },
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTRhYTdlOTFmMzlmODc5OWE2NGJjNzA5N2QxOGZiMCIsInN1YiI6IjY1YzBhZTk0NDM5OTliMDE4NGM5ZWJkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oxR3rWOQPbjxnIJNd5m0QFGgxf5rUu_-Mm5-rJI8n2A",
            },
          }
        );
        console.log(response.data.results);
        setPoster(response.data.results);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTvshow();
  }, []);

  const moviesSelect = () => {
    setSelectedMoviesind((prevIndex) => (prevIndex + 1) % poster.length);
  };

  useEffect(() => {
    const internaltime = setInterval(() => {
      moviesSelect();
    }, 6000);

    return () => {
      clearInterval(internaltime);
    };
  }, [poster]);

  return (
    <>
      <div
        className="headerContainer"
        style={{
          position: "relative",
          top: 0,
          backgroundImage: poster[selectedMoviesind]
            ? `url(https://image.tmdb.org/t/p/w1280/${poster[selectedMoviesind].backdrop_path})`
            : "",
          transition: "background-image 1.9s ease-in-out",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3",
          }}
        ></div>
        {poster.map((movie, index) => (
          <div
            className={`headercard ${
              index === selectedMoviesind ? "selected" : "Not-seleted"
            }`}
            style={{
              transform: `translateX(-${300 * selectedMoviesind}px) scale(${
                index === selectedMoviesind ? 1.5 : 1
              })`,
              transition: "transform 0.9s ",
              whiteSpace: "nowrap",
            }}
            key={index}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              height={150}
            />
          </div>
        ))}
      </div>
      <Navbar
        expand="lg"
        className="bg-transparent"
        variant="dark"
        style={{ position: "absolute", top: "0%" }}
      >
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={image} alt="" height={70} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0 fs-5"
              style={{
                fontWeight: "500",
                color: "red",
                position: "relative",
                left: "150%",
              }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/home" activeClassName="active" exact>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/movies" activeClassName="active">
                Movies
              </Nav.Link>
              <Nav.Link as={Link} to="/tvshows" activeClassName="active">
                TV shows
              </Nav.Link>
              <Nav.Link as={Link} to="/watchlist" activeClassName="active">
                My Watchlist
              </Nav.Link>
              {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Tvshowcarousel;
