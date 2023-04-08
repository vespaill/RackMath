export const getHexColor = (unit, weight) => {
   const unit_weight_hexcolor_map = {
      'kg': {
         '50': '#030303',
         '25': '#D0535A',
         '20': '#497BAE',
         '15': '#E4B911',
         '10': '#00A71D',
         '5': '#E6E8E8',
         '2.5': '#050303',
         '1.25': '#C5C7C9',
         '1': '#C5C7C9',
         '0.75': '#C5C7C9',
         '0.5': '#C5C7C9',
         '0.25': '#C5C7C9'
      },
      'lbs': {
         '100': '#030303',
         '55': '#D0535A',
         '45': '#497BAE',
         '35': '#E4B911',
         '25': '#00A71D',
         '10': '#E6E8E8',
         '5': '#050303',
         '2.5': '#C5C7C9',
         '1.25': '#C5C7C9',
         '1': '#C5C7C9',
         '0.75': '#C5C7C9',
         '0.5': '#C5C7C9',
         '0.25': '#C5C7C9'
      }
   };
   const bgColors_w_black_letters = [
      '#E6E8E8',
      '#E4B911',
      '#C5C7C9'
   ];

   for (const lkp_weight in unit_weight_hexcolor_map[unit]) {
      if (weight === Number(lkp_weight)) {
         // console.log({weight, lkp_weight: Number(lkp_weight)});
         //console.log(unit_weight_hexcolor_map[unit][lkp_weight]);
         const backgroundColor = unit_weight_hexcolor_map[unit][lkp_weight];
         const color = bgColors_w_black_letters.includes(backgroundColor)? 'black' : 'white';
         return [backgroundColor, color];
      }
   }
   if (weight % 6 === 0) return ['black', 'white'];
   if (weight % 5 === 0) return ['yellow', 'black'];
   if (weight % 4 === 0) return ['red', 'white'];
   if (weight % 3 === 0) return ['purple', 'white'];
   if (weight % 2 === 0) return ['green', 'white'];
   return ['red', 'black'];
};
