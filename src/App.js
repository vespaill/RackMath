import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavBarBottom from './components/navBarBottom';
import Inventory from './components/inventory';
import NotFound from './components/common/notFound';
import LoadPlateCalc from './components/loadPlateCalc';
import WarmUpSetCalc from './components/warmUpSetCalc';
import About from './components/about';
import { modQuantity, expandFromQuantity } from './utils/inventory';
import { calcBgColor } from './utils/calcBgColor';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import './css/utils.css';
import './css/toastify.css';

const MAX_PLATES = 8;

const roundToNearestStep = (value, step) => {
  const remainder = value % step;
  if (remainder >= step / 2) return value - remainder + step;
  return value - remainder;
};

const calcWarmUpReps = (percentage, workingNumSets) => {
  const numReps = Math.round(workingNumSets * (2 - 4 * (percentage - 0.5)));
  return numReps > 0 ? numReps : 1;
};

class App extends Component {
  state = {
    // Inventory related
    unit: 'lbs',
    barbell: {
      lbs: 45,
      kg: 20
    },
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

    // Warm Up related
    percentages: [0.5, 0.6, 0.7, 0.8, 0.9, 1.1],
    workingWeight: -1,
    workingNumReps: -1,
    warmUpSets: [
      /* {percentage, weight, numReps}, ... */
    ]
  };

  componentDidMount() {
    let availPlates = {};

    ['lbs', 'kg'].forEach(unit => {
      availPlates[unit] = this.state.availPlates[unit].map((plate, index) => ({
        ...plate,
        color: calcBgColor(index)
      }));
    });

    this.setState({ availPlates });
  }

  render() {
    const {
      unit,
      barbell,
      calcdPlates,
      calcdLoad,
      availPlates,
      workingWeight,
      workingNumReps,
      warmUpSets
    } = this.state;

    const loaderProps = { unit, barbellWeight: barbell[unit], calcdPlates, calcdLoad, onSubmit: this.handleLoadSubmit };
    const invProps = {
      unit,
      barbell,
      availPlates,
      onPlateGroupClick: this.handlePlateGroupClick,
      onUnitClick: this.handleUnitClick,
      onClear: this.handlePlateGroupsClear
    };
    const warmUpProps = {
      unit,
      workingWeight,
      workingNumReps,
      warmUpSets,
      onSubmit: this.handleWorkSetSubmit,
      onLoad: this.handleLoad
    };
    return (
      <>
        <div className="container" style={{ paddingBottom: '70px' }}>
          <ToastContainer
            limit={1}
            autoClose={2000}
            hideProgressBar
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
          <Switch>
            <Route path="/home" render={() => <LoadPlateCalc {...loaderProps} />} />
            <Route path="/inventory" render={() => <Inventory {...invProps} />} />
            <Route path="/warmup" render={() => <WarmUpSetCalc {...warmUpProps} />} />
            <Route path="/about" component={About}></Route>
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/home" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <NavBarBottom />
      </>
    );
  }

  handleUnitClick = e => {
    let { unit } = this.state;
    if (unit === 'lbs') unit = 'kg';
    else unit = 'lbs';

    this.setState({
      unit,
      calcdPlates: [], // reset calculated plates
      calcdLoad: -1,
      workingWeight: -1, // reset working weight
      warmUpSets: [] // reset working weight
    });

    e.currentTarget.classList.add('animate-wiggle');
    e.currentTarget.classList.remove('animate-wiggle');
  };

  handlePlateGroupClick = value => {
    const { unit } = this.state;
    const cpy = { ...this.state.availPlates };
    const i = cpy[unit].findIndex(element => element.value === value);
    cpy[unit][i].quantity = (cpy[unit][i].quantity + 2) % (MAX_PLATES + 2);
    this.setState({ availPlates: cpy });
  };

  handleLoadSubmit = e => {
    e.preventDefault();
    // Blur in order to hide keyboard on mobile.
    e.currentTarget.firstElementChild.firstElementChild.blur();
    console.log(e.currentTarget.firstElementChild.firstElementChild);
    this.handleLoad(e.currentTarget.loadInput.value);
    // e.currentTarget.loadInput.value = '';
  };

