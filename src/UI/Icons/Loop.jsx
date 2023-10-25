import { Fragment } from "react";
import { useSelector } from "react-redux";

function Loop(props) {
  const loop = useSelector((state) => state.playControls.loop);
  const allLoop = useSelector((state) => state.playControls.allLoop);
  return (
    <Fragment>
      {props.loop === false && props.allLoop === false ? (
        <button onClick={props.loopHandler} className={props.className}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 3.61157L19 6.61155L16 9.61153"
              stroke="#A49BB4"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M5.49951 11.1103V9.61033C5.49951 8.81469 5.81558 8.05163 6.37819 7.48903C6.94079 6.92642 7.70385 6.61035 8.49949 6.61035H18.9994"
              stroke="#A49BB4"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M8.49949 20.1115L5.49951 17.1116L8.49949 14.1116"
              stroke="#A49BB4"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M18.9994 12.6113V14.1113C18.9994 14.907 18.6833 15.67 18.1207 16.2326C17.5581 16.7952 16.7951 17.1113 15.9994 17.1113H5.49951"
              stroke="#A49BB4"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
          </svg>
        </button>
      ) : props.loop === true && props.allLoop === false ? (
        <button onClick={props.allLoopHandler} className={props.className}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 3.61157L19 6.61155L16 9.61153"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M5.49951 11.1103V9.61033C5.49951 8.81469 5.81558 8.05163 6.37819 7.48903C6.94079 6.92642 7.70385 6.61035 8.49949 6.61035H18.9994"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#E8308C"
              fontSize="0.5rem"
              fontFamily=" Quicksand"
            >
              1
            </text>
            <path
              d="M8.49949 20.1115L5.49951 17.1116L8.49949 14.1116"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M18.9994 12.6113V14.1113C18.9994 14.907 18.6833 15.67 18.1207 16.2326C17.5581 16.7952 16.7951 17.1113 15.9994 17.1113H5.49951"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
          </svg>
        </button>
      ) : props.loop === false && props.allLoop === true ? (
        <button onClick={props.noneHandler} className={props.className}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M16 3.61157L19 6.61155L16 9.61153"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M5.49951 11.1103V9.61033C5.49951 8.81469 5.81558 8.05163 6.37819 7.48903C6.94079 6.92642 7.70385 6.61035 8.49949 6.61035H18.9994"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M8.49949 20.1115L5.49951 17.1116L8.49949 14.1116"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
            <path
              d="M18.9994 12.6113V14.1113C18.9994 14.907 18.6833 15.67 18.1207 16.2326C17.5581 16.7952 16.7951 17.1113 15.9994 17.1113H5.49951"
              stroke="#E8308C"
              strokewidth="1.5"
              strokelinecap="round"
              strokelinejoin="round"
            />
          </svg>
        </button>
      ) : (
        <button>Broken</button>
      )}
    </Fragment>
  );
}

export default Loop;
