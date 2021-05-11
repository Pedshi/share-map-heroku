import React from 'react';

function ListWindow(props){

  return(
    <div className="user-place-window">
      <ul >
        {props.listOfItems.map( (item) => (
          <li key={item._id}>{ item.name }</li>
        ))}
      </ul>
    </div>
  );
}

export default ListWindow;