  handleLoad = load => {
    const { unit, availPlates } = this.state;
    const barbellWeight = this.state.barbell[unit];
    const halfQuantity = modQuantity(availPlates[unit], 0.5);
    const plateObjs = expandFromQuantity(halfQuantity);
    const { valid, errMsg } = this.validateLoad(load, barbellWeight, plateObjs);

    if (!valid) {
      this.setState({ calcdPlates: [], calcdLoad: -1 });
      toast.error(errMsg);
    } else {
      const { success, warn, calcdPlates, roundedOffAmount } = this.calculatePlates(load, barbellWeight, plateObjs);

      if (warn === 'justbar') toast.success('Just the bar!');
      else if (warn === 'roundoff') toast.warn(`${roundedOffAmount} ${unit} has been rounded off.`);
      else if (warn === 'room') toast.error('Not enough room on the bar!');

      if (success) {
        const calcdLoad = calcdPlates.reduce((acc, cur) => acc + cur.value, 0) * 2 + barbellWeight;
        this.setState({ calcdPlates, calcdLoad });
      } else this.setState({ calcdPlates: [], calcdLoad: -1 });
    }
  };

  validateLoad = (load, barbell, plateObjs) => {
    if (load < barbell)
      return {
        valid: false,
        errMsg: "That's not even the bar!"
      };

    const totalWeightAvail = barbell + 2 * plateObjs.reduce((acc, cur) => acc + cur.value, 0);

    if (load > totalWeightAvail)
      return {
        valid: false,
        errMsg: "Your inventory doesn't work with that weight"
      };

    return { valid: true };
  };

  /**
   * Returns an array containing the plates objects that must loaded on one side
   * of a barbell in order to meet a target load. If not possible, the success
   * flag will be false.
   * @param {Number} targetLoad - Weight to load onto barbell.
   * @param {Number} barbellWeight - Weight of the barbell.
   * @param {Object[]} plateObjs - Available plate objects for one side of bar.
   * @param {Number} plateObjs[].value - The plate's weight.
   * @param {String} plateObjs[].color - The plate's color.
   */
  calculatePlates = (targetLoad, barbellWeight, plateObjs) => {
    let workingLoad = targetLoad - barbellWeight;
    let success = true;
    let calcdPlates = [];

    if (workingLoad === 0) return { success, warn: 'justbar', calcdPlates };

    // Work with one side of the barbell. Presumably, both sides are identical.
    workingLoad /= 2;
    for (let plate of plateObjs) {
      if (workingLoad >= plate.value) {
        calcdPlates.push(plate);
        if (calcdPlates.length > MAX_PLATES) return { success: false, warn: 'room' };
        workingLoad -= plate.value;
      }
    }
    if (workingLoad !== 0) return { success, warn: 'roundoff', roundedOffAmount: workingLoad * 2, calcdPlates };
    return { success, calcdPlates };
  };

  handleWorkSetSubmit = e => {
    e.preventDefault();
    e.currentTarget.firstElementChild.querySelectorAll('input').forEach(elem => {
      elem.blur();
    });
    const { value: workingWeight } = e.currentTarget.loadInput;
    const { value: workingNumReps } = e.currentTarget.numRepsInput;

    if (workingWeight && workingNumReps) {
      const warmUpSets = [];
      const { percentages } = this.state;
      percentages.forEach(percentage => {
        warmUpSets.push({
          percentage,
          weight: roundToNearestStep(workingWeight * percentage, 5),
          numReps: calcWarmUpReps(percentage, workingNumReps)
        });
      });
      this.setState({ workingWeight, workingNumReps, warmUpSets });
    } else this.setState({ workingWeight: -1, workingNumReps: -1, warmUpSets: [] });
  };

  handlePlateGroupsClear = () => {
    const { unit } = this.state;
    let availPlates = { ...this.state.availPlates };
    availPlates[unit] = availPlates[unit].map(({ value, color }) => ({ value, quantity: 0, color }));
    this.setState({ availPlates });
  };
}

export default App;
