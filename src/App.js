import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import localStorage from 'local-storage';
import NavBar from './components/navBar';
import Inventory from './components/inventory';
import NotFound from './components/common/notFound';
import Loader from './components/loader';
import SetsCalculator from './components/setsCalculator';
import About from './components/about';
import { roundToNearestStep, calcRampUpReps } from './utils/rampUps';
import { getHexColor } from './utils/getHexColor';
import { DEFAULT_INV_PLATES, INV_MAX_PLATES, modQuantity, withinRange, calculatePlates } from './utils/plates';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './css/App.css';
import './css/utils.css';
import './css/toastify.css';

class App extends Component {
   state = {
      barbell: { lbs: 45, kg: 20 },
      calcdPlates: [],
      calcdLoad: -1,
      prevCalcdLoad: -1,

      workWeight: -1,
      workNumReps: -1,
      warmUpSets: [/* {percentage, weight, numReps}, ... */],
      prevWarmUpSets: []
   };

   constructor(props) {
      super(props);

      let defaultAvailPlates = {
         lbs: [
            { value: 45, quantity: DEFAULT_INV_PLATES },
            { value: 35, quantity: 0 },
            { value: 25, quantity: DEFAULT_INV_PLATES },
            { value: 15, quantity: 0 },
            { value: 10, quantity: DEFAULT_INV_PLATES },
            { value: 5, quantity: DEFAULT_INV_PLATES },
            { value: 2.5, quantity: DEFAULT_INV_PLATES },
            { value: 1.25, quantity: 0 },
            { value: 1, quantity: 2 },
            { value: 0.5, quantity: 2 },
            { value: 0.25, quantity: 2 }
         ],
         kg: [
            { value: 50, quantity: 0 },
            { value: 25, quantity: DEFAULT_INV_PLATES },
            { value: 20, quantity: DEFAULT_INV_PLATES },
            { value: 15, quantity: 0 },
            { value: 10, quantity: DEFAULT_INV_PLATES },
            { value: 5, quantity: DEFAULT_INV_PLATES },
            { value: 2.5, quantity: DEFAULT_INV_PLATES },
            { value: 1.25, quantity: 2 },
            { value: 1, quantity: 0 },
            { value: 0.75, quantity: 0 },
            { value: 0.5, quantity: 2 },
            { value: 0.25, quantity: 2 }
         ]
      };
      // Give plates color.
      ['lbs', 'kg'].forEach(unit => {
         defaultAvailPlates[unit] = defaultAvailPlates[unit].map(plate => {
            const [ backgroundColor, color ] = getHexColor(unit, plate.value);
            return { ...plate, backgroundColor, color };
         });
      });
      const defaultPercentages = [
         { value: 0.1, on: false },
         { value: 0.2, on: false },
         { value: 0.3, on: false },
         { value: 0.4, on: false },
         { value: 0.5, on: true },
         { value: 0.6, on: true },
         { value: 0.7, on: true },
         { value: 0.8, on: true },
         { value: 0.9, on: true },
         { value: 1.1, on: true },
         { value: 1.2, on: false },
         { value: 1.3, on: false },
         { value: 1.4, on: false },
         { value: 1.5, on: false }
      ];

      this.state.unit = localStorage.get('unit') || 'kg';
      this.state.percentages = /*localStorage.get('percentages') || */defaultPercentages;
      this.state.availPlates = /*localStorage.get('availPlates') || */defaultAvailPlates;
   }

   render() {
      const { unit, barbell, availPlates, calcdPlates, calcdLoad, prevCalcdLoad, workWeight, workNumReps, warmUpSets, percentages } = this.state;
      const loaderProps = { unit, barbellWeight: barbell[unit], calcdPlates, calcdLoad, prevCalcdLoad, onSubmit: this.handleLoadSubmit, resetPrevLoad: this.resetPrevLoad };
      const invProps = { unit, barbell, availPlates, onPlateGroupClick: this.handlePlateGroupClick, onUnitClick: this.handleUnitClick, onClear: this.handlePlateGroupsClear };
      const setsCalcProps = { unit, workWeight, workNumReps, warmUpSets, onSubmit: this.handleWorkSetSubmit, onLoad: this.handleLoad, percentages, togglePercentage: this.handleTogglePercentage };
      const toastProps = { /* limit: 1, */ autoClose: 2000, hideProgressBar: true, pauseOnFocusLoss: false, draggable: false, pauseOnHover: false, newestOnTop: true };
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
      localStorage.set('unit', unit);
   };

