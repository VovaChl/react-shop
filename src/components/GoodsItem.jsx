function GoodsItem(props) {
  const { mainId, displayName, displayDescription, price, displayAssets, addToOrder = Function.prototype } = props;

  return (
        <div className="card">
          <div className="card-image">
            <img src={displayAssets[0].full_background} alt={displayName}></img>
          </div>
          <div className="card-content">
            <span className="card-title">{displayName[0].toUpperCase() + displayName.slice(1).toLowerCase()}</span>
            <p>{displayDescription? displayDescription : 'Описание отсутствует.'}</p>
            <div className="card-action">
                <span className="big-price">{price.regularPrice + ' руб'}</span>
                <button className="btn" onClick={() => addToOrder({id: mainId, name: displayName, price: price.regularPrice})}>Купить</button>
            </div>
          </div>
        </div>
  );
}

export { GoodsItem };