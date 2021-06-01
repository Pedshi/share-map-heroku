import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import makeStore from '../../../app/store';
import { BrowserRouter } from 'react-router-dom';
import PlaceScreen from '../';
import useCreatePlace from '../hooks/useCreatePlace';

jest.mock('../hooks/useCreatePlace', () => {
  return {
    __esModule: true,
    default: () => [ {status: 'idle'}, jest.fn()]
  };
});

const [state, createPlace] = useCreatePlace();

describe('Place tests', () => {

  const placeComponent = () => render(
    <BrowserRouter>
      <PlaceScreen />
    </BrowserRouter>
  );
  
  test('should not create place', () => {
    const store = makeStore();
    placeComponent(store);
    
    const input = screen.getByRole('textbox', {name: /address/i});
    const submitButton = screen.getByRole('button', {name: /create place/i});
    userEvent.type(input, 'test address');
    userEvent.click(submitButton);

    expect(createPlace).not.toHaveBeenCalled();
  });

});