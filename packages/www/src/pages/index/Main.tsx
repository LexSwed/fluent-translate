import React from 'react';

import styles from './styles.module.css';

import Intro from './Intro';
import Features from './Features';

const Main: React.FC = () => {
  return (
    <main className={styles.main}>
      <Intro />
      <Features />
    </main>
  );
};

export default Main;
