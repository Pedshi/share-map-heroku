import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputWLabel, renderStatusEffect } from '../../../common';
import useCreatePlace from '../hooks/useCreatePlace';
import '../styles/_createPlace.scss';

const categoryOptions = [
  {label: "Bar",        value: 1},
  {label: "Cafe",       value: 2},
  {label: "Restaurant", value: 3},
  {label: "Shop",       value: 4}
];

function Place() {

  const [createPlaceState, createPlace] = useCreatePlace();
  const { status, createdPlace } = createPlaceState;

  const [placeName, setPlaceName] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [igLocationUrl, setIgLocationUrl] = useState('');
  const [category, setCategory] = useState(1);
  const [openingHours, setOpeningHours] = useState({
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
    sun: ''
  });

  const updateOpeningHours = (name) => (value) => {
    setOpeningHours({
      ...openingHours,
      [name]: value
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const place = {
      name: placeName,
      address,
      latitude,
      longitude,
      igLocationUrl,
      openingHours,
      category
    };
    createPlace(place);
  };

  return (
    <div className="create-place">
      <div className="create-place__form-container">
        <div className="create-place__card">
          <Link to="/place/user">
            <p>Go To My Places 👉</p>
          </Link>
          <form onSubmit={onSubmitHandler}>
            <div className="create-place__row">
              <InputWLabel labelText="Name of Place" value={placeName}  onValueChange={setPlaceName}/>
              <InputWLabel labelText="Address" value={address} onValueChange={setAddress}/>
            </div>
            <div className="create-place__row">
              <InputWLabel labelText="Latitude" value={latitude} onValueChange={setLatitude} />
              <InputWLabel labelText="Longitude" value={longitude} onValueChange={setLongitude} />
            </div>
            <div className="create-place__row">
            <InputWLabel labelText="Instagram Location Tag Url" value={igLocationUrl} onValueChange={setIgLocationUrl} />
            <div className="align-self-center">
              <select onChange={e => setCategory(parseInt(e.target.value))}>
                {categoryOptions.map( (category) => (
                    <option key={category.value} value={category.value}>
                      { category.label }
                    </option>
                  )
                )}
              </select>
            </div>
            </div>
            <div className="create-place__open-time">
              {Object.keys(openingHours).map( (key) => (
                <InputWLabel key={key} labelText={key} value={openingHours[key]} onValueChange={updateOpeningHours(key)} />
                ) 
              )}
            </div>
            <br/>
            <input type="submit" value="Create Place"/>
          </form>
          { renderStatusEffect(status, 'Unable to save place!') }
          {createdPlace && (
            <div>
              <p>Succefully saved {placeName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Place;