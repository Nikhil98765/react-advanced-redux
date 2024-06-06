import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchData, sendCartData } from "./store/cart-actions";

let initial = true;


function App() {

  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.items);
  const changed = useSelector(state => state.cart.changed);
  const showCart = useSelector((state) => state.ui.showCart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    if (initial) {
      initial = false;
      return;
    }
    if (changed) {
      dispatch(sendCartData(cartItems));
    }
  }, [cartItems])

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
