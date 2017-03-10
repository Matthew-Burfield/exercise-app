import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


const ListOfRoutines = ({ state, handleRoutineSelection }) => {


  ListOfRoutines.propTypes = {
    state: React.PropTypes.shape({
      routines: React.PropTypes.shape({
      }).isRequired,
    }).isRequired,
    handleRoutineSelection: React.PropTypes.func.isRequired,
  };


  return (
    <ListGroup>
      <h1>List of Routines</h1>
      {state.routines.map((routine) => {
        return (
          <ListGroupItem
            key={routine.name}
            onClick={handleRoutineSelection}
          >{routine.name}
          </ListGroupItem>);
      })}
    </ListGroup>
  );
};

export default ListOfRoutines;
