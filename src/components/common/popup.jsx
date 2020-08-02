import React from 'react';
import '../../css/popup.css';
import Header from './header';

const Popup = props => {
  const { show, onClose, children, header } = props;
  return (
    <div className={'popup' + (show ? '' : ' hide')}>
      <div className="popup__content">
        <Header mx={3} my={2}>
          <h1>{header}</h1>
          <button className="close-btn btn btn-danger" onClick={() => onClose()}>
            <div>&times;</div>
          </button>
        </Header>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
