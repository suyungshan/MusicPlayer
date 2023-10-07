import PlayPause from "../UI/Icons/PlayPause";
import ProgressBar from "../UI/Icons/ProgressBar";
import Loop from "../UI/Icons/Loop";
import Next from "../UI/Icons/Next";
import Last from "../UI/Icons/Last";
import Random from "../UI/Icons/Random";
import PlayTime from "../UI/Icons/PlayTime";
import classes from "./Controler.module.css";
import { useSelector, useDispatch } from "react-redux";
import { playControlsActions } from "../store/playControls";
import { musicDataActions } from "../store/musicData";

function Controler(props) {
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const played = useSelector((state) => state.playControls.played);
  const remainSecond = useSelector((state) => state.playControls.remainSecond);
  const playSecond = useSelector((state) => state.playControls.playSecond);
  const loop = useSelector((state) => state.playControls.loop);
  const allLoop = useSelector((state) => state.playControls.allLoop);
  const random = useSelector((state) => state.playControls.random);
  const midScreen = useSelector((state) => state.windowSize.midScreen);
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const control = useSelector((state) => state.interface.control);
  const favPlay = useSelector((state) => state.playControls.favPlay);
  const favList = useSelector((state) => state.musicData.favList);
  const musicPlay = useSelector((state) => state.musicData.musicPlay);

  const dispatch = useDispatch();

  const playPauseHandler = () => {
    dispatch(playControlsActions.togglePlay());
  };

  const loopHandler = () => {
    dispatch(playControlsActions.toggleLoop());
  };

  const allLoopHandler = () => {
    dispatch(playControlsActions.toggleAllLoop());
    dispatch(playControlsActions.toggleLoop());
  };

  const noneHandler = () => {
    dispatch(playControlsActions.stopLoop());
    dispatch(playControlsActions.stopAllLoop());
  };

  const randomHandler = () => {
    dispatch(playControlsActions.toggleRandom());
  };

  const onLastVideo = () => {
    if (favPlay && favList !== musicPlay) {
      dispatch(musicDataActions.updateMusicPlay(favList));
      dispatch(playControlsActions.adjustVideoIndex(videoIndex - 1));
      dispatch(musicDataActions.updateControlerInfor(favList));
      dispatch(playControlsActions.play());
    }

    if (videoIndex === 0) {
      return;
    }
    const lastIndex = videoIndex - 1;
    dispatch(playControlsActions.adjustVideoIndex(lastIndex));
    dispatch(playControlsActions.resetPlayed());
    dispatch(playControlsActions.play());
  };

  return smallScreen && !midScreen && !control ? (
    <div className={classes.controler}>
      <div className={classes.play}>
        <PlayPause
          stateHandler={playPauseHandler}
          className={classes.playPause}
        ></PlayPause>
      </div>
    </div>
  ) : control ? (
    <div className={classes.controlerControl}>
      <div className={classes.playcontrol}>
        <Loop
          loopHandler={loopHandler}
          loop={loop}
          allLoopHandler={allLoopHandler}
          allLoop={allLoop}
          noneHandler={noneHandler}
          className={classes.loop}
        ></Loop>
        <Last onLastVideo={onLastVideo} className={classes.last}></Last>
        <PlayPause
          stateHandler={playPauseHandler}
          className={classes.playPauseControl}
        ></PlayPause>
        <Next onNextVideo={props.onNextVideo} className={classes.next}></Next>
        <div className={classes.randomBlock}>
          <Random
            randomHandler={randomHandler}
            random={random}
            className={classes.random}
          ></Random>
        </div>
      </div>
      <div className={classes.playProgress}>
        <div className={classes.playTime}>
          <PlayTime playsecond={playSecond}></PlayTime>
          <PlayTime playsecond={remainSecond}></PlayTime>
        </div>
        <div className={classes.progressControl}>
          <ProgressBar
            onSeek={props.onSeek}
            played={played}
            control={control}
          ></ProgressBar>
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.controler}>
      <div className={classes.play}>
        <Loop
          loopHandler={loopHandler}
          loop={loop}
          allLoopHandler={allLoopHandler}
          allLoop={allLoop}
          noneHandler={noneHandler}
          className={classes.loop}
        ></Loop>
        <Last onLastVideo={onLastVideo} className={classes.last}></Last>
        <PlayPause
          stateHandler={playPauseHandler}
          className={classes.playPause}
        ></PlayPause>
        <Next onNextVideo={props.onNextVideo} className={classes.next}></Next>
        <div className={classes.randomBlock}>
          <Random
            randomHandler={randomHandler}
            random={random}
            className={classes.random}
          ></Random>
        </div>
      </div>
      <div className={classes.progress}>
        <PlayTime playsecond={playSecond}></PlayTime>
        <ProgressBar onSeek={props.onSeek} played={played}></ProgressBar>
        <PlayTime playsecond={remainSecond}></PlayTime>
      </div>
    </div>
  );
}

export default Controler;
