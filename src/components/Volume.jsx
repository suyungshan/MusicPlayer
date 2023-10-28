import VolumeIcon from "../UI/Icons/VolumeIcon";
import VolumeProgress from "../UI/Icons/VolumeProgress";
import { useSelector } from "react-redux";
import { playControlsActions } from "../store/playControls";
import classes from "./Volume.module.css";

function Volume() {
  const { mute, volume } = useSelector((state) => state.playControls);
  const control = useSelector((state) => state.interface.control);

  const muteHandler = () => {
    dispatch(playControlsActions.toggleMute());
  };

  const valumeHandler = (event) => {
    const newVolume = parseFloat(event.target.value);
    dispatch(playControlsActions.adjustValume(newVolume));
  };

  return (
    <div className={control ? classes.volumeControl : classes.volume}>
      <VolumeIcon
        muteHandler={muteHandler}
        mute={mute}
        className={classes.volumeIcon}
      ></VolumeIcon>
      <VolumeProgress
        valumeHandler={valumeHandler}
        volume={volume}
        className={classes.progress}
      ></VolumeProgress>
    </div>
  );
}

export default Volume;
