import React, { useContext } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import "./ProductsSidemenu.css";
const ProductsSidemenu = ({ cat }) => {
  const {
    handleActiveCateogry,
    allActive,
    setAllActive,
    itemsToShow,
    setSearchMode,
    toggleFilters,
    setToggleFilters,
  } = useContext(PeriodicContext);

  let categories = itemsToShow.map((el) => el.category);

  return (
    <React.Fragment>
      <li
        className={
          categories.includes(cat) && !allActive ? "beActive" : "item-cat"
        }
        id={cat}
        onClick={() => {
          if (toggleFilters) {
            setToggleFilters(false);
          }
          handleActiveCateogry(cat);
          setAllActive(false);
          setSearchMode(false);
        }}
      >
        {cat}
      </li>
    </React.Fragment>
  );
};

export default ProductsSidemenu;
