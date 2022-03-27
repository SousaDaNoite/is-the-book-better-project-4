// Results.js
import BookApi from "./BookApi";
import MovieApi from "./MovieApi";
import BackButton from "./BackButton";
import { useState } from "react";
import Title from "./Title";
import Rating from "./Rating";
import Versus from "./Versus";
import Calculating from "./Calculating";
// import { useParams } from "react-router-dom";

const Results = (props) => {
  const [title, setTitle] = useState('');
  const [bookRating, setBookRating] = useState(null);
  const [movieRating, setMovieRating] = useState(null);
  const [bookError, setBookError] = useState(false);
  const [movieError, setMovieError] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [bookWins, setBookWins] = useState(true);
  const [movieWins, setMovieWins] = useState(true);

  
  const getTitle = (headlineTitle) => {
    setTitle(headlineTitle);
    // console.log("title ", title);
  };
  // console.log("Results.js", props.formSearch);
  const getBookRating = (getRating) => {
    setBookRating(getRating);
    
  };
  const getMovieRating = (getRating) => {
    setMovieRating(getRating);
  };
  const errorBookHandler = (err) => {
    setBookError(err);
  };
  const errorMovieHandler = (err) => {
    setMovieError(err);
  }

  const handleCalculatingClick = () => {
    setCalculating(true)
    setTimeout(()=>{
      if (bookRating > movieRating) {
        setMovieWins(false)
      } else {
        setBookWins(false)
      }
      setCalculating(false)
    }, 4000)
  }
console.log("TITLEEEEEEE", title);
  console.log("Book Error is : ", bookError);
  console.log("Movie Error is : ", movieError);
  return (
    calculating 
    // play the calculating animation 
      ? <Calculating />
    // hide the calculating animation 
    : bookError  
      // what is display if no api results comes back
      ? <div className="itemMessage">
        <p className="errorMessage">Book title not available so the <span>movie wins!</span> </p>
          <BackButton />
        </div>
      // show the book infromation
      : <div className="results">
        <Title
          title={title} 
          book={bookWins}
          movie={movieWins}
        />
        <div className="wrapper">
          {
            bookWins
            ? <BookApi
              formSearch2={props.formSearch}
              getTitle2={getTitle}
              getBookRating2={getBookRating}
              getErrorsStatus={errorBookHandler}
            />
            : null
          }
          {/* <div className="versusRatingContainer">
            <Versus />
            <Rating bRating={bookRating} mRating={movieRating} />
          </div> */}
          
          {
            title
            // show when there is a title from bookapi
            ? !movieError
                // display this if movie matches the book title
                ? <div> 
                  { // only display when both book and movie container shows
                    bookWins && movieWins
                    ? <div className="versusRatingContainer">
                      <Versus handleClick={ handleCalculatingClick}/>
                    </div>
                    : null
                  }
                  {
                    movieWins
                    ? <MovieApi
                      formSearch2={title}
                      getMovieRating2={getMovieRating}
                      getErrorsStatus={errorMovieHandler}
                    />
                    : null
                  }
                </div>
                // display this if no movie matches the book title
                : <div className="itemMessage">
                  <p className="errorMessage">Movie title is not available so the <span>book wins!</span> </p>
                </div>
            
            // display nothing if  no bookapi title
            : null
          }
          {
            bookWins && movieWins
            ? null
            : <>
              <Rating bRating={bookRating} mRating={movieRating} />
              <BackButton />
            </>
          }
        </div>
      </div> 
  );
};

export default Results;
