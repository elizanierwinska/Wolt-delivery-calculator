import {
  getCartSurcharge,
  getDeliveryFeeByDistance,
  getItemSurcharge,
  getFridayRushSurcharge,
  calculateTotalDeliveryFee,
} from '../calculate';

describe('testing getCartSurcharge', () => {
  test('input of 1 should give an output of 9', () => {
    expect(getCartSurcharge(1)).toBe(9);
  });
  test('input of 5 should give an output of 5', () => {
    expect(getCartSurcharge(5)).toBe(5);
  });
  test('input of 0 should give an output of 0', () => {
    expect(getCartSurcharge(0)).toBe(0);
  });
  test('input of 20 should give an output of 0', () => {
    expect(getCartSurcharge(20)).toBe(0);
  });
  test('input of -1 should give an output of 0', () => {
    expect(getCartSurcharge(0)).toBe(0);
  });
});

describe('testing getDeliveryFeeeByDistance', () => {
  test('distance of 1m should give an output of 1', () => {
    expect(getDeliveryFeeByDistance(1)).toBe(1);
  });
  test('distance of 500m should give an output of 1', () => {
    expect(getDeliveryFeeByDistance(500)).toBe(1);
  });
  test('distance of 1000m should give an output of 2', () => {
    expect(getDeliveryFeeByDistance(1000)).toBe(2);
  });
  test('distance of 1499m should give an output of 3', () => {
    expect(getDeliveryFeeByDistance(1499)).toBe(3);
  });
  test('distance of 1500m should give an output of 3', () => {
    expect(getDeliveryFeeByDistance(1500)).toBe(3);
  });
  test('distance of 1501m should give an output of 4', () => {
    expect(getDeliveryFeeByDistance(1501)).toBe(4);
  });
  test('distance of 3500m should give an output of 7', () => {
    expect(getDeliveryFeeByDistance(3500)).toBe(7);
  });
  test('distance of -1000m should give an output of 1', () => {
    expect(getDeliveryFeeByDistance(-1000)).toBe(1);
  });
  test('minimum fee is always 1', () => {
    expect(getDeliveryFeeByDistance(0)).toBe(1);
  });
});

describe('testing getItemSurcharge', () => {
  test('item amount of 0 should give zero surcharge', () => {
    expect(getItemSurcharge(0)).toBe(0);
  });
  test('item amount of 4 should give zero surcharge', () => {
    expect(getItemSurcharge(4)).toBe(0);
  });
  test('item amount of 1 should give surcharge of 0', () => {
    expect(getItemSurcharge(1)).toBe(0);
  });
  test('item amount of 5 should give surcharge of 0.5', () => {
    expect(getItemSurcharge(5)).toBe(0.5);
  });
  test('item amount of 10 should give surcharge of 3', () => {
    expect(getItemSurcharge(10)).toBe(3);
  });
  test('item amount of 13 should give surcharge of 5.7', () => {
    expect(getItemSurcharge(13)).toBe(5.7);
  });
  test('item amount of 14 should give surcharge of 6.2', () => {
    expect(getItemSurcharge(14)).toBe(6.2);
  });
  test('item amount of 200 should give surcharge of 0', () => {
    expect(getItemSurcharge(200)).toBe(99.2);
  });
  test('item amount of -5 should give surcharge of 0', () => {
    expect(getItemSurcharge(-5)).toBe(0);
  });
});

describe('testing getFridayRushSurcharge', () => {
  jest.useFakeTimers();
  test('input of 26th of January 2024 15:42 should give multiplier of 1.2', () => {
    jest.setSystemTime(new Date('2024-01-26T15:42:16.652Z'));
    expect(getFridayRushSurcharge('2024-01-26T15:42:16.652Z')).toBe(1.2);
  });
  test('input of 15th of December 2023 15:00 should give multiplier of 1.2', () => {
    jest.setSystemTime(new Date('2023-12-15T15:00:16.652Z'));
    expect(getFridayRushSurcharge('2023-12-15T15:00:16.652Z')).toBe(1.2);
  });
  test('input of 30th of June 2023 17:00 should give multiplier of 1', () => {
    jest.setSystemTime(new Date('2023-06-30T15:02:16.652Z'));
    expect(getFridayRushSurcharge('2023-06-30T17:00:00:16.652Z')).toBe(1);
  });
  test('input of 23th of May 2022 15:00 should give multiplier of 1', () => {
    jest.setSystemTime(new Date('2022-05-23T17:02:16.652Z'));
    expect(getFridayRushSurcharge('2022-05-23T17:00:00:16.652Z')).toBe(1);
  });
  test('input of a string should give multiplier of 1', () => {
    expect(getFridayRushSurcharge('happy birthday')).toBe(1);
  });
  test('input of an empty string should give multiplier of 1', () => {
    expect(getFridayRushSurcharge('happy birthday')).toBe(1);
  });
});
``;

describe('testing calculateTotalDeliveryFee', () => {
  test('input of cartValue 200 should give an output of 0', () => {
    expect(calculateTotalDeliveryFee(200, 0, 3, 5.7, 1)).toBe(0);
  });
  test('input of cartValue 150, 0€ difference surcharge, 8€ surcharge for distance, 6.2€ surcharge for item number, and multiplier of 1.2 for friday rush should give an output of 15', () => {
    expect(calculateTotalDeliveryFee(150, 0, 8, 6.2, 1.2)).toBe(15);
  });
  test('input of cartValue 2, 8€ difference surcharge, 1€ surcharge for distance, 5.7€ surcharge for item number, and multiplier of 1.2 for friday rush should give an output of 15', () => {
    expect(calculateTotalDeliveryFee(2, 8, 1, 5.7, 1.2)).toBe(15);
  });
  test('input of cartValue 20, 0€ difference surcharge, 8€ surcharge for distance, 0€ surcharge for item number, and multiplier of 1.2 for friday rush should give an output of 9.6', () => {
    expect(calculateTotalDeliveryFee(20, 0, 8, 0, 1.2)).toBe(9.6);
  });
  test('input of cartValue 8, 2€ difference surcharge, 2€ surcharge for distance, 0€ surcharge for item number, and multiplier of 1 for friday rush should give an output of 4', () => {
    expect(calculateTotalDeliveryFee(8, 2, 2, 0, 1)).toBe(4);
  });
});
