function Next(props) {
  return (
    <button onClick={props.onNextVideo} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M6 5.5L15 12.5L6 19.5V5.5Z"
          fill="#9E9E9E"
          stroke="#9E9E9E"
          strokeWidth="1.70667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 6.5V18.5"
          stroke="#9E9E9E"
          strokeWidth="1.70667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default Next;
