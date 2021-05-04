
function ListWindow(props){

  return(
    <div className="user-place-window">
      <ul className="text-center">
        {props.listOfItems.map( (item) => (
          <li key={item._id}>{ item.name }</li>
        ))}
      </ul>
    </div>
  );
}

export default ListWindow;