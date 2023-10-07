import Favorite from "../../UI/Icons/Favorite";
import AlbumPicture from "../AlbumPicture";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { playControlsActions } from "../../store/playControls";
import classes from "./NextPlayItem.module.css";

function NextPlayItem(props) {
  const nextPlay = useSelector((state) => state.musicData.nextPlay);
  const favList = useSelector((state) => state.musicData.favList);
  const musicPlay = useSelector((state) => state.musicData.musicPlay);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const dispatch = useDispatch();

  const choiceMusicHandler = () => {
    //點擊到同歌曲的話重新播放該歌曲
    if (nextPlay.list[props.number - 1].url === musicPlay[videoIndex].url) {
      props.playerRef.current.seekTo(0);
    }
    dispatch(playControlsActions.closeFavPlay());
    dispatch(playControlsActions.adjustVideoIndex(props.number - 1));
    dispatch(musicDataActions.updateMusicPlay(nextPlay.list));
    dispatch(musicDataActions.updateControlerInfor(nextPlay));
    dispatch(playControlsActions.play());
  };

  const favListHandler = () => {
    console.log(favList);
    const newFavorites = [...favList];
    const existingItem = newFavorites.find((favListItem) => {
      return favListItem.url === props.url;
    });
    if (!existingItem) {
      //下面要拆的原因是不能把 playRef 放進來，他非序列
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
    } else {
      return;
    }
  };

  return smallScreen ? (
    <div className={classes.playItem}>
      <button className={classes.infor} onClick={choiceMusicHandler}>
        <div className={classes.detail}>
          <div className={classes.picture}>
            <AlbumPicture picture={props.a}></AlbumPicture>
          </div>
          <div className={classes.actor}>
            <p className={classes.song}>{props.song}</p>
            <p className={classes.singer}>{props.singer}</p>
          </div>
        </div>
        <p className={classes.album}>{props.album}</p>
      </button>
      <div className={classes.last}>
        <p className={classes.time}>{props.time}</p>
        <button className={classes.favButton} onClick={favListHandler}>
          <Favorite className={classes.favorite}></Favorite>
        </button>
      </div>
    </div>
  ) : (
    <div className={classes.playItem}>
      <div className={classes.infor}>
        <div className={classes.detail}>
          <button className={classes.number} onClick={choiceMusicHandler}>
            {props.number}
          </button>
          <div className={classes.picture}>
            <AlbumPicture picture={props.a}></AlbumPicture>
          </div>
          <div className={classes.actor}>
            <p className={classes.song}>{props.song}</p>
            <p className={classes.singer}>{props.singer}</p>
          </div>
        </div>
      </div>
      <p className={classes.album}>{props.album}</p>
      <div className={classes.last}>
        <p className={classes.time}>{props.time}</p>
        <button className={classes.favButton} onClick={favListHandler}>
          <Favorite className={classes.favorite}></Favorite>
        </button>
      </div>
    </div>
  );
}

export default NextPlayItem;
