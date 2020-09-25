import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  } = useContext(PeriodicContext);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="products-page">
      <div className="categories">
        {Categories.map((el, i) => {
          return <ProductsSidemenu cat={el.category} key={i} />;
        })}

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
      <div className="item-content">
        {searchMode
          ? categorizedItems.map((el, i) => {
              return (
                <Item
                  key={i}
                  id={el.id}
                  name={el.title}
                  stars={el.rating}
                  quantity={el.quantity}
                  description={el.description}
                  price={el.price}
                />
              );
            })
          : activeCategory !== "All"
          ? categorizedItems.map((el, i) => {
              return (
                <Item
                  key={i}
                  id={el.id}
                  name={el.title}
                  stars={el.rating}
                  quantity={el.quantity}
                  description={el.description}
                  price={el.price}
                />
              );
            })
          : itemList.map((el, i) => {
              return (
                <Item
                  key={i}
                  id={el.id}
                  name={el.title}
                  stars={el.rating}
                  quantity={el.quantity}
                  description={el.description}
                  price={el.price}
                />
              );
            })}
      </div>
    </div>
  );
};

export default Products;
