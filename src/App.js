import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

let initial = true;


function App() {

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.items);
  const showCart = useSelector((state) => state.showCart);
  const notification = useSelector(state => state.notification);

  useEffect(() => {

    async function sendCartData() {
      dispatch({
        type: 'notification',
        payload: {
          status: 'pending',
          title: 'Sending...',
          message: 'Sending Cart data...'
        }
      });
      const response = await fetch("https://react-backend-de03a-default-rtdb.firebaseio.com/cart.json", {
          method: 'PUT',
          body: JSON.stringify(cartItems)
        });

      if (!response.ok) {
        throw new Error('Error! Something failed.');
      }

      dispatch({
        type: "notification",
        payload: {
          status: "success",
          title: "Success!",
          message: "Sent Cart data successfully!",
        },
      });
    }

    if (initial) {
      initial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch({
        type: "notification",
        payload: {
          status: "error",
          title: "Error!",
          message: "Sending Cart data failed!",
        },
      });
    })
  }, [cartItems, dispatch])

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
