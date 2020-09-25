import React, { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import { PeriodicContext } from "../../Context/MainContext";
import "./Item.css";
import ReactCardFlip from "react-card-flip";
const Item = ({ id, name, stars, quantity, description, price }) => {
  const { cart, handleAddToCart } = useContext(PeriodicContext);
  const [rating, setRating] = useState(0);

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <React.Fragment>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div
          className="item front"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <div className="item-pic">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/51iVSqLIBWL._AC_.jpg"
              alt=""
            />
          </div>
          <div className="desc short">
            <h3>{name}</h3>
            <p className="shortdesc">{description}</p>
            <p className="price">Price: ${price}</p>
          </div>
          <div className="rating-cart">
            <p>Average rating</p>
            <StarRatings
              rating={stars}
              starRatedColor="blue"
              changeRating={changeRating}
              starDimension="20px"
              starSpacing="2px"
              numberOfStars={5}
              name="rating"
            />
            {/* <button onClick={() => handleAddToCart(id)}>Add to Cart</button> */}
          </div>
        </div>
        <div
          className="item back"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          This is the back of the card.
        </div>
      </ReactCardFlip>
    </React.Fragment>
    // <div className="item">
    //   <div className="item-pic">
    //     <img
    //       src="https://images-na.ssl-images-amazon.com/images/I/51iVSqLIBWL._AC_.jpg"
    //       alt=""
    //     />
    //   </div>
    //   <div className="rating-cart">
    //     <StarRatings
    //       rating={stars}
    //       starRatedColor="blue"
    //       changeRating={changeRating}
    //       numberOfStars={5}
    //       name="rating"
    //     />
    //     <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
    //   </div>
    //   <h3>{name}</h3>
    //   <p>ID: {id}</p>

    //   <p>
    //     {description} <span>quantity:{quantity}</span>
    //   </p>
    //   {/* <p>Powerful Gaming CPU</p> */}
    // </div>
  );
};

export default Item;
