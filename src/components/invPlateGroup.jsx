import React from 'react';

const InvPlateGroup = ({ value, quantity, bgColor, onClick }) => {
  return (
    <div className="plate-group text-center">
      <a
        href="#0"
        onClick={() => onClick(value)}
        className={'plate-group__plate' + (quantity ? ' bg-' + bgColor : '')}
      >
        <span className="center-vertically">{value}</span>
      </a>
      <div
        className="plate-group__quantity"
        style={{ opacity: quantity ? '100%' : '0' }}
      >
        <span className="center-vertically">{quantity}</span>
      </div>
    </div>
  );
};

export default InvPlateGroup;
