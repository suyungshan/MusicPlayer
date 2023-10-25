function PlaySmall(props) {
  return (
    <button
      onClick={() => {
        props.stateHandler();
        {
          props.activeHandler ? props.activeHandler(props.song) : null;
        }
      }}
      className={props.className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4.1665 4.15809C4.1665 3.34879 4.1665 2.94414 4.33525 2.72108C4.48225 2.52675 4.70694 2.4065 4.95017 2.39198C5.22937 2.37531 5.56606 2.59977 6.23944 3.04869L15.0024 8.89067C15.5588 9.2616 15.837 9.44707 15.934 9.68084C16.0187 9.88522 16.0187 10.1149 15.934 10.3193C15.837 10.5531 15.5588 10.7385 15.0024 11.1095L6.23944 16.9514C5.56606 17.4004 5.22937 17.6248 4.95017 17.6082C4.70694 17.5936 4.48225 17.4734 4.33525 17.2791C4.1665 17.056 4.1665 16.6513 4.1665 15.842V4.15809Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

export default PlaySmall;
