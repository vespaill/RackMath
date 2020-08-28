import React from 'react';
import { Link } from 'react-router-dom';
import '../css/about.css';

const About = () => {
  return (
    <div className="about" >
      <h1 style={{textAlign: 'center'}}>Less Thinking, More Lifting</h1>
      <p><strong>Workout faster.</strong> Quickly figure out which plates to mount onto a barbell in order to hit a target weight.</p>
      <p>No more trying to do barbell math in your head. Simply <Link to="/home">enter a value</Link> and see what plates you would need.</p>
      <p><strong>Accommodate inventory.</strong> Find the most optimal plate combination, given the <Link to="/inventory">plates you have available</Link> at the moment.</p>
      <p><strong>Workout smarter.</strong> Warm up by doing some <Link to="/warmup">Ramp Up</Link> sets before starting a heavy set.</p>
      <div className="example">
        <p className="m-0"><strong>Example:</strong></p>
        <p className="m-0">You trying to load 215 lbs:</p>
        <blockquote>"If the barbell weighs 45, add a plate 45 on each end, that makes 135, then add a plate 35, that makes 205, ..., Oh snap, there are no plate 35s ..."</blockquote>
        <p className="m-0">You with Barbell Loader:</p>
        <blockquote className="mb-0">"Enter 215, immediately see the required plate combination. No 35s? No problem, check that plate group off your inventory and enter 215 again."</blockquote>
      </div>
      <p><strong>Barbell Loader</strong> was inspired by{' '}<a target="#blank" href="https://www.happyliftingco.com/pages/rackmath">RackMath</a>{' '}and built from scratch by Victor Espaillat with the help of React.js and Bootstrap.</p>
    </div>
  );
};

export default About;
