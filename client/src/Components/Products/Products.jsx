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
    itemList,
    activeCategory,
    categorizedItems,
    handleSearch,
    setSearchMode,
    searchMode,
    allActive,
    prevPage,
    nextPage,
  } = useContext(PeriodicContext);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="products-page">
      <div className="categories">
        <ul>
          <li>All</li>
          {Categories.map((el, i) => {
            return <ProductsSidemenu cat={el.category} key={i} />;
          })}
        </ul>

        <FontAwesomeIcon icon={faSearch} className="searchicn" />
        <input
          type="search"
          placeholder="Search for an item"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            if (searchQuery !== "") {
              setSearchMode(true);
            } else {
              setSearchMode(false);
            }
            handleSearch(searchQuery);
          }}
        >
          Search
        </button>
      </div>
      <div className="shown-products">
        {searchMode ? (
          categorizedItems.map((el, i) => {
            return (
              <Item
                key={i}
                id={el.id}
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
        ) : activeCategory !== "All" ? (
          categorizedItems.map((el, i) => {
            return (
              <Item
                key={i}
                id={el.id}
                name={el.title}
                stars={el.rating}
                quantity={el.quantity}
                shortDesc={el.shortDesc}
                price={el.price}
                longDesc={el.longDesc}
                image={el.image}
              />
            );
          })
        ) : (
          <React.Fragment>
            {itemList.map((el, i) => {
              return (
                <Item
                  key={i}
                  id={el.id}
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
