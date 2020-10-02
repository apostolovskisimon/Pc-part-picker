import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import Categories from "../../Assets/JS/Categories";
import { PeriodicContext } from "../../Context/MainContext";
import Item from "../Item/Item";
import ProductsSidemenu from "../ProductsSidemenu/ProductsSidemenu";
import "./Products.css";
const Products = () => {
  const {
    categorizedItems,
    handleSearch,
    setSearchMode,
    searchMode,
    allActive,
    setAllActive,
    itemsToShow,
    handleActiveCateogry,
  } = useContext(PeriodicContext);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="products-page">
      <div className="categories">
        <ul>
          <li
            className={
              searchMode ? "item-cat" : allActive ? "beActive" : "item-cat"
            }
            onClick={() => {
              setAllActive(true);
              handleActiveCateogry("All");
              setSearchMode(false);
            }}
          >
            All
          </li>
          {Categories.map((el, i) => {
            return <ProductsSidemenu cat={el.category} key={i} />;
          })}
        </ul>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(searchQuery);
            setSearchQuery("");
          }}
        >
          <input
            type="search"
            value={searchQuery}
            placeholder="Search for an item"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <br />
          <button
            type="submit"
            onClick={() => {
              if (searchQuery !== "") {
                setSearchMode(true);
              } else {
                setSearchMode(false);
              }
            }}
          >
            Search
          </button>
        </form>
      </div>
      <div className="shown-products">
        {searchMode ? (
          categorizedItems.map((el, i) => {
            return (
              <Item
                key={i}
                id={el._id}
                name={el.title}
                stars={el.rating}
                quantity={el.quantity}
                shortDesc={el.shortDesc}
                price={el.price}
                image={el.image}
                longDesc={el.longDesc}
              />
            );
          })
        ) : (
          <React.Fragment>
            {itemsToShow.map((el, i) => {
              return (
                <Item
                  key={i}
                  id={el._id}
                  name={el.title}
                  stars={el.rating}
                  quantity={el.quantity}
                  shortDesc={el.shortDesc}
                  price={el.price}
                  longDesc={el.longDesc}
                  image={el.image}
                />
              );
            })}
          </React.Fragment>
        )}
      </div>
      {/* <button onClick={() => prevPage()}>Prev</button>
      <button onClick={() => nextPage()}>Next</button> */}
    </div>
  );
};

export default Products;
