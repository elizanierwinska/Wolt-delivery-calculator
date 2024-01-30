import { fireEvent, render, screen } from '@testing-library/react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import DeliveryFee from '../components/DeliveryFee';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';

const renderer = ShallowRenderer.createRenderer();

const defaultComponent = <DeliveryFee />;

const setupCartValue = () => {
  const utils = render(defaultComponent);
  const cartInput = screen.getByTestId<HTMLInputElement>('cartValue');
  return {
    cartInput,
    ...utils,
  };
};

const setupDeliveryDistance = () => {
  const utils = render(defaultComponent);
  const deliveryDistanceInput =
    screen.getByTestId<HTMLInputElement>('cartValue');
  return {
    deliveryDistanceInput,
    ...utils,
  };
};

const setupAmountOfItems = () => {
  const utils = render(defaultComponent);
  const amountOfItemsInput = screen.getByTestId<HTMLInputElement>('cartValue');
  return {
    amountOfItemsInput,
    ...utils,
  };
};

const setupTime = () => {
  const utils = render(defaultComponent);
  const timeInput = screen.getByTestId<HTMLInputElement>('time');
  return {
    timeInput,
    ...utils,
  };
};

describe('Testing React Components', () => {
  it('should render and match the snapshot', () => {
    renderer.render(defaultComponent);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });

  test('cartValue.value should change when user is typing', async () => {
    const { cartInput } = setupCartValue();
    fireEvent.change(cartInput, { target: { value: 23 } });

    expect(cartInput.value).toBe('23');
  });

  test('deliveryDistance.value should change when user is typing', async () => {
    const { deliveryDistanceInput } = setupDeliveryDistance();
    fireEvent.change(deliveryDistanceInput, { target: { value: 15230 } });
    expect(deliveryDistanceInput.value).toBe('15230');
  });

  test('amountOfItems.value should change when user is typing', async () => {
    const { amountOfItemsInput } = setupAmountOfItems();
    fireEvent.change(amountOfItemsInput, { target: { value: 17 } });
    expect(amountOfItemsInput.value).toBe('17');
  });

  test('time.value should change when user is typing', async () => {
    const { timeInput } = setupTime();
    fireEvent.click(timeInput, { target: { value: '2024-01-01' } });
    expect(timeInput.value).toBe('2024-01-01');
  });

  test('Valid form data submit', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = getByTestId('submitButton');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(getByTestId('cartValue')).toBeInTheDocument();
    expect(getByTestId('deliveryDistance')).toBeInTheDocument();
    expect(getByTestId('amountOfItems')).toBeInTheDocument();
    expect(getByTestId('time')).toBeInTheDocument();
  });

  test('fee change', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = getByTestId('submitButton');
    const cartValue = getByTestId('cartValue');
    const deliveryDistance = getByTestId('deliveryDistance');
    const amountOfItems = getByTestId('amountOfItems');
    const time = getByTestId('time');

    fireEvent.change(cartValue, { target: { value: 2 } });
    fireEvent.change(deliveryDistance, { target: { value: 1500 } });
    fireEvent.change(amountOfItems, { target: { value: 2 } });
    fireEvent.change(time, { target: { value: '2023-12-14' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(getByTestId('fee')).toHaveTextContent('Delivery price: 11€');
  });
});
