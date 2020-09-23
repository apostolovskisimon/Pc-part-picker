import React, { useContext, useEffect, useState } from "react";
import Categories from "../../Assets/JS/Categories";
import { PeriodicContext } from "../../Context/MainContext";
import Item from "../Item/Item";
import ProductsSidemenu from "../ProductsSidemenu/ProductsSidemenu";
const Products = () => {
  const { itemList, activeCategory, categorizedItems } = useContext(
    PeriodicContext
  );

  return (
    <div className="item-content">
      {Categories.map((el, i) => {
        return <ProductsSidemenu cat={el.category} key={i} />;
      })}

      {activeCategory !== "All"
        ? categorizedItems.map((el, i) => {
            return (
              <Item
                key={i}
                id={el.id}
                name={el.title}
                stars={el.rating}
                quantity={el.quantity}
                description={el.description}
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
              />
            );
          })}
    </div>
  );
};

export default Products;
