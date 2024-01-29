interface Props {
  cartValue: number;
  deliveryDistance: number;
  amountOfItems: number;
  time: string;
}

function getDeliveryFee(props: Props): number {
  return calculateTotalDeliveryFee(
    getCartSurcharge(props.cartValue),
    getDeliveryFeeByDistance(props.deliveryDistance),
    getItemSurcharge(props.amountOfItems),
    getFridayRushSurcharge(props.time)
  );
}

function getCartSurcharge(cartValue: number): number {
  if (cartValue >= 200) {
    return 0;
  } else if (cartValue < 10) {
    return 10 - cartValue;
  }
  return 0;
}

function getDeliveryFeeByDistance(meters: number): number {
  return Math.ceil(meters / 500);
}

function getItemSurcharge(itemNumber: number): number {
  let surcharge = (itemNumber - 4) * 0.5;
  if (itemNumber > 4 && itemNumber < 12) {
    return surcharge | 0;
  } else if (itemNumber > 12) {
    return surcharge + 1.2;
  }

  return surcharge;
}

function getFridayRushSurcharge(day: string): number {
  const isFriday = new Date(day);
  if (isFriday.getDay() === 5) {
    let date = new Date();
    if (date.getHours() >= 15 && date.getHours() < 19) {
      return 1.2;
    }
  }
  return 1;
}

function calculateTotalDeliveryFee(
  cart: number,
  distance: number,
  items: number,
  day: number
): number {
  if (cart === 0) {
    return 0;
  } else {
    let sum = (cart + distance + items) * day;
    return Math.min(15, sum);
  }
}
export default getDeliveryFee;
