import Favorite from "../../UI/Icons/Favorite";
import AlbumPicture from "../AlbumPicture";
import { useSelector, useDispatch } from "react-redux";
import musicData, { musicDataActions } from "../../store/musicData";
import { playControlsActions } from "../../store/playControls";
import classes from "./MyFavPlayItem.module.css";

function MyFavPlayItem(props) {
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const midScreen = useSelector((state) => state.windowSize.midScreen);
  const favList = useSelector((state) => state.musicData.favList);
  const favPlay = useSelector((state) => state.playControls.favPlay);
  const musicPlay = useSelector((state) => state.musicData.musicPlay);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const dispatch = useDispatch();

  const myFavMusicHandler = () => {
    //點擊到同歌曲的話重新播放該歌曲
    if (favList[props.number - 1].url === musicPlay[videoIndex].url) {
      props.playerRef.current.seekTo(0);
    }

    dispatch(playControlsActions.openFavPlay());
    dispatch(musicDataActions.updateMusicPlay(favList));
    dispatch(playControlsActions.adjustVideoIndex(props.number - 1));
    dispatch(musicDataActions.updateControlerInfor(favList));
    dispatch(playControlsActions.play());
  };

  const deleteFavoritesHandler = () => {
    const deleteFavorites = favList.filter((favList) => {
      return favList.url !== props.url;
    });

    const deleteIndex = favList.findIndex(
      (favList) => favList.url === props.url
    );

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
      (deleteIndex === videoIndex) === 0 &&
      deleteFavorites.length === 0
    ) {
      dispatch(musicDataActions.updateFavList([]));
    } else {
      dispatch(musicDataActions.updateFavList(deleteFavorites));
    }
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
          <Favorite className={classes.favorite}></Favorite>
        </button>
      </div>
    </div>
  ) : (
    <div className={classes.playItem}>
      <div className={classes.detail}>
        <button className={classes.number} onClick={myFavMusicHandler}>
          {props.number}
        </button>
        <AlbumPicture
          className={classes.picture}
          picture={props.a}
        ></AlbumPicture>
        <div className={classes.actor}>
          <p className={classes.song}>{props.song}</p>
          {midScreen ? <></> : <p className={classes.singer}>{props.singer}</p>}
        </div>
      </div>
      <p className={classes.album}>{props.album}</p>
      <div className={classes.last}>
        <p className={classes.time}>{props.time}</p>
        <button className={classes.favButton} onClick={deleteFavoritesHandler}>
          <Favorite className={classes.favorite}></Favorite>
        </button>
      </div>
    </div>
  );
}

export default MyFavPlayItem;
