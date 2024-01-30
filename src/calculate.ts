interface DeliveryFeeProps {
  cartValue: number;
  deliveryDistance: number;
  amountOfItems: number;
  time: string;
}

/**
 * getDeliveryFee returns the total delivery fee.
 *
 * @param {DeliveryFeeProps} props - The props for calculating delivery fees
 * @returns {number} The total delivery fee
 */
export default function getDeliveryFee(props: DeliveryFeeProps): number {
  return calculateTotalDeliveryFee(
    props.cartValue,
    getCartSurcharge(props.cartValue),
    getDeliveryFeeByDistance(props.deliveryDistance),
    getItemSurcharge(props.amountOfItems),
    getFridayRushSurcharge(props.time)
  );
}

/**
 * getCartSurcharge returns the surcharge related to cart value.
 *
 * @param {number} cartValue - The value of the cart
 * @returns {number} The surcharge
 */
export function getCartSurcharge(cartValue: number): number {
  if (cartValue > 0) {
    if (cartValue < 10) {
      return 10 - cartValue;
    }
  }
  return 0;
}

/**
 * getDeliveryFeeByDistance returns the fees based on distance.
 *
 * @param {number} meters - The distance for the delivery in meters
 * @returns {number} The delivery fee based on the distance
 */
export function getDeliveryFeeByDistance(meters: number): number {
  if (meters > 0) {
    return Math.ceil(meters / 500);
  }
  return 1;
}

/**
 * getItemSurcharge returns the surcharge based on the number of items in the cart.
 *
 * @param {number} itemNumber - Number of items in the cart
 * @returns {number} Surcharge based on the number of items
 */
export function getItemSurcharge(itemNumber: number): number {
  if (itemNumber > 4 && itemNumber < 12) {
    return (itemNumber - 4) * 0.5;
  } else if (itemNumber > 12) {
    return (itemNumber - 4) * 0.5 + 1.2;
  }
  return 0;
}

/**
 * getFridayRushSurcharge returns the Friday Rush rate if applicable.
 * The rate is either 1 or 1.2.
 *
 * @param {string} date - The date for the order
 * @returns {number} The surcharge rate
 */
export function getFridayRushSurcharge(date: string): number {
  const currentDate = new Date(date);
  if (!isNaN(Number(currentDate))) {
    if (currentDate.getDay() === 5) {
      let currentDateTime = new Date();
      if (currentDateTime.getHours() >= 15 && currentDateTime.getHours() < 19) {
        return 1.2;
      }
    }
  }
  return 1;
}

/**
 * calculateTotalDeliveryFee returns the total delivery fee based on
 * the current cart value, number of items, distance, and whether the time
 * of the order is during Friday rush hour.
 *
 * @param {number} cartValue - Current cart value
 * @param {number} cartSurcharge - Surcharge from the current cart value
 * @param {number} distanceFee - Fee of the delivery based on distance
 * @param {number} itemsSurcharge - Surcharge from the current items in cart
 * @param {number} fridayRushFeeMultiplier - Friday rush delivery rate
 * @returns {number} The total delivery fee
 */
export function calculateTotalDeliveryFee(
  cartValue: number,
  cartSurcharge: number,
  distanceFee: number,
  itemsSurcharge: number,
  fridayRushFeeMultiplier: number
): number {
  if (cartValue >= 200) {
    return 0;
  } else {
    let sum =
      (cartSurcharge + distanceFee + itemsSurcharge) * fridayRushFeeMultiplier;
    return Math.min(15, sum);
  }
}
