import FavoriteChoose from "../../UI/Icons/FavoriteChoose";
import AlbumPicture from "../AlbumPicture";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { playControlsActions } from "../../store/playControls";
import classes from "./NextPlayItem.module.css";
import NextPlayIcon from "../../UI/Icons/NextPlayIcon";
import { Fragment, useState } from "react";
import NextPauseIcon from "../../UI/Icons/NextPauseIcon";
import FacebookPlayer from "react-player/facebook";

function NextPlayItem(props) {
  const { nextPlay, favList, musicPlay } = useSelector(
    (state) => state.musicData
  );
  const { videoIndex, activeNextPlay, playPause, addToFav } = useSelector(
    (state) => state.playControls
  );
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const dispatch = useDispatch();
  const [showHiddenPlayPause, setShowHiddenPlayPause] = useState(false);
  const [showHiddenFav, setShowHiddenFav] = useState(false);
  const newFavorites = [...favList];
  const existingSong = newFavorites.find((favListItem) => {
    return favListItem.song === props.song;
  });

  const pauseHandler = () => {
    dispatch(playControlsActions.pause());
  };

  const choiceMusicHandler = () => {
    const controlerInfordata = {
      a: props.a,
      album: props.album,
      singer: props.singer,
      number: props.number,
      song: props.song,
      time: props.time,
      url: props.url,
    };

    if (nextPlay.list[props.number - 1].url === musicPlay[videoIndex].url) {
      dispatch(playControlsActions.togglePlay());
    }
    dispatch(playControlsActions.closeFavPlay());
    dispatch(playControlsActions.adjustVideoIndex(props.number - 1));
    dispatch(musicDataActions.updateMusicPlay(nextPlay.list));
    dispatch(musicDataActions.updateControlerInfor(controlerInfordata));
    dispatch(playControlsActions.play());
    setShowHiddenFav(true);
  };

  const favListHandler = () => {
    if (!existingSong) {
      newFavorites.push({
        a: props.a,
        album: props.album,
        singer: props.singer,
        number: props.number,
        song: props.song,
        time: props.time,
        url: props.url,
      });
      dispatch(musicDataActions.updateFavList(newFavorites));
      dispatch(playControlsActions.addToFav());
    } else if (musicPlay[videoIndex].song === props.song) {
      return;
    } else {
      const deleteFavlist = favList.filter((favListItem) => {
        return favListItem.url !== props.url;
      });
      dispatch(musicDataActions.updateFavList(deleteFavlist));
    }
  };

  const handleMouseEnter = () => {
    setShowHiddenPlayPause(true);
    setShowHiddenFav(true);
  };

  const handleMouseLeave = () => {
    setShowHiddenPlayPause(false);
    setShowHiddenFav(false);
  };

  const activeHandler = (id) => {
    dispatch(playControlsActions.adjustActiveNextPlay(id));
  };

  return smallScreen ? (
    <div
      className={
        activeNextPlay === props.song
          ? classes.playItemActive
          : classes.playItem
      }
    >
      <button className={classes.infor} onClick={choiceMusicHandler}>
        <div className={classes.detail}>
          <div className={classes.picture}>
            <AlbumPicture picture={props.a}></AlbumPicture>
          </div>
          <div className={classes.actor}>
            <p className={classes.song}>{props.song}</p>
            <p className={`text-hint ${classes.singer}`}>{props.singer}</p>
          </div>
        </div>
        <p className={`text-hint ${classes.album}`}>{props.album}</p>
      </button>
      <div className={classes.last}>
        <p className={`text-hint ${classes.time}`}>{props.time}</p>
        <button className={classes.favButton} onClick={favListHandler}>
          <FavoriteChoose
            className={classes.favorite}
            addToFav={existingSong ? addToFav : undefined}
          ></FavoriteChoose>
        </button>
      </div>
    </div>
  ) : (
    <div
      className={
        activeNextPlay === props.song
          ? classes.playItemActive
          : classes.playItem
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={classes.infor}>
        <div className={classes.detail}>
          {showHiddenPlayPause ? (
            <Fragment>
              {playPause && musicPlay[videoIndex].song === props.song ? (
                <NextPauseIcon
                  className={classes.nextPlayIcon}
                  stateHandler={pauseHandler}
                ></NextPauseIcon>
              ) : (
                <NextPlayIcon
                  className={classes.nextPlayIcon}
                  choiceMusicHandler={choiceMusicHandler}
                  activeHandler={activeHandler}
                  song={props.song}
                ></NextPlayIcon>
              )}
            </Fragment>
          ) : (
            <button className={classes.first}>
              <div className={classes.number}>{props.number}</div>
            </button>
          )}
          <div className={classes.picture}>
            <AlbumPicture picture={props.a}></AlbumPicture>
          </div>
          <div className={classes.actor}>
            <p className={classes.song}>{props.song}</p>
            <p className={`text-hint ${classes.singer}`}>{props.singer}</p>
          </div>
        </div>
      </div>
      <p className={`text-hint ${classes.album}`}>{props.album}</p>
      <div className={classes.last}>
        <p className={`text-hint ${classes.time}`}>{props.time}</p>
        <button
          className={
            showHiddenFav || existingSong
              ? classes.favButton
              : classes.favButtonHide
          }
          onClick={favListHandler}
        >
          <FavoriteChoose
            className={classes.favorite}
            addToFav={existingSong ? addToFav : undefined}
          ></FavoriteChoose>
        </button>
      </div>
    </div>
  );
}

export default NextPlayItem;
