import React, { useContext } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import Item from "../Item/Item";
import "./ItemList.css";
const ItemsList = () => {
  const { popularItems } = useContext(PeriodicContext);

  return (
    <React.Fragment>
      <h2>These are some of the most popular items</h2>
      <div className="item-content">
        {popularItems.map((el, i) => {
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
    </React.Fragment>
  );
};

export default ItemsList;
