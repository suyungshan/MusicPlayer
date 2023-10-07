import { Fragment } from "react";

function Loop(props) {
  return (
    <Fragment>
      {props.loop === false && props.allLoop === false ? (
        <button onClick={props.loopHandler} className={props.className}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
          >
            <g opacity="0.6">
              <path
                d="M16 4.11133L19 7.11131L16 10.1113"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.49951 11.6103V10.1103C5.49951 9.31469 5.81558 8.55163 6.37819 7.98903C6.94079 7.42642 7.70385 7.11035 8.49949 7.11035H18.9994"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.49949 20.6113L5.49951 17.6113L8.49949 14.6113"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.9994 13.1113V14.6113C18.9994 15.407 18.6833 16.17 18.1207 16.7326C17.5581 17.2952 16.7951 17.6113 15.9994 17.6113H5.49951"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      ) : props.loop === true && props.allLoop === false ? (
        <button onClick={props.allLoopHandler}>Loop</button>
      ) : props.loop === false && props.allLoop === true ? (
        <button onClick={props.noneHandler}>AllLoop</button>
      ) : (
        <button>Broken</button>
      )}
    </Fragment>
  );
}

export default Loop;
