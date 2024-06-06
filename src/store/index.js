import { createStore } from "redux";

const reducer = (state = { items : [], showCart: false }, action) => {

  const updatedItems = [...state.items];
  switch (action.type) {
    case 'add': {
      const index = updatedItems.findIndex(
        (item) => item.title === action.payload.item.title
      );
      if (index > -1) {
        const item = updatedItems[index];
        const updatedItem = {
          ...item,
          quantity: item.quantity + 1
        }
        updatedItems[index] = updatedItem;
        return {
          ...state,
          items: updatedItems
        };
      } else {

        updatedItems.push({
          ...action.payload.item,
          quantity: 1
        })

        return {
          ...state,
          items: updatedItems
        }
      }
    }
      
    case 'remove': {
      const index = updatedItems.findIndex(
        (item) => item.title === action.payload.title
      );
      const item = updatedItems[index];
      const quantity = item.quantity;
      if (quantity > 1) {
        const updatedItem = {
          ...item,
          quantity: quantity - 1
        }
        updatedItems[index] = updatedItem;
      } else {
        updatedItems.splice(index, 1);
      }
      return {
        ...state,
        items: updatedItems
      }
    }
      
    case 'toggle': {
      return {
        ...state,
        showCart: !state.showCart
      }  
    }
  }
  return state;
}


const store = createStore(reducer);

export default store;
