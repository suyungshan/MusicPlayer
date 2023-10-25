import FavoriteFav from "../../UI/Icons/FavoriteFav";
import AlbumPicture from "../AlbumPicture";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { useState, Fragment } from "react";
import { playControlsActions } from "../../store/playControls";
import NextPlayIcon from "../../UI/Icons/NextPlayIcon";
import NextPauseIcon from "../../UI/Icons/NextPauseIcon";
import classes from "./MyFavPlayItem.module.css";

function MyFavPlayItem(props) {
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const playPause = useSelector((state) => state.playControls.playPause);
  const favList = useSelector((state) => state.musicData.favList);
  const favPlay = useSelector((state) => state.playControls.favPlay);
  const musicPlay = useSelector((state) => state.musicData.musicPlay);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const allLoop = useSelector((state) => state.playControls.allLoop);

  const [showHiddenPlayPause, setShowHiddenPlayPause] = useState(false);
  const activeNextPlay = useSelector(
    (state) => state.playControls.activeNextPlay
  );
  const dispatch = useDispatch();
  const deleteIndex = favList.findIndex(
    (favList) => favList.song === props.song
  );

  const myFavMusicHandler = () => {
    if (favList[props.number - 1].url === musicPlay[videoIndex].url) {
      dispatch(playControlsActions.pause());
    }

    dispatch(playControlsActions.openFavPlay());
    dispatch(musicDataActions.updateMusicPlay(favList));
    dispatch(playControlsActions.adjustVideoIndex(props.number - 1));
    dispatch(musicDataActions.updateControlerInfor(favList));
    dispatch(playControlsActions.play());
  };

  const deleteFavoritesHandler = () => {
    const deleteFavorites = favList.filter((favList) => {
      return favList.song !== props.song;
    });

    if (favPlay && deleteIndex < videoIndex) {
      dispatch(musicDataActions.updateFavList(deleteFavorites));
      dispatch(musicDataActions.updateControlerInfor(deleteFavorites));
      dispatch(playControlsActions.adjustVideoIndex(videoIndex - 1));
      dispatch(musicDataActions.updateMusicPlay(deleteFavorites));
    } else if (favPlay && deleteIndex === videoIndex) {
      return;
    } else if (favPlay && deleteIndex < videoIndex) {
      dispatch(musicDataActions.updateFavList(deleteFavorites));
      dispatch(musicDataActions.updateControlerInfor(deleteFavorites));
      dispatch(musicDataActions.updateMusicPlay(deleteFavorites));
    } else if (
      (favPlay && deleteIndex === videoIndex) === 0 &&
      deleteFavorites.length === 0
    ) {
      dispatch(musicDataActions.updateFavList([]));
    } else if (playPause && musicPlay[videoIndex].song === props.song) {
      return;
    } else {
      dispatch(musicDataActions.updateFavList(deleteFavorites));
    }
  };

  const handleMouseEnter = () => {
    setShowHiddenPlayPause(true);
  };

  const handleMouseLeave = () => {
    setShowHiddenPlayPause(false);
  };

  const pauseHandler = () => {
    dispatch(playControlsActions.pause());
  };

  const activeHandler = (id) => {
    dispatch(playControlsActions.adjustActiveNextPlay(id));
  };

  return smallScreen ? (
    <div className={classes.playItem}>
      <button className={classes.detail} onClick={myFavMusicHandler}>
        <AlbumPicture
          className={classes.picture}
          picture={props.a}
        ></AlbumPicture>
        <div className={classes.actor}>
          <p className={classes.song}>{props.song}</p>
        </div>
      </button>
      <div className={classes.last}>
        <p className={classes.time}>{props.time}</p>
        <button className={classes.favButton} onClick={deleteFavoritesHandler}>
          <FavoriteFav className={classes.favorite}></FavoriteFav>
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
      <div className={classes.detail}>
        {showHiddenPlayPause ? (
          <Fragment>
            {playPause &&
            // favList === musicPlay &&
            // videoIndex <= favList.length - 1 &&
            activeNextPlay === props.song ? (
              <NextPauseIcon
                className={classes.nextPlayIcon}
                stateHandler={pauseHandler}
              ></NextPauseIcon>
            ) : (
              <NextPlayIcon
                className={classes.nextPlayIcon}
                choiceMusicHandler={myFavMusicHandler}
                activeHandler={activeHandler}
                song={props.song}
              ></NextPlayIcon>
            )}
          </Fragment>
        ) : (
          <button className={classes.first} onClick={myFavMusicHandler}>
            <div className={classes.number}> {props.number}</div>
          </button>
        )}
        <AlbumPicture
          className={classes.picture}
          picture={props.a}
        ></AlbumPicture>
        <div className={classes.actor}>
          <p className={classes.song}>{props.song}</p>
          <p className={classes.singer}>{props.singer}</p>
        </div>
      </div>
      <p className={classes.album}>{props.album}</p>
      <div className={classes.last}>
        <p className={classes.time}>{props.time}</p>
        <button className={classes.favButton} onClick={deleteFavoritesHandler}>
          <FavoriteFav className={classes.favorite}></FavoriteFav>
        </button>
      </div>
    </div>
  );
}

export default MyFavPlayItem;
