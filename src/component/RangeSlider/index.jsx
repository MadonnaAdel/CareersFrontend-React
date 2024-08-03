import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export const Horizontal = ({ values, onChange }) => {
  const [range, setRange] = useState([values.mn, values.mx]);

  const handleChange = (range) => {
    setRange(range);
    onChange({ mn: range[0], mx: range[1] });
  };

  return (
    <div className='slider'>
      <Slider
        range
        min={0}
        max={10000}
        value={range}
        onChange={handleChange}
      />
      <div className='value'>
        <pre> <span>{range[0]}                 </span>
          <span>{range[1]}             </span></pre>
      </div>
    </div>
  );
};

export default Horizontal;
