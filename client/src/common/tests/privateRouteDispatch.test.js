import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PrivateRoute } from '../';
import makeStore from '../../app/store';

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

const authenticateUserReturnValue = { type: '' };
jest.mock('../../features/login/slices/authSlice', () => {
  return {
    __esModule: true,
    ...jest.requireActual('../../features/login/slices/authSlice'),
    authenticateUser:  () => { return authenticateUserReturnValue }
  };
});

describe('Private Route Dispatch', () => {

  const storeWithSpy = () => {
    const store = makeStore();
    const originalDispatch = store.dispatch;
    store.dispatch = jest.fn(originalDispatch);
    return store;
  };
  test('should dispatch authenticate user', () => {
    const store = storeWithSpy();
    const d = (<div/>)
    render(privateRoute(d, store));

    expect(store.dispatch).toHaveBeenCalledWith(authenticateUserReturnValue);
  });
});