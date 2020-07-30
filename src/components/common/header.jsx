import React from 'react';
import { Row } from 'react-bootstrap';

const Header = ({ children }) => {
  const textJustify = React.Children.count(children) > 1 ? 'between' : 'center';

  return (
    <Row className={`my-1 mx-3 d-flex justify-content-${textJustify}`}>
      {React.Children.map(children, child => (
        <React.Fragment>{child}</React.Fragment>
      ))}
    </Row>
  );
};

export default Header;
