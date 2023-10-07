import AlbumPicture from "../AlbumPicture";
import MyFavMainInf from "./MyFavMainInf.";
import PlayPause from "../../UI/Icons/PlayPause";
import PictureBackCard from "../../UI/Card/PictureBackCard";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { playControlsActions } from "../../store/playControls";
import classes from "./MyFavMain.module.css";
import { Fragment } from "react";

function MyFavMain(props) {
  const midScreen = useSelector((state) => state.windowSize.midScreen);
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const favList = useSelector((state) => state.musicData.favList);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const favPlay = useSelector((state) => state.playControls.favPlay);
  const dispatch = useDispatch();

  console.log(favList);

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
              <PlayPause
                className={classes.playPause}
                stateHandler={playFavHandler}
              ></PlayPause>
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
              <PlayPause
                className={classes.playPause}
                stateHandler={playFavHandler}
              ></PlayPause>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default MyFavMain;
