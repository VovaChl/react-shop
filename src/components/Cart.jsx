function Cart(props) {
  const { quantity = 0, handleBasketShowing = Function.prototype } = props;

  return (
    <div 
      className="cart blue darken-4 white-text"
      onClick={handleBasketShowing}           
    >
      <i className="material-icons">shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  );
}

export { Cart };
