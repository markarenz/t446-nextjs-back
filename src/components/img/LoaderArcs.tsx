import React from 'react';
import styles from '../../styles/LoaderArcs.module.scss';

type Props = {
  show: boolean;
};

const LoaderArcs: React.FC<Props> = ({ show }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    viewBox="0 0 100 100"
  >
    <g
      fill="red"
      fillOpacity="0"
      fillRule="evenodd"
      strokeDasharray="none"
      strokeLinecap="round"
      strokeWidth="6"
    >
      <path
        className={`${styles.arcOuter} ${show ? styles.animating : ''}`}
        stroke="red"
        d="M97 50a47 47 0 01-27.755 42.88 47 47 0 01-50.485-7.765A47 47 0 015.172 35.876"
      ></path>
      <path
        stroke="purple"
        className={`${styles.arcInner} ${show ? styles.animating : ''}`}
        d="M41.444 85.997A37 37 0 0113.89 58.065a37 37 0 0113.051-37 37 37 0 0138.98-4.464"
      ></path>
    </g>
  </svg>
);

export default LoaderArcs;
