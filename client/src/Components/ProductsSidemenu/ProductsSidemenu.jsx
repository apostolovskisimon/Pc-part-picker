import React, { useContext, useEffect, useState } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import "./ProductsSidemenu.css";
const ProductsSidemenu = ({ cat }) => {
  const {
    handleActiveCateogry,
    activeCategory,
    setSearchMode,
    allActive,
  } = useContext(PeriodicContext);

  const [handleActive, setHandleActive] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    console.log(handleActive);
  }, [handleActive]);

  return (
    <React.Fragment>
      <li
        className={handleActive === activeCategory ? "activeCat" : "notActive"}
        id={cat}
        onClick={(e) => {
          if (allActive) {
            handleActiveCateogry(e.currentTarget.id);
            setHandleActive("All");
          } else {
            handleActiveCateogry(e.currentTarget.id);
            setHandleActive(cat);
            setSearchMode(false);
          }
        }}
      >
        {cat}
      </li>
    </React.Fragment>
  );
};

export default ProductsSidemenu;
