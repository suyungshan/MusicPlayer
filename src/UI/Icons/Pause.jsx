function Pause(props) {
  return (
    <button onClick={props.stateHandler} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
      >
        <path
          d="M16.0003 30.9571C23.9851 30.9571 30.4581 24.4841 30.4581 16.4993C30.4581 8.51448 23.9851 2.0415 16.0003 2.0415C8.01546 2.0415 1.54248 8.51448 1.54248 16.4993C1.54248 24.4841 8.01546 30.9571 16.0003 30.9571Z"
          fill="#E8308C"
        />
        <path
          d="M11.5664 22.6688V10.1387M20.2411 22.6688V10.1387"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default Pause;
