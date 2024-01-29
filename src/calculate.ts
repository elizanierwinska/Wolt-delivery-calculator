interface Props {
  cartValue: number;
  deliveryDistance: number;
  amountOfItems: number;
  time: string;
}

function calculate(props: Props) {
  let deliveryFee = 0;

  if (props.cartValue < 10) {
    let surcharge = 10 - props.cartValue;
    deliveryFee += surcharge;
  }

  if (props.deliveryDistance < 500) {
    deliveryFee += 1;
  } else {
    let distance = Math.ceil(props.deliveryDistance / 500);
    deliveryFee += distance;
  }

  let surcharge = (props.amountOfItems - 4) * 0.5;
  if (props.amountOfItems > 4 && props.amountOfItems < 12) {
    deliveryFee += surcharge;
  } else if (props.amountOfItems > 12) {
    deliveryFee += surcharge + 1.2;
  }

  const isFriday = new Date(props.time);
  if (isFriday.getDay() === 5) {
    let date = new Date();
    if (date.getHours() >= 15 && date.getHours() <= 16) {
      deliveryFee *= 1.2;
    }
  }

  if (deliveryFee > 15) {
    deliveryFee = 15;
  }
  if (props.cartValue >= 200) {
    deliveryFee = 0;
  }

  return deliveryFee;
}
export default calculate;
