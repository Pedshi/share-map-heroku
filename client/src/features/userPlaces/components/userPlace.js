import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/_userPlace.scss';

import { ListWindow, renderStatusEffect } from '../../../common';
import {  addPlaces, 
          userReducerName, 
          fetchPlaces,
          placeReducerName, 
          fetchAllPlaces } from '..';

function UserPlace() {

  const [selectedPlaces, setSelectedPlaces] = useState(null);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(true);

  const { places, status } = useSelector( state => state[placeReducerName] );
  const { requestSuccess, places: userPlaces } = useSelector( state => state[userReducerName] );
  const dispatch = useDispatch();

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
    <div className="user-place">
      <div className="user-place__form-container">
        <div className="user-place__card">
          {status === 'loading' || status === 'rejected' ? (
            renderStatusEffect(status)
          ) : (
            <div>
              <Link to="/place/create">
                <p>Go To Create Place 👉</p>
              </Link>
              <h2>Your Saved places</h2>
              <input type="text" placeholder="Search" onChange={filterPlaces} />
              <div className="user-place__lists">
                <ListWindow listOfItems={ isSearchEmpty ? userPlaces: filteredPlaces } />
                <select multiple className="user-place__select" onChange={addToPlaces}>
                  {places.map( (place) => (
                    <option key={place._id} value={place._id}>
                      { place.name }
                    </option>
                  ))}
                </select>
              </div>
              <div className="user-place__add-button">    
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
    </div>
  );
}

export default UserPlace;