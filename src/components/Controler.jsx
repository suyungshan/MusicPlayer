import Play from "../UI/Icons/Play";
import ProgressBar from "../UI/Icons/ProgressBar";
import Loop from "../UI/Icons/Loop";
import Next from "../UI/Icons/Next";
import Last from "../UI/Icons/Last";
import Random from "../UI/Icons/Random";
import PlayTime from "../UI/Icons/PlayTime";
import Pause from "../UI/Icons/Pause";
import { useSelector, useDispatch } from "react-redux";
import { playControlsActions } from "../store/playControls";
import { musicDataActions } from "../store/musicData";
import PauseSmall from "../UI/Icons/PauseSmall";
import PlaySmall from "../UI/Icons/PlaySmall";
import classes from "./Controler.module.css";

function Controler(props) {
  const {
    videoIndex,
    played,
    remainSecond,
    playSecond,
    loop,
    allLoop,
    random,
    favPlay,
    playPause,
  } = useSelector((state) => state.playControls);
  const { favList, musicPlay } = useSelector((state) => state.musicData);
  const { midScreen, smallScreen } = useSelector((state) => state.windowSize);
  const control = useSelector((state) => state.interface.control);
  const dispatch = useDispatch();

  const playHandler = () => {
    dispatch(playControlsActions.play());
  };

  const activeHandler = (id) => {
    dispatch(playControlsActions.adjustActiveNextPlay(id));
  };

  const pauseHandler = () => {
    dispatch(playControlsActions.pause());
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
    dispatch(
      playControlsActions.adjustActiveNextPlay(musicPlay[videoIndex - 1].song)
    );
    dispatch(playControlsActions.play());
  };

  return smallScreen && !midScreen && !control ? (
    <div className={classes.controler}>
      <div className={classes.play}>
        {playPause ? (
          <PauseSmall
            stateHandler={pauseHandler}
            className={classes.playPause}
          ></PauseSmall>
        ) : (
          <PlaySmall
            stateHandler={playHandler}
            activeHandler={activeHandler}
            song={musicPlay[0].song}
            className={classes.playPause}
          ></PlaySmall>
        )}
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
        {playPause ? (
          <Pause
            stateHandler={pauseHandler}
            className={classes.playPause}
          ></Pause>
        ) : (
          <Play stateHandler={playHandler} className={classes.playPause}></Play>
        )}
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
        {playPause ? (
          <Pause
            stateHandler={pauseHandler}
            className={classes.playPause}
          ></Pause>
        ) : (
          <Play
            stateHandler={playHandler}
            activeHandler={activeHandler}
            song={musicPlay.length > 0 ? musicPlay[videoIndex].song : []}
            className={classes.playPause}
          ></Play>
        )}
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
