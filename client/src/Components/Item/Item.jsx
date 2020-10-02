import React, { useContext, useState } from "react";
import ReactCardFlip from "react-card-flip";
import StarRatings from "react-star-ratings";
import { PeriodicContext } from "../../Context/MainContext";
import "./Item.css";

const Item = ({ id, name, stars, shortDesc, price, image, longDesc }) => {
  const { handleAddToCart, loggedIn } = useContext(PeriodicContext);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showerror, setShowError] = useState(false);

  return (
    <React.Fragment>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div className="item front" onMouseEnter={() => setIsFlipped(true)}>
          <div className="item-pic">
            {image && (
              <img
                src={require(`../../Assets/Images/${image}.jpg`)}
                alt="img"
              />
            )}
          </div>
          <h3>{name}</h3>
          <p className="shortdesc">{shortDesc}</p>
          <p className="ratingP">Rating:</p>
          <div className="starRatings">
            <StarRatings
              rating={stars}
              starRatedColor="blue"
              starDimension="16px"
              starSpacing="2px"
              numberOfStars={5}
              name="rating"
            />
          </div>
        </div>
        <div className="item back" onMouseLeave={() => setIsFlipped(false)}>
          <div>
            <ul>
              {longDesc.map((el, i) => {
                return (
                  <li key={i}>
                    <span className="objKeys">{Object.keys(el)}:</span>
                    <span className="objValues">{Object.values(el)}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <p className="price">Price: ${price}</p>

          <button
            className={showerror ? "cart-error" : "cart-button"}
            onClick={() => {
              if (loggedIn) {
                handleAddToCart(id);
              } else {
                setShowError(true);
              }
            }}
          >
            {showerror ? "You must be logged to do that!" : "Add to Cart"}
          </button>
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
