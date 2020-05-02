import React, { useEffect, useState, useRef } from 'react';

import styles from './styles.css';
import { useText } from '../../popup/store/utils';

const TIME_LIMIT = 4000;
const R = 32;
const FULL_DASH_ARRAY = 2 * Math.PI * R;
const path = `
M 50, 50
m -${R}, 0
a ${R},${R} 0 1,0 ${R * 2},0
a ${R},${R} 0 1,0 -${R * 2},0
`;

type Props = {
  isMouseOver: boolean;
  onTimeout: () => void;
};

const Timer: React.FC<Props> = ({ isMouseOver, onTimeout }) => {
  const dashArray = useDasharray({ isMouseOver, onTimeout });

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

function useDasharray({ isMouseOver, onTimeout }: Props) {
  const timePassed = useRef(0);
  const [dashArray, setDashArray] = useState(`${FULL_DASH_ARRAY}`);
  const [text] = useText();

  useEffect(() => {
    if (isMouseOver) {
      return;
    }

    const id = setInterval(() => {
      if (timePassed.current >= TIME_LIMIT) {
        clearInterval(id);
        onTimeout();

        return;
      }

      timePassed.current += 1000;

      setDashArray(calcCurrentDasharrayValue(timePassed.current));
    }, 1000);

    return () => {
      timePassed.current = 0;
      setDashArray(`${FULL_DASH_ARRAY}`);
      clearInterval(id);
    };
  }, [text, isMouseOver, onTimeout]);

  return dashArray;
}

function calcCurrentDasharrayValue(timePassed: number) {
  const rawTimeFraction = (TIME_LIMIT - timePassed) / TIME_LIMIT;
  const timeFraction =
    rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  const dashArray = (timeFraction * FULL_DASH_ARRAY).toFixed(0);

  return `${dashArray} ${FULL_DASH_ARRAY}`;
}
