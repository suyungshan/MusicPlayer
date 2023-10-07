import MainInformation from "./MainInfromation";
import AlbumPicture from "../AlbumPicture";
import classes from "./Main.module.css";
import PlayPause from "../../UI/Icons/PlayPause";
import PictureBackCard from "../../UI/Card/PictureBackCard";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { playControlsActions } from "../../store/playControls";
import { Fragment } from "react";
import ColorBackCard from "../../UI/Card/ColorBackCard";

function Main() {
  const playingData = useSelector((state) => state.musicData.playingData);
  const midScreen = useSelector((state) => state.windowSize.midScreen);
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const dispatch = useDispatch();

  const playAlbumHandler = () => {
    dispatch(musicDataActions.updateMusicPlay(playingData.list));
    dispatch(musicDataActions.updateControlerInfor(playingData));
    dispatch(playControlsActions.adjustVideoIndex(0));
    dispatch(playControlsActions.play());
  };

  const { album, a, singer, fulltime } = playingData;

  return (
    <Fragment>
      {midScreen || smallScreen ? (
        <div className={classes.main}>
          <div className={classes.content}>
            <div className={classes.picture}>
              <AlbumPicture picture={a}></AlbumPicture>
            </div>
            <div className={classes.infor}>
              <MainInformation
                album={album}
                singer={singer}
                fulltime={fulltime}
                className={classes.information}
              ></MainInformation>
              <PlayPause
                className={classes.playButton}
                stateHandler={playAlbumHandler}
              ></PlayPause>
            </div>
          </div>
        </div>
      ) : (
        <PictureBackCard
          back={classes.back}
          pictureBack={classes.pictureBack}
          contentBack={classes.contentBack}
          picture={a}
        >
          <div className={classes.main}>
            <div className={classes.content}>
              <div className={classes.picture}>
                <AlbumPicture picture={a}></AlbumPicture>
              </div>
              <div className={classes.infor}>
                <MainInformation
                  album={album}
                  singer={singer}
                  fulltime={fulltime}
                  className={classes.information}
                ></MainInformation>
                <PlayPause
                  className={classes.playButton}
                  stateHandler={playAlbumHandler}
                ></PlayPause>
              </div>
            </div>
          </div>
        </PictureBackCard>
      )}
    </Fragment>
  );
}

export default Main;
