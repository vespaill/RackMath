import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './components/navBar';
import Inventory from './components/inventory';
import NotFound from './components/common/notFound';
import Loader from './components/loader';
import SetsCalculator from './components/setsCalculator';
import About from './components/about';
import { roundToNearestStep, calcRampUpReps } from './utils/rampUps';
import { calcBgColor } from './utils/calcBgColor';
import { MAX_PLATES, modQuantity, withinRange, calculatePlates } from './utils/plates';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import './css/utils.css';
import './css/toastify.css';

class App extends Component {
  state = {
    // Inventory related
    unit: 'lbs',
    barbell: { lbs: 45, kg: 20 },
    availPlates: {
      lbs: [
        { value: 100, quantity: 0 },
        { value: 65, quantity: 0 },
        { value: 55, quantity: 0 },
        { value: 50, quantity: 0 },
        { value: 45, quantity: MAX_PLATES },
        { value: 35, quantity: 0 },
        { value: 30, quantity: 0 },
        { value: 25, quantity: MAX_PLATES },
        { value: 20, quantity: 0 },
        { value: 15, quantity: 0 },
        { value: 12.5, quantity: 0 },
        { value: 10, quantity: MAX_PLATES },
        { value: 7.5, quantity: 0 },
        { value: 5, quantity: MAX_PLATES },
        { value: 2.5, quantity: MAX_PLATES },
        { value: 1.25, quantity: 0 },
        { value: 1, quantity: 0 },
        { value: 0.75, quantity: 0 },
        { value: 0.5, quantity: 0 },
        { value: 0.25, quantity: 0 }
      ],
      kg: [
        { value: 50, quantity: 0 },
        { value: 45, quantity: 0 },
        { value: 35, quantity: 0 },
        { value: 30, quantity: 0 },
        { value: 25, quantity: 0 },
        { value: 20, quantity: MAX_PLATES },
        { value: 15, quantity: 0 },
        { value: 12.5, quantity: 0 },
        { value: 10, quantity: MAX_PLATES },
        { value: 7.5, quantity: 0 },
        { value: 5, quantity: MAX_PLATES },
        { value: 3, quantity: 0 },
        { value: 2.5, quantity: MAX_PLATES },
        { value: 2, quantity: 0 },
        { value: 1.5, quantity: 0 },
        { value: 1.25, quantity: MAX_PLATES },
        { value: 1, quantity: 0 },
        { value: 0.75, quantity: 0 },
        { value: 0.5, quantity: 0 },
        { value: 0.25, quantity: 0 }
      ]
    },
    calcdPlates: [],
    calcdLoad: -1,
    prevCalcdLoad: -1,

    // Warm Up related
    percentages: [0.5, 0.6, 0.7, 0.8, 0.9, 1.1],
    workWeight: -1,
    workNumReps: -1,
    warmUpSets: [
      /* {percentage, weight, numReps}, ... */
    ]
  };

  componentDidMount() {
    let availPlates = {};
    // Give plates a color property.
    ['lbs', 'kg'].forEach(unit => {
      availPlates[unit] = this.state.availPlates[unit].map((plate, index) => ({
        ...plate,
        color: calcBgColor(index)
      }));
    });
    this.setState({ availPlates });
  }

  render() {
    const { unit, barbell, availPlates, calcdPlates, calcdLoad, prevCalcdLoad, workWeight, workNumReps, warmUpSets } = this.state;
    const loaderProps = { unit, barbellWeight: barbell[unit], calcdPlates, calcdLoad, prevCalcdLoad, onSubmit: this.handleLoadSubmit, resetPrevLoad: this.resetPrevLoad };
    const invProps = { unit, barbell, availPlates, onPlateGroupClick: this.handlePlateGroupClick, onUnitClick: this.handleUnitClick, onClear: this.handlePlateGroupsClear };
    const setsCalcProps = { unit, workWeight, workNumReps, warmUpSets, onSubmit: this.handleWorkSetSubmit, onLoad: this.handleLoad };
    const toastProps = { /* limit: 1, */ autoClose: 1000, hideProgressBar: true, pauseOnFocusLoss: false, draggable: false, pauseOnHover: false, newestOnTop: true };
    return (
      <>
        <div className="container" style={{ paddingBottom: '70px' }}>
          <ToastContainer {...toastProps} />
          <Switch>
            <Route path="/home" render={() => <Loader {...loaderProps} />} />
            <Route path="/inventory" render={() => <Inventory {...invProps} />} />
            <Route path="/warmup" render={() => <SetsCalculator {...setsCalcProps} />} />
            <Route path="/about" component={About}></Route>
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <NavBar />
      </>
    );
  }

