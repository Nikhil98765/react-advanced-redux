import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';

const CartButton = (props) => {

  const cartItems = useSelector(state => state.items);

  const dispatch = useDispatch();

  function handleShow() {
    dispatch({
      type: 'toggle'
    })
  }

  const length = cartItems.reduce((prevTotal, currentItem) => {
    return prevTotal + currentItem.quantity
  }, 0);

  return (
    <button className={classes.button} onClick={handleShow}>
      <span>My Cart</span>
      <span className={classes.badge}>{length}</span>
    </button>
  );
};

export default CartButton;
