import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

const ROUTER_CONFIG = [
  {
    path: '/predict',
    label: 'Predict',
  },
  {
    path: '/history',
    label: 'History',
  },
];

export const Header = () => {
  const location = useLocation();
  const currPath = location.pathname;

  return (
    <div className={styles.header}>
      <div className={styles.logo}>Prediction App</div>
      <nav>
        <div className={styles.nav}>
          {ROUTER_CONFIG.map(route => {
            const isActive = route.path === currPath;
            return (
              <div>
                <Link
                  className={isActive ? styles.navItemActive : styles.navItem}
                  to={`${route.path}`}
                >
                  {route.label}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
