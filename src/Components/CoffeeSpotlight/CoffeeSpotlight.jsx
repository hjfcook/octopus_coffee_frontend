import styles from './CoffeeSpotlight.module.css';

import React, {useState} from 'react';


function CoffeeSpotlight(props) {
//state
//other functions n stuff
//return stuff in a div
  return (
    <div className={styles.coffeeSpotlight}>
      <h1>
        {props.name}
      </h1>
      <p>
        {props.continent}
      </p>
      <p>
        {props.country}
      </p>
      <p>
        {props.process}
      </p>
      <p>
        {props.price}
      </p>
      <p>
        {props.roast}
      </p>
      <p>
        {props.description}
      </p>
      <p>
        {props.descriptors}
      </p>
    </div>
  );
}

export default CoffeeSpotlight;