import { useSelector } from "react-redux";

function Random(props) {
  const random = useSelector((state) => state.playControls.random);

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
          d="M13.916 15.3886L16.4995 12.8051L13.916 10.2217"
          stroke={random ? "#E8308C" : "#A49BB4"}
          stroke-width="1.60344"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M13.916 1.61035L16.4995 4.19381L13.916 6.77726"
          stroke={random ? "#E8308C" : "#A49BB4"}
          stroke-width="1.60344"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M16.5 4.19336H13.0554C12.0861 4.19336 11.1916 4.51366 10.4719 5.0542M0.999268 12.8049H4.44387C5.41319 12.8049 6.3077 12.4846 7.02733 11.944"
          stroke={random ? "#E8308C" : "#A49BB4"}
          stroke-width="1.60344"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M0.999268 4.19336H4.44387C6.82188 4.19336 8.74963 6.12111 8.74963 8.49912C8.74963 10.8771 10.6774 12.8049 13.0554 12.8049H16.5"
          stroke={random ? "#E8308C" : "#A49BB4"}
          stroke-width="1.60344"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}

export default Random;