   handlePlateGroupClick = value => {
      const { unit } = this.state;
      const availPlates = { ...this.state.availPlates };
      const i = availPlates[unit].findIndex(element => element.value === value);

      const quant = availPlates[unit][i].quantity;
      availPlates[unit][i].quantity = quant === 0 ? INV_MAX_PLATES : quant - 2;

      this.setState({ availPlates, calcdPlates: [], calcdLoad: -1, prevCalcdLoad: -1 });
      localStorage.set('availPlates', availPlates);
   };

   handleLoadSubmit = e => {
      e.preventDefault();
      e.currentTarget.firstElementChild.firstElementChild.blur(); // Blur in order to hide keyboard on mobile.
      this.handleLoad(e.currentTarget.loadInput.value);
      // e.currentTarget.loadInput.value = '';
   };

   handleLoad = load => {
      const { unit } = this.state;
      const barLoad = this.state.barbell[unit];
      let avlPltsOneSide = modQuantity([...this.state.availPlates[unit]], 0.5);
      const prevCalcdLoad = this.state.calcdLoad; // Set prevLoad to curLoad
      const maxLoad = barLoad + 2 * avlPltsOneSide.reduce((acc, cur) => acc + cur.value * cur.quantity, 0);

      if (!withinRange(load, barLoad, maxLoad)) {
         this.setState({ calcdPlates: [], calcdLoad: -1, prevCalcdLoad });
         if (load < barLoad) toast.error("That's not even the bar!");
         else if (load > maxLoad) toast.error('Exceeded maximum allowed by inventory!');
      } else {
         const { success, warn, calcdLoad, calcdPlates, roundOff } = calculatePlates(load, barLoad, avlPltsOneSide);

         if (warn === 'justbar') toast.success('Just the bar!');
         else if (warn === 'roundoff') toast.warn(`Inventory limitation—Load rounded ${roundOff.up ? 'up' : 'down'} by ${roundOff.amount} ${unit}.`);
         else if (warn === 'notEnoughRoom') toast.error('Too many plates to fit on barbell!');

         if (success) this.setState({ calcdPlates, calcdLoad, prevCalcdLoad });
         else this.setState({ calcdPlates: [], calcdLoad: -1, prevCalcdLoad });
      }
   };

   handleWorkSetSubmit = e => {
      e.preventDefault();
      // Blur all inputs.
      e.currentTarget.firstElementChild.querySelectorAll('input').forEach(elem => { elem.blur(); });
      const { loadInput, numRepsInput } = e.currentTarget;
      this.updateWarmUpSets(loadInput.value, numRepsInput.value);
   };

   updateWarmUpSets = (workWeight, workNumReps) => {
      if (workWeight && workNumReps) {
         const prevWarmUpSets = this.state.warmUpSets;
         const warmUpSets = [];
         const { percentages, unit, availPlates } = this.state;
         const lightestPlateAvail = availPlates[unit].filter(plate => plate.quantity > 0).map(plate => plate.value).reduce((prev, cur) => (prev < cur ? prev : cur));
         percentages.forEach(percentage => {
            const { value, on } = percentage;
            if (on) {
               const weight = roundToNearestStep(workWeight * value, lightestPlateAvail * 2);
               const numReps = calcRampUpReps(value, workNumReps);
               warmUpSets.push({ percentage: value, weight, numReps });
            }
         });
         this.setState({ workWeight, workNumReps, warmUpSets, prevWarmUpSets });
      } else this.setState({ workWeight: -1, workNumReps: -1, warmUpSets: [], prevWarmUpSets: [] });
   };

   handlePlateGroupsClear = () => {
      const { unit } = this.state;
      let availPlates = { ...this.state.availPlates };
      availPlates[unit] = availPlates[unit].map(({ value, backgroundColor, color }) => ({ value, backgroundColor, color, quantity: 0 }));
      this.setState({ availPlates });
      localStorage.set('availPlates', availPlates);
   };

   resetPrevLoad = () => {
      this.setState({ prevCalcdLoad: -1 });
   };

   handleTogglePercentage = index => {
      const percentages = [...this.state.percentages];
      percentages[index].on = !percentages[index].on;
      this.setState({ percentages });
      localStorage.set('percentages', percentages);

      // Update in order to trigger a re-render of the warm up sets.
      const { workWeight, workNumReps } = this.state;
      if (workWeight > 0 && workNumReps > 0) this.updateWarmUpSets(workWeight, workNumReps);
   };
}

export default App;
