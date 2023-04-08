import React from 'react';

const InvPlateGroup = props => {
   const { value, quantity, backgroundColor, color, onClick } = props;
   return (
      <div className="plate-group text-center">
         <button onClick={() => onClick(value)}
                 className={'plate-group__plate'}
                 style={{ backgroundColor, color }}
         >
            <span className="center-vertically">{value}</span>
         </button>
         {quantity > 0 && (
            <div className="plate-group__quantity">
               <span className="center-vertically unselectable">{quantity}</span>
            </div>
         )}
      </div>
   );
};

export default InvPlateGroup;
