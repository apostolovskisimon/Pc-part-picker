import React, { useContext } from "react";
import { PeriodicContext } from "../../Context/MainContext";
import Item from "../Item/Item";
const ItemsList = () => {
  const { itemList } = useContext(PeriodicContext);
  return (
    <div className="item-content">
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
      {/* <Item id={1} name="Intel i9" />
    <Item id={2} name="Intel i7" />
    <Item id={3} name="Intel i5" />
    <Item id={4} name="Intel i3" /> */}
    </div>
  );
};

export default ItemsList;
