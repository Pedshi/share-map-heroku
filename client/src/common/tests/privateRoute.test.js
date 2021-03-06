import React from 'react';
import makeStore from '../../app/store';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute } from '../';
import { render, screen } from '@testing-library/react';
import { authenticateUser } from '../../features/login';
import { createMemoryHistory } from 'history';

const privateRoute = (children, store, history) => {
  const privateRouteComp = (<PrivateRoute> { children } </PrivateRoute>);
  const renderScene = (
    <Provider store={store}>
      { history ? 
          <Router history={history}> { privateRouteComp } </Router> : 
          <BrowserRouter> { privateRouteComp } </BrowserRouter>
      }
    </Provider>
  );
  return renderScene;
};

describe('Private Route', () => {
  const testId = 'mock-comp';
  const mockChild = ( <div data-testid={testId} /> );

  const storeWithSpy = () => {
    const store = makeStore();
    const originalDispatch = store.dispatch;
    store.dispatch = jest.fn(originalDispatch);
    return store;
  };

  test('should view child', () => {
    const store = storeWithSpy();
    store.dispatch(authenticateUser.fulfilled());

    render(privateRoute(mockChild, store));

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  test('should not view child', () => {
    const history = createMemoryHistory();
    const route = '/private-route';
    history.push(route);

    render(privateRoute(mockChild, makeStore(), history));

    expect(history.location.pathname).toBe('/');
  });
});