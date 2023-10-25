import AlbumPicture from "../AlbumPicture";
import classes from "./AlbumItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { interfaceActions } from "../../store/interface";
import { playControlsActions } from "../../store/playControls";

function AlbumItem(props) {
  const activeAlbum = useSelector((state) => state.playControls.activeAlbum);
  const dispatch = useDispatch();

  const mainData = {
    album: props.album,
    id: props.id,
    a: props.a,
    singer: props.singer,
    fulltime: props.fulltime,
    list: props.list,
  };

  const changeMusicHandler = () => {
    window.scrollTo(0, 0);
    dispatch(musicDataActions.updatePlayingData(mainData));
    dispatch(musicDataActions.updateNextPlay(mainData));
    dispatch(interfaceActions.openMain());
  };

  const activeHandler = (id) => {
    dispatch(playControlsActions.adjustActiveAlbum(id));
  };

  return (
    <button
      className={activeAlbum === props.a ? classes.iconActive : classes.icon}
      onClick={() => {
        changeMusicHandler();
        activeHandler(props.a);
      }}
    >
      <div className={classes.buttonPicture}>
        <AlbumPicture picture={props.a}></AlbumPicture>
      </div>
      <div className={classes.infor}>
        <p className={`body-sm ${classes.album}`}>{props.album}</p>
        <p className={`text-hint ${classes.singer}`}>{props.singer}</p>
      </div>
    </button>
  );
}

export default AlbumItem;
