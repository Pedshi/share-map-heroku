import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginScreen from '../features/login';
import PlaceScreen from '../features/createPlace';
import UserPlaceScreen from '../features/userPlaces';
import { PrivateRoute } from '../common';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path={'/place/create'}>
          <PlaceScreen />
        </PrivateRoute>
        <PrivateRoute path={'/place/user'}>
          <UserPlaceScreen />
        </PrivateRoute>

        <Route path={'/'}>
          <LoginScreen />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
