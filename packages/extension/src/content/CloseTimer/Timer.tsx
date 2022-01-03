import React, { useEffect, useState, useRef } from 'react';

import { styled } from '@fxtrot/ui';

// 7 sec (or more?)
const TIME_LIMIT = 1000 * 7;
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

export const Svg = styled('svg', {
  transition: '0.12s',
  size: '$5',
  pointerEvents: 'none',
  transformOrigin: 'center',
  transform: 'scaleX(-1)',
});

const Group = styled('g', {
  fill: 'none',
  stroke: 'none',
});

const Path = styled('path', {
  strokeWidth: '8px',
  strokeLinecap: 'round',
  transform: 'rotate(90deg)',
  transformOrigin: 'center',
  transition: '1s linear all',
  stroke: '$primaryStill',
});

const Timer: React.FC<Props> = ({ isMouseOver, onTimeout, ...props }) => {
  const dashArray = useDasharray({ isMouseOver, onTimeout });

  return (
    <Svg
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Group>
        <Path strokeDasharray={dashArray} id="timer-remaining" d={path}></Path>
      </Group>
    </Svg>
  );
};

export default Timer;

function useDasharray({ isMouseOver, onTimeout }: Props) {
  const timePassed = useRef(0);
  const [dashArray, setDashArray] = useState(`${FULL_DASH_ARRAY}`);

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
  }, [isMouseOver, onTimeout]);

  return dashArray;
}

function calcCurrentDasharrayValue(timePassed: number) {
  const rawTimeFraction = (TIME_LIMIT - timePassed) / TIME_LIMIT;
  const timeFraction =
    rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  const dashArray = (timeFraction * FULL_DASH_ARRAY).toFixed(0);

  return `${dashArray} ${FULL_DASH_ARRAY}`;
}
