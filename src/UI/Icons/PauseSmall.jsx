function PauseSmall(props) {
  return (
    <button onClick={props.stateHandler} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5.83301 16.6663V3.33301M14.1663 16.6663V3.33301"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default PauseSmall;
