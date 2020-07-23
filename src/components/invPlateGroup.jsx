import React from 'react';

const InvPlateGroup = props => {
  const { value, quantity, bgColor, onClick } = props;
  // const { onPress, onRelease } = props;
  return (
    <div className="plate-group text-center">
      <button
        onClick={() => onClick(value)}
        // onMouseDown={() => onPress(value)}
        // onMouseUp={() => onRelease(value)}
        className={'plate-group__plate' + (quantity ? ' bg-' + bgColor : '')}
      >
        <span className="center-vertically">{value}</span>
      </button>
      <div
        className="plate-group__quantity"
        style={{ opacity: quantity ? '100%' : '0' }}
      >
        <span className="center-vertically unselectable">{quantity}</span>
      </div>
    </div>
  );
};

export default InvPlateGroup;
