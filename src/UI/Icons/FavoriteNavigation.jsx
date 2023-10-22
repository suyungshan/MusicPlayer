import { useSelector } from "react-redux/es/hooks/useSelector";

function FavoriteNavigation(props) {
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);

  return (
    <div onClick={props.click}>
      {smallScreen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9932 5.63581C9.9938 3.2984 6.65975 2.66964 4.15469 4.81001C1.64964 6.95038 1.29697 10.529 3.2642 13.0604C4.89982 15.1651 9.84977 19.6041 11.4721 21.0408C11.6536 21.2016 11.7444 21.2819 11.8502 21.3135C11.9426 21.3411 12.0437 21.3411 12.1361 21.3135C12.2419 21.2819 12.3327 21.2016 12.5142 21.0408C14.1365 19.6041 19.0865 15.1651 20.7221 13.0604C22.6893 10.529 22.3797 6.92787 19.8316 4.81001C17.2835 2.69216 13.9925 3.2984 11.9932 5.63581Z"
            fill={props.using ? "white" : "#8C7CA9"}
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.9909 6.84775C13.3251 3.7312 8.87967 2.89286 5.5396 5.74668C2.19953 8.60051 1.7293 13.372 4.35227 16.7472C6.53309 19.5535 13.133 25.4721 15.2961 27.3878C15.5381 27.6021 15.6591 27.7093 15.8003 27.7514C15.9235 27.7881 16.0583 27.7881 16.1815 27.7514C16.3226 27.7093 16.4436 27.6021 16.6856 27.3878C18.8487 25.4721 25.4487 19.5535 27.6295 16.7472C30.2525 13.372 29.8396 8.57049 26.4421 5.74668C23.0447 2.92288 18.6567 3.7312 15.9909 6.84775Z"
            fill={props.using ? "white" : "#8C7CA9"}
          />
        </svg>
      )}
    </div>
  );
}

export default FavoriteNavigation;
