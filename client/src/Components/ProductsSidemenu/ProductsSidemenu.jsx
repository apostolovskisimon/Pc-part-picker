import React, { useContext, useEffect, useState } from "react";
import "./ProductsSidemenu.css";
import Categories from "../../Assets/JS/Categories";
import { PeriodicContext } from "../../Context/MainContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const ProductsSidemenu = ({ cat }) => {
  const {
    handleActiveCateogry,
    activeCategory,
    categorizedItems,
    handleSearch,
    setSearchMode,
  } = useContext(PeriodicContext);
  const [handleActive, setHandleActive] = useState("All");

  useEffect(() => {
    console.log(handleActive);
  }, [handleActive]);
  return (
    <React.Fragment>
      <li
        className={
          activeCategory.toString() == handleActive.toString()
            ? "activeCat"
            : "notActive"
        }
        id={cat}
        onClick={(e) => {
          handleActiveCateogry(e.currentTarget.id);
          setHandleActive(cat);
          setSearchMode(false);
        }}
      >
        {cat}
      </li>
    </React.Fragment>
  );
};

export default ProductsSidemenu;
