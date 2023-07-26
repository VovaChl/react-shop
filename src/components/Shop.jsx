import {useState, useEffect} from "react";
import {API_KEY, API_URL} from '../config';
import { Preloader } from './Preloader';
import { GoodsList } from "./GoodsList";
import { Cart } from "./Cart";
import { BasketList } from "./BasketList";
import { Alert } from "./Alert";

function Shop() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShowing, setBasketShowing] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToOrder = (item) => {
        const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            };
            setOrder([...order, newItem]);
        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1,
                    };
                } else {
                    return orderItem;
                }
            });

            setOrder(newOrder);
        };

        setAlertName(item.name)
    };

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(item => item.id !== itemId)
        setOrder(newOrder);
    };

    const handleBasketShowing = () => {
        setBasketShowing(!isBasketShowing);
    };

    const incQuantity = (itemId) => {
        const newOrder = order.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity + 1;
                return {
                    ...item,
                    quantity: newQuantity,
                }
            } else {
                return item
            }

        })
        setOrder(newOrder);
    };

    const decQuantity = (itemId) => {
        const newOrder = order.map(item => {
            if (item.id === itemId) {
                const newQuantity = item.quantity - 1;
                return {
                    ...item,
                    quantity: newQuantity > 1 ? newQuantity: 1,
                }
            } else {
                return item
            }

        })
        setOrder(newOrder);
    };

    const closeAlert = () => {
        setAlertName('');
    }

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            },
        })
        .then ((response) => response.json())
        .then ((data) => {
            data.shop && setGoods(data.shop);
            setLoading(false);
        })
    }, [])
    
    return <main className="container content">
        <Cart quantity={order.length} handleBasketShowing={handleBasketShowing}/>
        {loading? <Preloader/>: <GoodsList goods={goods} addToOrder={addToOrder}/>}
        {isBasketShowing && <BasketList 
        order={order} 
        handleBasketShowing={handleBasketShowing}
        removeFromBasket={removeFromBasket}
        incQuantity={incQuantity}
        decQuantity={decQuantity}
        setAlertName={setAlertName}
        />}
        {alertName && <Alert name={alertName} closeAlert={closeAlert}/>}
    </main>
};

export {Shop};