import { useSelector } from "react-redux";
function Next(props) {
  const allLoop = useSelector((state) => state.playControls.allLoop);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const musicPlay = useSelector((state) => state.musicData.musicPlay);

  return (
    <button onClick={props.onNextVideo} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 5L15 12L6 19V5Z"
          fill={
            allLoop || videoIndex !== musicPlay.length - 1 ? "white" : "#A49BB4"
          }
          stroke={
            allLoop || videoIndex !== musicPlay.length - 1 ? "white" : "#A49BB4"
          }
          strokeWidth="1.70667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 6V18"
          stroke={
            allLoop || videoIndex !== musicPlay.length - 1 ? "white" : "#A49BB4"
          }
          strokeWidth="1.70667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default Next;
