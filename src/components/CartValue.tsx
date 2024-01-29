// interface CartValueProps {}
import '../App.css';
import { useState } from 'react';
import getDeliveryFee from '../calculate';

interface State {
  cartValue: number;
  deliveryDistance: number;
}

function CartValue() {
  const [data, setData] = useState({
    cartValue: 0,
    deliveryDistance: 0,
    amountOfItems: 0,
    time: '',
  });
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setDelivery(Number(event.target.value));
    setData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDeliveryPrice(getDeliveryFee(data));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <p className="flex-title" id="first">
            Cart Value
          </p>
          <input
            type="number"
            onChange={handleChange}
            name="cartValue"
            value={data.cartValue}
          />
          <p className="flex-unit">€</p>
        </div>
        <div className="flex">
          <p className="flex-title">Delivery distance</p>
          <input
            type="number"
            onChange={handleChange}
            name="deliveryDistance"
            value={data.deliveryDistance}
          />
          <p className="flex-unit">m</p>
        </div>
        <div className="flex">
          <p className="flex-title">Amount of items</p>
          <input
            type="number"
            onChange={handleChange}
            name="amountOfItems"
            value={data.amountOfItems}
          />
          <p className="flex-unit"></p>
        </div>
        <div>
          <div className="flex">
            <p className="flex-title" id="first">
              Time
            </p>
            <input
              type="date"
              name="time"
              onChange={handleChange}
              value={data.time}
            />
            <p className="flex-unit"></p>
          </div>
        </div>
        <div className="flex-btn">
          <input type="submit" id="button" value="Calculate delivery price" />
        </div>
      </form>
      <p id="price">
        Delivery price:{' '}
        {deliveryPrice % 1 !== 0 ? deliveryPrice.toFixed(2) : deliveryPrice}€
      </p>
    </div>
  );
}

export default CartValue;
