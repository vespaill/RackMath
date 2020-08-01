import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './components/navBar';
import Inventory from './components/inventory';
import NotFound from './components/common/notFound';
import Loader from './components/loader';
import SetsCalculator from './components/setsCalculator';
import About from './components/about';
// import { modQuantity, expandFromQuantity } from './utils/inventory';
import { calcBgColor } from './utils/calcBgColor';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import './css/utils.css';
import './css/toastify.css';

const MAX_PLATES = 8;

const roundToNearestStep = (load, barbell, step) => {
  const remainder = (load - barbell) % step;
  const dividend = load - remainder;
  return remainder >= step / 2 ? dividend + step : dividend;
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

    ['lbs', 'kg'].forEach(unit => {
      availPlates[unit] = this.state.availPlates[unit].map((plate, index) => ({
        ...plate,
        color: calcBgColor(index)
      }));
    });

    this.setState({ availPlates });
  }

  render() {
    const { unit, barbell, availPlates, calcdPlates, calcdLoad } = this.state;
    const { prevCalcdLoad, workWeight, workNumReps, warmUpSets } = this.state;
    const loaderProps = {
      unit,
      barbellWeight: barbell[unit],
      calcdPlates,
      calcdLoad,
      prevCalcdLoad,
      onSubmit: this.handleLoadSubmit,
      resetPrevLoad: this.resetPrevLoad
    };
    const invProps = {
      unit,
      barbell,
      availPlates,
      onPlateGroupClick: this.handlePlateGroupClick,
      onUnitClick: this.handleUnitClick,
      onClear: this.handlePlateGroupsClear
    };
    const setsCalcProps = {
      unit,
      workWeight,
      workNumReps,
      warmUpSets,
      onSubmit: this.handleWorkSetSubmit,
      onLoad: this.handleLoad
    };

    const toastProps = {
      // limit: 1,
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnFocusLoss: false,
      draggable: false,
      pauseOnHover: false,
      newestOnTop: true
    };

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

    this.setState({
      unit,
      calcdPlates: [], // reset calculated plates
      calcdLoad: -1,
      prevCalcdLoad: -1,
      workWeight: -1, // reset working weight
      warmUpSets: [] // reset working weight
    });

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
    // console.log(e.currentTarget.firstElementChild.firstElementChild);
    this.handleLoad(e.currentTarget.loadInput.value);
    // e.currentTarget.loadInput.value = '';
  };

  handleLoad = load => {
    const { unit } = this.state;
    const barbellWeight = this.state.barbell[unit];

    /* Get the available plates and half their quantities. We're going to work
       with loading one side of the barbell. */
    let availPlates = [...this.state.availPlates[unit]];
    availPlates = availPlates
      .filter(({ quantity }) => quantity > 0)
      .map(plate => {
        const { value, color, quantity } = plate;
        return { value, color, quantity: quantity / 2 };
      });

    const { valid, errMsg } = this.validateLoad(load, barbellWeight, availPlates);
    const prevCalcdLoad = this.state.calcdLoad;

    if (!valid) {
      this.setState({ calcdPlates: [], calcdLoad: -1, prevCalcdLoad });
      toast.error(errMsg);
    } else {
      const { success, warn, calcdLoad, calcdPlates, roundOff } = this.calculatePlates(
        load,
        barbellWeight,
        availPlates
      );

      if (warn === 'justbar') toast.success('Just the bar!');
      else if (warn === 'roundoff') {
        const updown = roundOff.up ? 'up' : 'down';
        toast.warn(`Your inventory doesn't work with that weight. Rounded ${updown} by ${roundOff.amount} ${unit}.`);
      } else if (warn === 'notEnoughRoom') toast.error('Not enough room on the bar!');

      if (success) {
        // const calcdLoad = calcdPlates.reduce((acc, cur) => acc + cur.value, 0) * 2 + barbellWeight;
        this.setState({ calcdPlates, calcdLoad, prevCalcdLoad });
      } else this.setState({ calcdPlates: [], calcdLoad: -1, prevCalcdLoad });
    }
  };

  validateLoad = (load, bar, availPlates) => {
    if (load < bar) return { valid: false, errMsg: "That's not even the bar!" };
    const total = bar + 2 * availPlates.reduce((acc, cur) => acc + cur.value * cur.quantity, 0);
    if (load > total) return { valid: false, errMsg: "Your inventory doesn't work with that weight" };
    return { valid: true };
  };

  calculatePlates = (targetLoad, barWeight, availPlates) => {
    const success = true;
    if (targetLoad - barWeight === 0) return { success, warn: 'justbar', calcdLoad: barWeight, calcdPlates: [] };
    let cpyAvailPlates = availPlates.map(plate => ({ ...plate }));
    let combinations = [];

    while (cpyAvailPlates.length > 0) {
      let { warn, calcdLoad, calcdPlates, roundOff } = this.calcPlatesHelper(targetLoad, barWeight, cpyAvailPlates);
      if (warn === 'notEnoughRoom') break;
      combinations.push({ warn, calcdLoad, calcdPlates, roundOff });
      cpyAvailPlates[0].quantity--;
      if (cpyAvailPlates[0].quantity === 0) cpyAvailPlates.shift();
    }

    if (combinations.length === 0) return { success: false, warn: 'notEnoughRoom', calcdLoad: -1, calcdPlates: [] };

    const validCombs = combinations.map(comb => ({ ...comb })).filter(comb => comb.warn === undefined);
    const minRoundOff = validCombs.reduce((prev, cur) => (prev.roundOff < cur.roundOff ? prev : cur)).roundOff;
    const leastRoundOffCombs = validCombs.map(comb => ({ ...comb })).filter(comb => comb.roundOff === minRoundOff);
    const minNumPlates = leastRoundOffCombs.reduce((prev, cur) =>
      prev.calcdPlates.length < cur.calcdPlates.length ? prev : cur
    ).calcdPlates.length;
    const leastNumPlatesCombs = leastRoundOffCombs
      .map(comb => ({ ...comb }))
      .filter(comb => comb.calcdPlates.length === minNumPlates);

    console.log('combinations:', combinations);
    console.log('validCombs:', validCombs);
    console.log('leastRoundOffCombs:', leastRoundOffCombs);
    console.log('leastNumPlatesCombs:', leastNumPlatesCombs);

    const { calcdLoad, calcdPlates, roundOff: roundOffAmount } = leastNumPlatesCombs[0];
    let warn, roundOff;
    if (roundOffAmount) {
      warn = 'roundoff';
      roundOff = { amount: roundOffAmount, up: calcdLoad > targetLoad };
    }

    // console.log('roundOff:', roundOff);

    return { success, calcdLoad, calcdPlates, roundOff, warn };
  };

  calcPlatesHelper = (targetLoad, barbellWeight, availPlates) => {
    let calcdLoad = barbellWeight;
    const calcdPlates = [];
    let cpyAvailPlates = availPlates.map(plate => ({ ...plate }));
    const smallestPlate = cpyAvailPlates.reduce((prev, cur) => (prev.value < cur.value ? prev : cur)).value;
    // console.log(smallestPlate);

    for (let plateGroup of cpyAvailPlates) {
      let { value, color, quantity } = plateGroup;
      for (let i = 0; i < quantity; ++i) {
        const nextLoad = plateGroup.value * 2;
        const dif = Math.abs(targetLoad - (calcdLoad + nextLoad));
        if (calcdLoad + nextLoad <= targetLoad || dif < smallestPlate) {
          calcdLoad += nextLoad;
          calcdPlates.push({ value, color });
          if (calcdPlates.length > MAX_PLATES) return { warn: 'notEnoughRoom', calcdLoad: -1, calcdPlates: [] };
          plateGroup.quantity--;
        }
      }
    }

    return { calcdLoad, calcdPlates, roundOff: Math.abs(targetLoad - calcdLoad) };
  };

  handleWorkSetSubmit = e => {
    e.preventDefault();
    e.currentTarget.firstElementChild.querySelectorAll('input').forEach(elem => {
      elem.blur();
    });
    const { value: workWeight } = e.currentTarget.loadInput;
    const { value: workNumReps } = e.currentTarget.numRepsInput;

    if (workWeight && workNumReps) {
      const warmUpSets = [];
      const { percentages, unit, barbell, availPlates } = this.state;

      const barbellWeight = barbell[unit];
      const smallestAvailPlate = availPlates[unit]
        .filter(plate => plate.quantity > 0)
        .map(plate => plate.value)
        .reduce((prev, cur) => (prev < cur ? prev : cur));

      // console.log(smallestAvailPlate);

      percentages.forEach(percentage => {
        warmUpSets.push({
          percentage,
          weight: roundToNearestStep(workWeight * percentage, barbellWeight, smallestAvailPlate * 2),
          numReps: calcWarmUpReps(percentage, workNumReps)
        });
      });
      this.setState({ workWeight, workNumReps, warmUpSets });
    } else this.setState({ workWeight: -1, workNumReps: -1, warmUpSets: [] });
  };

  handlePlateGroupsClear = () => {
    const { unit } = this.state;
    let availPlates = { ...this.state.availPlates };
    availPlates[unit] = availPlates[unit].map(({ value, color }) => ({ value, quantity: 0, color }));
    this.setState({ availPlates });
  };

  resetPrevLoad = () => {
    this.setState({ prevCalcdLoad: -1 });
  };
}

export default App;
