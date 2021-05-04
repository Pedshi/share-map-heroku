import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ListWindow from '../../common/listWindow';
import { renderStatusEffect } from '../../common/inputWLabel';
import { placeReducerName, fetchAllPlaces } from '../createPlace/placeSlice';
import { addPlace, userReducerName, fetchPlaces } from '../login/userSlice';

function UserPlace() {

  const [selectedPlace, setSelectedPlace] = useState(null);
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
    if (selectedPlace)
      dispatch(addPlace(selectedPlace));
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

  return (
    <div className="wrapper">
      <div className="form-container">
        <Link to="/place/create">
          <button>Go To Create Place</button>
        </Link>
        <div>
          <p>Your Saved places</p>
          <input type="text" placeholder="Search" onChange={filterPlaces} />
          <ListWindow listOfItems={ isSearchEmpty ? userPlaces: filteredPlaces } />
        </div>
        <div className="row-baseline">
          <p>All places:</p>
          <select onChange={ (e) => setSelectedPlace(e.target.value) }>
            { places.map( (place) => (
              <option key={place._id} value={place._id}>
                { place.name }
              </option>
            ))
            }
          </select>
          <button onClick={addSelectedPlace}>Add to My Places</button>
        </div>
        {renderStatusEffect(status)}
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