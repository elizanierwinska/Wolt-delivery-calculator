interface Props {
  cartValue: number;
  deliveryDistance: number;
  amountOfItems: number;
  time: string;
}

export function getDeliveryFee(props: Props): number {
  return calculateTotalDeliveryFee(
    props.cartValue,
    getCartSurcharge(props.cartValue),
    getDeliveryFeeByDistance(props.deliveryDistance),
    getItemSurcharge(props.amountOfItems),
    getFridayRushSurcharge(props.time)
  );
}

export function getCartSurcharge(cartValue: number): number {
  if (cartValue > 0) {
    if (cartValue < 10) {
      return 10 - cartValue;
    }
  }
  return 0;
}

export function getDeliveryFeeByDistance(meters: number): number {
  if (meters > 0) {
    return Math.ceil(meters / 500);
  }
  return 1;
}

export function getItemSurcharge(itemNumber: number): number {
  if (itemNumber > 4 && itemNumber < 12) {
    return (itemNumber - 4) * 0.5;
  } else if (itemNumber > 12) {
    return (itemNumber - 4) * 0.5 + 1.2;
  }
  return 0;
}

export function getFridayRushSurcharge(date: string): number {
  const isFriday = new Date(date);
  if (!isNaN(Number(isFriday))) {
    if (isFriday.getDay() === 5) {
      let date = new Date();
      if (date.getHours() >= 15 && date.getHours() < 19) {
        return 1.2;
      }
    }
  }
  return 1;
}

export function calculateTotalDeliveryFee(
  cartValue: number,
  cart: number,
  distance: number,
  items: number,
  day: number
): number {
  if (cartValue >= 200) {
    return 0;
  } else {
    let sum = (cart + distance + items) * day;
    return Math.min(15, sum);
  }
}
export default getDeliveryFee;
