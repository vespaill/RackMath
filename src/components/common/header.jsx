import React from 'react';
import { Row } from 'react-bootstrap';

const Header = props => {
  const { children, my, mx } = props;
  const textJustify = React.Children.count(children) > 1 ? 'between' : 'center';
  const myC = 'my-' + (my ? my : '1');
  const mxC = 'mx-' + (mx ? mx : '3');

  return (
    <Row className={`${myC} ${mxC} d-flex justify-content-${textJustify}`}>
      {React.Children.map(children, child => (
        <React.Fragment>{child}</React.Fragment>
      ))}
    </Row>
  );
};

export default Header;
