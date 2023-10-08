import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface FinanceCardProps {
  children: ReactNode;
}

const FinanceCard = ({ children }: FinanceCardProps) => {
  return (
    <div className={styles.Card}>
        <div className={styles.Green}> <h1 className={styles.Title}>Finance</h1> </div>
      {children}
    </div>
  );
};

export default FinanceCard;
