import React, { useEffect, useState, useRef } from 'react';

import styles from './styles.css';

const TIME_LIMIT = 4000;
const R = 40;
const FULL_DASH_ARRAY = 2 * Math.PI * R;
const path = `
M 50, 50
m -${R}, 0
a ${R},${R} 0 1,0 ${R * 2},0
a ${R},${R} 0 1,0 -${R * 2},0
`;

type Props = {
  isMouseOver: boolean;
};

const Timer: React.FC<Props> = ({ isMouseOver }) => {
  const timePassed = useRef(0);
  const [dashArray, setDashArray] = useState(`${FULL_DASH_ARRAY}`);

  useEffect(() => {
    if (isMouseOver) {
      return;
    }

    const id = setInterval(() => {
      timePassed.current += 1000;

      const rawTimeFraction = (TIME_LIMIT - timePassed.current) / TIME_LIMIT;
      const timeFraction =
        rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
      const dashArray = (timeFraction * FULL_DASH_ARRAY).toFixed(0);

      setDashArray(`${dashArray} ${FULL_DASH_ARRAY}`);

      if (timePassed.current >= TIME_LIMIT) {
        clearInterval(id);
      }
    }, 1000);

    return () => {
      timePassed.current = 0;
      setDashArray(`${FULL_DASH_ARRAY}`);
      clearInterval(id);
    };
  }, [isMouseOver]);

  return (
    <svg
      className={styles.timer}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className={styles.group}>
        <path
          strokeDasharray={dashArray}
          className={styles.remaining}
          d={path}
        ></path>
      </g>
    </svg>
  );
};

export default Timer;
