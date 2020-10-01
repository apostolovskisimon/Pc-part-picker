import React, { useContext, useEffect, useState } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import "./ProductsSidemenu.css";
const ProductsSidemenu = ({ cat }) => {
  const {
    handleActiveCateogry,
    activeCategory,
    setSearchMode,
    allActive,
    itemsToShow,
    setItemsToShow,
  } = useContext(PeriodicContext);

  return (
    <React.Fragment>
      <li
        id={cat}
        onClick={(e) => {
          handleActiveCateogry(cat);
        }}
      >
        {cat}
      </li>
    </React.Fragment>
  );
};

export default ProductsSidemenu;
