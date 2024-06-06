import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://react-backend-de03a-default-rtdb.firebaseio.com/cart.json");
      if (!response.ok) {
          throw new Error("Error! Fetching cart data failed.");
      }
      const resData = await response.json();
      dispatch(cartActions.replaceCart(resData ?? []));
    } catch (error) {
      dispatch(
        uiActions.notification({
          status: "error",
          title: "Error!",
          message: "Sending Cart data failed!",
        })
      );
    }
    
  }
}


// * Thunk to handle side effects
export const sendCartData = (cartData) => {
  return (dispatch) => {
      dispatch(
        uiActions.notification({
          status: "pending",
          title: "Sending...",
          message: "Sending Cart data...",
        })
      );
    
    async function sendRequest() {
      const response = await fetch(
        "https://react-backend-de03a-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cartData),
        }
      );

      if (!response.ok) {
        throw new Error("Error! Something failed.");
      }
    }
    try {
      sendRequest();
      dispatch(
        uiActions.notification({
          status: "success",
          title: "Success!",
          message: "Sent Cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.notification({
          status: "error",
          title: "Error!",
          message: "Sending Cart data failed!",
        })
      );
    }
  } 
}