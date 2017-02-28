import React from 'react';

/**
 * When displaying the counter, we want the seconds
 * remaining to display with two digits. I.e. 6 seconds
 * remaining should display as 06.
 * @param {[Integer]} number [The display number]
 */
const addLeadingZerosToNumber = (number) => {
  let returnVal;
  if (number.toString().length === 1) {
    returnVal = `0${number}`;
  } else {
    returnVal = number;
  }
  return returnVal;
};


/**
 * Display the countdown timer
 * @param {[type]} props [contains the time remaining in the countdown]
 */
const CountdownTimer = (props) => {
  CountdownTimer.propTypes = {
    remainingTime: React.PropTypes.number.isRequired,
  };


  const minUntilNextSet = Math.floor((props.remainingTime % (60 * 60)) / 60);
  const secUntilNextSet = addLeadingZerosToNumber(Math.floor(props.remainingTime % 60));

  return (
    <div className="setCountdownTimer">
      <p className="mobile">
        {minUntilNextSet} : {secUntilNextSet}
      </p>
      <p className="desktop">
        <b>Time in between sets: </b>{minUntilNextSet} min {secUntilNextSet} sec
      </p>
    </div>
  );
};

export default CountdownTimer;
