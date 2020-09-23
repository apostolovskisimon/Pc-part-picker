import React, { useContext, useEffect, useState } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import Item from "../Item/Item";
import ProductsSidemenu from "../ProductsSidemenu/ProductsSidemenu";
const Products = () => {
  const { itemList } = useContext(PeriodicContext);

  return (
    <div className="item-content">
      <ProductsSidemenu />
      {itemList.map((el, i) => {
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
