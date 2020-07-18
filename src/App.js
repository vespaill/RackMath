import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import NavBarBottom from './components/navBarBottom';
import './css/App.css';
import Inventory from './components/inventory';
import NotFound from './components/common/notFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <>
      <Container>
        <Switch>
          {/* <Route path="/rackmath" component={RackMath} /> */}
          <Route path="/inventory" component={Inventory} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/inventory" />
          <Redirect to="/not-found" />
        </Switch>
      </Container>
      {/* <NavBarBottom /> */}
    </>
  );
}

export default App;