  handleUnitClick = e => {
    let { unit } = this.state;
    if (unit === 'lbs') unit = 'kg';
    else unit = 'lbs';
    this.setState({ unit, calcdPlates: [], calcdLoad: -1, prevCalcdLoad: -1, workWeight: -1, warmUpSets: [] });
    e.currentTarget.classList.add('animate-wiggle');
    e.currentTarget.classList.remove('animate-wiggle');
  };

  handlePlateGroupClick = value => {
    const { unit } = this.state;
    const availPlates = { ...this.state.availPlates };
    const i = availPlates[unit].findIndex(element => element.value === value);
    availPlates[unit][i].quantity = (availPlates[unit][i].quantity + 2) % (MAX_PLATES + 2);
    this.setState({ availPlates, calcdPlates: [], calcdLoad: -1, prevCalcdLoad: -1 });
  };

  handleLoadSubmit = e => {
    e.preventDefault();
    // Blur in order to hide keyboard on mobile.
    e.currentTarget.firstElementChild.firstElementChild.blur();
    this.handleLoad(e.currentTarget.loadInput.value);
    // e.currentTarget.loadInput.value = '';
  };

  handleLoad = load => {
    const { unit } = this.state;
    const barLoad = this.state.barbell[unit];
    let avlPltsOneSide = modQuantity([...this.state.availPlates[unit]], 0.5);
    const prevCalcdLoad = this.state.calcdLoad;
    const maxLoad = barLoad + 2 * avlPltsOneSide.reduce((acc, cur) => acc + cur.value * cur.quantity, 0);

    if (!withinRange(load, barLoad, maxLoad)) {

      this.setState({ calcdPlates: [], calcdLoad: -1, prevCalcdLoad });
      if (load < barLoad) toast.error("That's not even the bar!");
      else if (load > maxLoad) toast.error("Your inventory doesn't work with that weight");

    } else {
      const { success, warn, calcdLoad, calcdPlates, roundOff } = calculatePlates(load, barLoad, avlPltsOneSide);

      if (warn === 'justbar') toast.success('Just the bar!');
      else if (warn === 'roundoff') {
        toast.warn(`Inventory limitation—Load rounded ${roundOff.up ? 'up' : 'down'} by ${roundOff.amount} ${unit}.`);
      } else if (warn === 'notEnoughRoom') toast.error('Not enough room on the bar!');

      if (success) {
        console.log('warn:' ,warn);
        this.setState({ calcdPlates, calcdLoad, prevCalcdLoad });
      } else this.setState({ calcdPlates: [], calcdLoad: -1, prevCalcdLoad });
    }
  };

  handleWorkSetSubmit = e => {
    e.preventDefault();
    e.currentTarget.firstElementChild.querySelectorAll('input').forEach(elem => { elem.blur(); });
    const { value: workWeight } = e.currentTarget.loadInput;
    const { value: workNumReps } = e.currentTarget.numRepsInput;
    if (workWeight && workNumReps) {
      const warmUpSets = [];
      const { percentages, unit, barbell, availPlates } = this.state;
      const barbellWeight = barbell[unit];
      const lightestPlateAvail = availPlates[unit].filter(plate => plate.quantity > 0).map(plate => plate.value).reduce((prev, cur) => (prev < cur ? prev : cur));
      // console.log('handleWorkSetSubmit(): lightestPlate =', lightestPlateAvail);
      percentages.forEach(percentage => {
        const weight = roundToNearestStep(workWeight * percentage, barbellWeight, lightestPlateAvail * 2);
        const numReps = calcRampUpReps(percentage, workNumReps)
        warmUpSets.push({ percentage, weight, numReps });
      });
      this.setState({ workWeight, workNumReps, warmUpSets });
    } else this.setState({ workWeight: -1, workNumReps: -1, warmUpSets: [] });
  };

  handlePlateGroupsClear = () => {
    const { unit } = this.state;
    let availPlates = { ...this.state.availPlates };
    availPlates[unit] = availPlates[unit].map(({ value, color }) => ({ value, color, quantity: 0 }));
    this.setState({ availPlates });
  };

  resetPrevLoad = () => {
    this.setState({ prevCalcdLoad: -1 });
  };
}

export default App;
