import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from 'react-bootstrap';
import NavBarBottom from './components/navBarBottom';
import Inventory from './components/inventory';
import NotFound from './components/common/notFound';
import PlateCalculator from './components/plateCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';

const toKg = lbs => Math.round(lbs / 2.20462);

class App extends Component {
  state = {
    inventory: {
      unit: 'lbs',
      barbell: {
        lbs: 45,
        kg: toKg(45)
      },
      availablePlates: {
        lbs: [
          { value: 100, quantity: 0 },
          { value: 65, quantity: 0 },
          { value: 55, quantity: 0 },
          { value: 50, quantity: 0 },
          { value: 45, quantity: 8 },
          { value: 35, quantity: 0 },
          { value: 25, quantity: 8 },
          { value: 20, quantity: 0 },
          { value: 15, quantity: 0 },
          { value: 12.5, quantity: 0 },
          { value: 10, quantity: 8 },
          { value: 7.5, quantity: 0 },
          { value: 5, quantity: 8 },
          { value: 2.5, quantity: 8 },
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
          { value: 20, quantity: 0 },
          { value: 15, quantity: 0 },
          { value: 12.5, quantity: 0 },
          { value: 10, quantity: 0 },
          { value: 7.5, quantity: 0 },
          { value: 5, quantity: 0 },
          { value: 3, quantity: 0 },
          { value: 2.5, quantity: 0 },
          { value: 2, quantity: 0 },
          { value: 1.5, quantity: 0 },
          { value: 1.25, quantity: 0 },
          { value: 1, quantity: 0 },
          { value: 0.75, quantity: 0 },
          { value: 0.5, quantity: 0 },
          { value: 0.25, quantity: 0 }
        ]
      }
    },
    calculatedPlates: []
  };

  handlePlateGroupClick = value => {
    const { unit } = this.state.inventory;
    const original = { ...this.state.inventory.availablePlates };
    const index = original[unit].findIndex(element => element.value === value);
    original[unit][index].quantity = (original[unit][index].quantity + 2) % 10;

    this.setState({ availablePlates: original });
  };

  handleLoadSubmit = e => {
    e.preventDefault();
    const { value: load } = e.currentTarget.load;
    console.log(load);
    const { unit, availablePlates } = this.state.inventory;
    let { barbell } = this.state.inventory;
    barbell = barbell[unit];
    const plates = availablePlates[unit].filter(val => val.quantity > 0);

    const platesArray = this.arrayifyInventoryPlates(plates);
    const { msg, valid } = this.validateLoad(load, barbell, platesArray);

    if (!valid) toast.error(msg);
    else {
      this.setState({
        calculatedPlates: this.calculatePlates(load, barbell, platesArray)
      });
    }
  };

  arrayifyInventoryPlates = plateFrequencies => {
    const array = [];
    for (let plate of plateFrequencies) {
      for (let j = plate.quantity / 2; j > 0; --j) {
        array.push(plate.value);
      }
    }
    return array;
  };

  validateLoad = (load, barbell, platesOnOneEnd) => {
    const totalLoadAvail =
      barbell + platesOnOneEnd.reduce((acc, cur) => acc + cur) * 2;

    console.log('validateLoad', platesOnOneEnd);
    console.log('validateLoad', totalLoadAvail);

    if (load < barbell)
      return { msg: "That's not even the bar!", valid: false };
    if (load > totalLoadAvail)
      return {
        msg: "Your inventory doesn't work with that weight",
        valid: false
      };
    return { msg: 'Good', valid: true };
  };

  /**
   * Returns an array containing the plates (weights) that must loaded on one
   * side of a barbell in order to meet a target load.
   * @param {Number} targetLoad Weight to load onto barbell
   * @param {Number} barbell Weight of the barbell
   * @param {Array} platesArray array of available plate weights.
   */
  calculatePlates = (targetLoad, barbell, platesArray) => {
    let workingLoad = targetLoad - barbell;
    if (workingLoad === 0) return []; // Target load equals barbell weight.
    /* Only working with loading one side of the barbell. Presumably, each side
       will be loaded identically. */
    workingLoad /= 2;
    let calcPlates = [];
    for (let i = 0; i < platesArray.length; ++i) {
      if (workingLoad >= platesArray[i]) {
        calcPlates.push(platesArray[i]);
        workingLoad -= platesArray[i];
      }
    }
    return calcPlates;
  };

  render() {
    return (
      <>
        <Container style={{ paddingBottom: '70px' }}>
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
              path="/rackmath"
              render={() => (
                <PlateCalculator
                  unit={this.state.inventory.unit}
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
                  onClick={this.handlePlateGroupClick}
                />
              )}
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/rackmath" />
            <Redirect to="/not-found" />
          </Switch>
        </Container>
        <NavBarBottom />
      </>
    );
  }
}

export default App;
