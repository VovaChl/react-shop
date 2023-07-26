import { GoodsItem } from "./GoodsItem";

function GoodsList(props) {
    const {goods = [], addToOrder = Function.prototype} = props;

    if (!goods.length) return <h3>Nothing there</h3>

    return <div className="goods">
            {goods.map(good => (
                <GoodsItem key={good.mainId} {...good} addToOrder={addToOrder} />
            ))}
    </div>
}

export {GoodsList};