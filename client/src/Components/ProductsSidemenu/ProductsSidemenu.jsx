import React, { useContext, useEffect, useState } from "react";
import "./ProductsSidemenu.css";
import Categories from "../../Assets/JS/Categories";
import { PeriodicContext } from "../../Context/MainContext";
const ProductsSidemenu = ({ cat }) => {
  const { handleActiveCateogry, activeCategory, categorizedItems } = useContext(
    PeriodicContext
  );
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
        }}
      >
        {cat}
      </li>
    </React.Fragment>
  );
};

export default ProductsSidemenu;
