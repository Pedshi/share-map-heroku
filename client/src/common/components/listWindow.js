import React from 'react';
import '../styles/_components.scss';

function ListWindow(props){

  return(
    <div className="list-window">
      <ul >
        {props.listOfItems.map( (item) => (
          <li key={item._id}>{ item.name }</li>
        ))}
      </ul>
    </div>
  );
}

export default ListWindow;