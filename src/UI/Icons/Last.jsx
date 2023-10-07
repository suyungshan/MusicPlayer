function Last(props) {
  return (
    <button onClick={props.onLastVideo} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
      >
        <path
          d="M18 19.5L9 12.5L18 5.5L18 19.5Z"
          fill="#9E9E9E"
          stroke="#9E9E9E"
          strokeWidth="1.70667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 18.5L6 6.5"
          stroke="#9E9E9E"
          strokeWidth="1.70667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default Last;
