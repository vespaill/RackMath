import React from 'react';
import shortid from 'shortid';
import { toKilos, toPounds } from '../utils/plates'
import '../css/loadValue.css';

const LoadValue = props => {
   const { prevCalcdLoad, calcdLoad, unit } = props;
   return (
      <div className="load-value center-vertically">
         {prevCalcdLoad > -1 && (
            <div key={shortid.generate()} className="load-value__prev badge badge-success animate-leave">
               <div className="secondary-units">
                  {(unit == 'kg') && <span key={shortid.generate()}>{`${toPounds(prevCalcdLoad)} lb`}</span>}
                  {(unit == 'lbs') && <span key={shortid.generate()}>{`${toKilos(prevCalcdLoad)} kg`}</span>}
               </div>
               {`${prevCalcdLoad} ${unit}`}
            </div>)}
         {calcdLoad > -1 && (<>
            <div key={shortid.generate()} className="load-value__cur badge badge-success animate-enter">
               <div className="secondary-units">
                  {(unit == 'kg') && <span key={shortid.generate()}>{`${toPounds(calcdLoad)} lb`}</span>}
                  {(unit == 'lbs') && <span key={shortid.generate()}>{`${toKilos(calcdLoad)} kg`}</span>}
               </div>
               {`${calcdLoad} ${unit}`}
            </div>
         </>)}
      </div>
   );
};

export default LoadValue;
