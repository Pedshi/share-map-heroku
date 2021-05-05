import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ListWindow from '../../common/listWindow';
import { renderStatusEffect } from '../../common/inputWLabel';
import { placeReducerName, fetchAllPlaces } from '../createPlace/placeSlice';
import { addPlaces, userReducerName, fetchPlaces } from '../login/userSlice';

function UserPlace() {

  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);

  const { places, status } = useSelector( state => state[placeReducerName] );
  const { requestSuccess, places: userPlaces } = useSelector( state => state[userReducerName] );
  const dispatch = useDispatch();

  // This needs to be moved up so that when you enter site through any url this should happen
  useEffect( () => {
    dispatch(fetchAllPlaces());
    dispatch(fetchPlaces());
  },[]);

  const addSelectedPlace = () => {
    if (selectedPlaces)
      dispatch(addPlaces({ places: selectedPlaces }));
  };

  const filterPlaces = ({ target }) => {
    const { value: input } = target;
    if( !input ) {
      setFilteredPlaces([]);
      setIsSearchEmpty(true);
    }
    else{
      setFilteredPlaces( userPlaces.filter( 
        (place) => place.name.toLowerCase().includes( input.toLowerCase() )
      ));
      if( isSearchEmpty )
        setIsSearchEmpty(false);
    }
  };

  const addToPlaces = ({ target }) => {
    const selectedOptions = Array.from(target.selectedOptions, option => option.value);
    setSelectedPlaces(selectedOptions);
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        {status === 'loading' || status === 'rejected' ? (
          renderStatusEffect(status)
        ) : (
          <div className="flex-end">
            <div >
              <Link to="/place/create">
                <button>Go To Create Place</button>
              </Link>
              <p>Your Saved places</p>
              <input type="text" placeholder="Search" onChange={filterPlaces} />
              <ListWindow listOfItems={ isSearchEmpty ? userPlaces: filteredPlaces } />
            </div>
            <div>
              <select multiple className="h150" onChange={addToPlaces}>
                {places.map( (place) => (
                  <option key={place._id} value={place._id}>
                    { place.name }
                  </option>
                ))}
              </select>
              <button onClick={addSelectedPlace}>Add to My Places</button>
            </div>
          </div>
        )}
        {requestSuccess && (
          <div>
            <p>Place added!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPlace;