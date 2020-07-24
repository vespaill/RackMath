import React, { Component } from 'react';
import { Route, Switch, Redirect, useHistory, history } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
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

const roundToNearestFive = value => {
  const remainder = value % 5;
  if (remainder >= 2.5) return value - remainder + 5;
  return value - remainder;
};

class App extends Component {
  state = {
    inventory: {
      unit: 'lbs',
      barbell: {
        lbs: 45,
        kg: 20
      },
      availablePlates: {
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
      }
    },
    calculatedPlates: [],
    warmUp: {
      workingWeight: -1,
      sets: []
    }
  };

  componentDidMount() {
    let availablePlates = {};

    ['lbs', 'kg'].forEach(unit => {
      availablePlates[unit] = this.state.inventory.availablePlates[
        unit
      ].map((plate, index) => ({ ...plate, color: calcBgColor(index) }));
    });

    const { inventory } = this.state;
    inventory.availablePlates = availablePlates;
    this.setState({ inventory });
  }

  render() {
    const { unit, barbell } = this.state.inventory;
    return (
      <>
        <div className='container' style={{ paddingBottom: '70px' }}>
          <ToastContainer
            limit={1}
            autoClose={2000}
            hideProgressBar
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
          <Switch>
            <Route
              path="/home"
              render={() => (
                <LoadPlateCalc
                  unit={unit}
                  barbell={barbell[unit]}
                  calculatedPlates={this.state.calculatedPlates}
                  onSubmit={this.handleLoadSubmit}
                />
              )}
            />
            <Route
              path="/inventory"
              render={() => (
                <Inventory
                  data={this.state.inventory}
                  onPlateGroupClick={this.handlePlateGroupClick}
                  onUnitClick={this.handleUnitClick}
                />
              )}
            />
            <Route
              path="/warmup"
              render={() => (
                <WarmUpSetCalc
                  data={this.state.warmUp}
                  unit={this.state.inventory.unit}
                  onSubmit={this.handleWorkingWeightSubmit}
                  onLoad={this.handleLoad}
                />
              )}
            ></Route>
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

  handleUnitClick = () => {
    let inventory = { ...this.state.inventory };
    if (inventory.unit === 'lbs') inventory.unit = 'kg';
    else inventory.unit = 'lbs';

    this.setState({
      inventory,
      calculatedPlates: [],
      warmUp: {
        workingWeight: -1,
        sets: []
      }
    });
  };

  handlePlateGroupClick = value => {
    const { unit } = this.state.inventory;
    const cpy = { ...this.state.inventory.availablePlates };
    const i = cpy[unit].findIndex(element => element.value === value);
    cpy[unit][i].quantity = (cpy[unit][i].quantity + 2) % (MAX_PLATES + 2);
    this.setState({ availablePlates: cpy });
  };

  handleLoadSubmit = e => {
    e.preventDefault();
    e.currentTarget.firstElementChild.firstElementChild.blur();
    this.handleLoad(e.currentTarget.loadInput.value);
  };

  handleLoad = load => {
    const { unit, availablePlates } = this.state.inventory;
    const barbell = this.state.inventory.barbell[unit];
    const halfQuantity = modQuantity(availablePlates[unit], 0.5);
    const plateObjs = expandFromQuantity(halfQuantity);
    const { valid, errMsg } = this.validateLoad(load, barbell, plateObjs);

    if (!valid) {
      this.setState({ calculatedPlates: [] });
      toast.error(errMsg);
    } else {
      const {
        success,
        warn: { msg, severity },
        calcdPlateObjs
      } = this.calculatePlates(unit, load, barbell, plateObjs);

      if (severity === 'low') toast.success(msg);
      else if (severity === 'med') toast.warn(msg);
      else if (severity === 'high') toast.error(msg);

      if (success) this.setState({ calculatedPlates: calcdPlateObjs });
    }
  };

  validateLoad = (load, barbell, plateObjs) => {
    if (load < barbell)
      return {
        errMsg: "That's not even the bar!",
        valid: false
      };

    const totalWeightAvail =
      barbell + 2 * plateObjs.reduce((prv, cur) => prv + cur.value, 0);

    if (load > totalWeightAvail)
      return {
        errMsg: "Your inventory doesn't work with that weight",
        valid: false
      };

    return { valid: true };
  };

  /**
   * Returns an array containing the plates (weights) that must loaded on one
   * side of a barbell in order to meet a target load.
   * @param {Number} targetLoad Weight to load onto barbell
   * @param {Number} barbell Weight of the barbell
   * @param {Array} plateObjs array of weight value and color pairs.
   */
  calculatePlates = (unit, targetLoad, barbell, plateObjs) => {
    let workingLoad = targetLoad - barbell;
    if (workingLoad === 0)
      return {
        success: true,
        warn: { msg: 'Just the bar', severity: 'low' },
        calcdPlateObjs: []
      };

    /* Showing how to load one side of the barbell. Presumably, both sides are
       identical. */
    workingLoad /= 2;
    let calcdPlateObjs = [];

    for (let plate of plateObjs) {
      if (workingLoad >= plate.value) {
        calcdPlateObjs.push(plate);
        if (calcdPlateObjs.length > MAX_PLATES)
          return {
            success: false,
            warn: { msg: 'Not enough room on the bar!', severity: 'high' }
          };
        workingLoad -= plate.value;
      }
    }

    if (workingLoad !== 0) {
      return {
        success: true,
        warn: {
          msg: `${workingLoad * 2} ${unit} has been rounded off.`,
          severity: 'med'
        },
        calcdPlateObjs
      };
    }
    return {
      success: true,
      warn: { msg: `${targetLoad} ${unit} loaded!`, severity: 'low' },
      calcdPlateObjs
    };
  };

  handleWorkingWeightSubmit = e => {
    e.preventDefault();
    e.currentTarget.firstElementChild.firstElementChild.blur();
    const { value: workingWeight } = e.currentTarget.loadInput;

    if (workingWeight) {
      const sets = [];
      for (let percent of [0.6, 0.7, 0.8, 0.9])
        sets.push([percent, roundToNearestFive(workingWeight * percent)]);

      this.setState({ warmUp: { workingWeight, sets } });
    } else {
      this.setState({ warmUp: { workingWeight: -1, sets: [] } });
    }
  };
}

export default App;
