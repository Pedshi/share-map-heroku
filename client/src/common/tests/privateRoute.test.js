import React from 'react';
import configureStore from 'redux-mock-store';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute } from '../';
import { authenticateUser } from '../../features/login';
import makeStore from '../../app/store';

describe('Private Route', () => {
  const testId = 'mock-comp';
  const renderPrivateRoute = (store) => render (
    <Provider store={store}>
      <BrowserRouter>
        <PrivateRoute>
          <div data-testid={testId} />
        </PrivateRoute>
      </BrowserRouter>
    </Provider>
  );

  const storeWithSpy = () => {
    const store = makeStore();
    const originalDispatch = store.dispatch;
    store.dispatch = jest.fn(originalDispatch);
    return store;
  };

  test('should view child', () => {
    const store = storeWithSpy();
    store.dispatch(authenticateUser.fulfilled());
    renderPrivateRoute(store);
    expect(screen.queryByTestId(testId)).toBeInTheDocument();
  });
  test('should not view child', () => {
    renderPrivateRoute(makeStore());
    expect(screen.queryByTestId(testId)).not.toBeInTheDocument();
  });
});
