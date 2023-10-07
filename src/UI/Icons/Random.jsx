function Random(props) {
  return (
    <button onClick={props.randomHandler} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
      >
        <path
          d="M14.4161 15.3886L16.9995 12.8051L14.4161 10.2217"
          stroke="#9E9E9E"
          strokeWidth="1.60344"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.4161 1.61035L16.9995 4.19381L14.4161 6.77726"
          stroke="#9E9E9E"
          strokeWidth="1.60344"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 4.19336H13.5554C12.5861 4.19336 11.6916 4.51366 10.9719 5.0542M1.49927 12.8049H4.94387C5.91319 12.8049 6.8077 12.4846 7.52733 11.944"
          stroke="#9E9E9E"
          strokeWidth="1.60344"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1.49927 4.19336H4.94387C7.32188 4.19336 9.24963 6.12111 9.24963 8.49912C9.24963 10.8771 11.1774 12.8049 13.5554 12.8049H17"
          stroke="#9E9E9E"
          strokeWidth="1.60344"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default Random;
