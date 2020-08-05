import React from 'react';
import Header from './header';
import { Button } from 'react-bootstrap';
import '../../css/popup.css';

const Popup = props => {
  const { show, onClose, children, header } = props;
  return (
    <div className={'popup' + (show ? '' : ' hide')}>
      <div className="popup__content">
        <Header mx={3} my={2}>
          <h1>{header}</h1>
          <Button className="close-btn" variant="danger" onClick={() => onClose()}>
            <div>&times;</div>
          </Button>
        </Header>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
