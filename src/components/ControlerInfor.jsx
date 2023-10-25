import FavoriteChoose from "../UI/Icons/FavoriteChoose";
import AlbumPicture from "./AlbumPicture";
import { useSelector, useDispatch } from "react-redux";
import { interfaceActions } from "../store/interface";
import { musicDataActions } from "../store/musicData";
import { playControlsActions } from "../store/playControls";
import classes from "./ControlerInfor.module.css";

function ControlerInfor() {
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const control = useSelector((state) => state.interface.control);
  const controlerInfor = useSelector((state) => state.musicData.controlerInfor);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const musicPlay = useSelector((state) => state.musicData.musicPlay);
  const favList = useSelector((state) => state.musicData.favList);
  const addToFav = useSelector((state) => state.playControls.addToFav);
  const dispatch = useDispatch();
  const favData = controlerInfor[videoIndex];
  const newFavorites = [...favList];

  const existingUrl = favList.find((favListItem) => {
    return favListItem.url === controlerInfor.url;
  });

  const existingSong = newFavorites.find((favListItem) => {
    if (Object.prototype.toString.call(controlerInfor) === "[object Array]") {
      return favListItem.song === favData.song;
    } else {
      return favListItem.song === controlerInfor.song;
    }
  });

  const controlPageHandler = () => {
    dispatch(interfaceActions.openControl());
  };

  const favListHandler = () => {
    if (!existingSong) {
      newFavorites.push({
        a: controlerInfor.a,
        album: controlerInfor.album,
        singer: controlerInfor.singer,
        number: controlerInfor.number,
        song: controlerInfor.song,
        time: controlerInfor.time,
        url: controlerInfor.url,
      });
      dispatch(musicDataActions.updateFavList(newFavorites));
      dispatch(playControlsActions.addToFav());
    } else {
      const deleteFavlist = favList.filter((favListItem) => {
        return favListItem.song !== controlerInfor.song;
      });
      dispatch(musicDataActions.updateFavList(deleteFavlist));
    }
  };

  return (
    <div
      className={
        control
          ? classes.inforControl
          : smallScreen
          ? classes.inforSamll
          : classes.infor
      }
    >
      <button
        className={control ? classes.inforBarControl : classes.inforBar}
        onClick={controlPageHandler}
      >
        <AlbumPicture
          className={control ? classes.pictureControl : classes.picture}
          picture={
            Object.prototype.toString.call(controlerInfor) === "[object Array]"
              ? favData.a
              : controlerInfor.a
          }
        ></AlbumPicture>
        <div className={control ? classes.detailcontrol : classes.detail}>
          <div className={control ? `h2 ${classes.songcontrol}` : classes.song}>
            {musicPlay.length > 0 ? musicPlay[videoIndex].song : null}
          </div>
          <p
            className={
              control ? classes.singerControl : `text-hint ${classes.singer}`
            }
          >
            {Object.prototype.toString.call(controlerInfor) === "[object Array]"
              ? favData.singer
              : controlerInfor.singer}
          </p>
        </div>
      </button>
      {control ? null : (
        <button className={classes.favButton} onClick={favListHandler}>
          <FavoriteChoose
            className={classes.favorite}
            addToFav={addToFav && existingSong ? addToFav : undefined}
          ></FavoriteChoose>
        </button>
      )}
    </div>
  );
}
export default ControlerInfor;
