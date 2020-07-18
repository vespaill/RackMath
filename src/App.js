import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavBarBottom from './components/navBarBottom';
import Inventory from './components/inventory';
import NotFound from './components/common/notFound';
import PlateCalculator from './components/plateCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    }
  };

  handlePlateGroupClick = value => {
    console.log('handlePlateGroupClick', this);
    const { unit } = this.state.inventory;
    const original = { ...this.state.inventory.availablePlates };
    const index = original[unit].findIndex(element => element.value === value);
    original[unit][index].quantity = (original[unit][index].quantity + 2) % 10;

    this.setState({ availablePlates: original });
  }

  render() {
    console.log('App: render(): ', this.handlePlateGroupClick);
    return (
      <>
        <Container>
          <Switch>
            <Route path="/rackmath" component={PlateCalculator} />
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
