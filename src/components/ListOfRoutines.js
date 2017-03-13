import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


const ListOfRoutines = ({ routines, handleRoutineSelection, customStyle }) => {


  ListOfRoutines.propTypes = {
    routines: React.PropTypes.arrayOf(
      React.PropTypes.shape({}),
    ).isRequired,
    handleRoutineSelection: React.PropTypes.func.isRequired,
    customStyle: React.PropTypes.shape({}),
  };

  ListOfRoutines.defaultProps = {
    customStyle: undefined,
  };

  return (
    <ListGroup>
      <h1>List of Routines</h1>
      {routines.map((routine) => {
        return (
          <ListGroupItem
            key={routine.name}
            onClick={handleRoutineSelection}
            style={customStyle}
          >{routine.name}
          </ListGroupItem>);
      })}
    </ListGroup>
  );
};

export default ListOfRoutines;
