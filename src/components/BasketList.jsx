import { BasketItem } from "./BasketItem";

function BasketList (props) {
const {
    order = [],
    handleBasketShowing = Function.prototype, 
    removeFromBasket = Function.prototype,
    incQuantity = Function.prototype,
    decQuantity = Function.prototype,
    setAlertName = Function.prototype
} = props;

const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity
}, 0)

return <ul className="collection basket-list">
    <li className="collection-item active">Корзина
        <span className="secondary-content">
            <i className="material-icons" onClick={handleBasketShowing}>close</i>
        </span>
    </li>
    {
        order.length ? order.map(item => (
            <BasketItem 
            key={item.id} 
            {...item} 
            removeFromBasket={removeFromBasket}
            incQuantity={incQuantity}
            decQuantity={decQuantity}
            />
        )) : <li className="collection-item">Корзина пуста</li>
    }
    <li className="collection-item active">Общая стоимость: {totalPrice} руб.
        <button className="secondary-content btn-small white black-text" onClick={() => totalPrice > 0 && setAlertName(`Ваш заказ на сумму ${totalPrice} руб. отправлен на сборку!`)}>Оформить</button>
    </li>
</ul>
}

export {BasketList};