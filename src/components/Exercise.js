import React from 'react';

const Exercise = props =>
  <div>
    {props.params.name}
  </div>;

Exercise.propTypes = {
  params: React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default Exercise;
