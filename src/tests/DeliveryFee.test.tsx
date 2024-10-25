import { fireEvent, render, screen } from '@testing-library/react';
import * as ShallowRenderer from 'react-test-renderer/shallow';
import DeliveryFee from '../components/DeliveryFee';
import { act } from 'react-test-renderer';
import '@testing-library/jest-dom';

// eslint-disable-next-line testing-library/render-result-naming-convention
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
    screen.getByTestId<HTMLInputElement>('deliveryDistance');
  return {
    deliveryDistanceInput,
    ...utils,
  };
};

const setupAmountOfItems = () => {
  const utils = render(defaultComponent);
  const amountOfItemsInput =
    screen.getByTestId<HTMLInputElement>('amountOfItems');
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
    // eslint-disable-next-line testing-library/render-result-naming-convention
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
    const submitButton = screen.getByTestId('submitButton');

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId('cartValue')).toBeInTheDocument();
    expect(screen.getByTestId('deliveryDistance')).toBeInTheDocument();
    expect(screen.getByTestId('amountOfItems')).toBeInTheDocument();
    expect(screen.getByTestId('time')).toBeInTheDocument();
  });

  test('fee change', async () => {
    const { getByTestId } = render(defaultComponent);
    const submitButton = screen.getByTestId('submitButton');
    const cartValue = screen.getByTestId('cartValue');
    const deliveryDistance = screen.getByTestId('deliveryDistance');
    const amountOfItems = screen.getByTestId('amountOfItems');
    const time = screen.getByTestId('time');

    fireEvent.change(cartValue, { target: { value: 2 } });
    fireEvent.change(deliveryDistance, { target: { value: 1500 } });
    fireEvent.change(amountOfItems, { target: { value: 2 } });
    fireEvent.change(time, { target: { value: '2023-12-14' } });

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(screen.getByTestId('fee')).toHaveTextContent('Delivery price: 11€');
  });
});
