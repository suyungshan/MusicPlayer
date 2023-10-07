import { useSelector, useDispatch } from "react-redux";
import { interfaceActions } from "../../store/interface";
import classes from "./ControlerZoom.module.css";

function ControlerZoom() {
  const dispatch = useDispatch();
  const controlerInfor = useSelector((state) => state.musicData.controlerInfor);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const favData = controlerInfor[videoIndex === 0 ? videoIndex : videoIndex];

  const zoomHandler = () => {
    dispatch(interfaceActions.closeControl());
  };

  return (
    <div className={classes.controlZoom}>
      <button className={classes.zoom} onClick={zoomHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default ControlerZoom;
