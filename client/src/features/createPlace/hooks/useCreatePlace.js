import { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const initialState = {status: 'idle', createdPlace: false};

function fetchPlacesReducer(state, action){
  switch (action.type){
    case 'loading':
      return { ...state, status: 'loading' };
    case 'success':
      return { ...state, status: 'idle', createdPlace: true };
    default:
      return { ...state, status: 'rejected' };
  }
};

function useCreatePlace(){

  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer(fetchPlacesReducer, initialState);

  const createPlace = async (place) => {
    dispatch({ type: 'loading' });
    try{
      await axios.post('/api/place', place);
      if(isMounted())
        dispatch({ type: 'success' });
    }catch(error) { 
      if(isMounted())
        dispatch({ type: 'error' });
    }
  };

  return [ state, createPlace ];
}


function useIsMounted(){
  const isMounted = useRef(true);
  useEffect( () => () => { isMounted.current = false }, []);
  return () => isMounted.current;
}

export default useCreatePlace;