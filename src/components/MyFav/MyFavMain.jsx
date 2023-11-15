import AlbumPicture from "../AlbumPicture";
import MyFavMainInf from "./MyFavMainInf.";
import Play from "../../UI/Icons/Play";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { playControlsActions } from "../../store/playControls";
import classes from "./MyFavMain.module.css";
import { Fragment } from "react";

function MyFavMain() {
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const favList = useSelector((state) => state.musicData.favList);
  const { videoIndex, favPlay } = useSelector((state) => state.playControls);
  const dispatch = useDispatch();

  const playFavHandler = () => {
    if (favList.length === 0) {
      return;
    }
    dispatch(musicDataActions.updateMusicPlay(favList));
    dispatch(musicDataActions.updateControlerInfor(favList));
    dispatch(playControlsActions.adjustVideoIndex(0));
    dispatch(playControlsActions.openFavPlay());
    dispatch(playControlsActions.play());
  };

  return (
    <Fragment>
      {smallScreen ? (
        <div className={classes.main}>
          <div className={classes.content}>
            <div className={classes.picture}>
              <AlbumPicture
                picture={
                  favList.length === 0
                    ? "https://as.chdev.tw/web/article/6/a/4/644dc940-a50f-4900-b902-ba186a76664d1639560505.jpg"
                    : favPlay
                    ? favList[videoIndex].a
                    : favList[0].a
                }
              ></AlbumPicture>
            </div>
            <div className={classes.InforPlay}>
              <MyFavMainInf
                fulltime={"05:00"}
                className={classes.information}
              ></MyFavMainInf>
              <Play
                className={classes.playPause}
                stateHandler={playFavHandler}
              ></Play>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.main}>
          <div className={classes.content}>
            <div className={classes.picture}>
              <AlbumPicture
                picture={
                  favList.length === 0
                    ? "https://as.chdev.tw/web/article/6/a/4/644dc940-a50f-4900-b902-ba186a76664d1639560505.jpg"
                    : favPlay
                    ? favList[videoIndex].a
                    : favList[0].a
                }
              ></AlbumPicture>
            </div>
            <div className={classes.infor}>
              <MyFavMainInf
                fulltime={"05:00"}
                className={classes.information}
              ></MyFavMainInf>
              <Play
                className={classes.playPause}
                stateHandler={playFavHandler}
              ></Play>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default MyFavMain;
