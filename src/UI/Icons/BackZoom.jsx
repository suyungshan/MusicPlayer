import classes from "./BackZoom.module.css";

function BackZoom(props) {
  return (
    <button className={classes.zoom} onClick={props.zoom}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default BackZoom;
