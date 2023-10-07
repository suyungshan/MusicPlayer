import AlbumPicture from "../AlbumPicture";
import classes from "./AlbumItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { musicDataActions } from "../../store/musicData";
import { interfaceActions } from "../../store/interface";
import { playControlsActions } from "../../store/playControls";

function AlbumItem(props) {
  const active = useSelector((state) => state.playControls.active);
  const dispatch = useDispatch();

  const mainData = {
    album: props.album,
    id: props.id,
    a: props.a, //這裡
    singer: props.singer,
    fulltime: props.fulltime,
    list: props.list,
  };

  const changeMusicHandler = () => {
    console.log(mainData);
    dispatch(musicDataActions.updatePlayingData(mainData));
    dispatch(musicDataActions.updateNextPlay(mainData));
    dispatch(interfaceActions.openMain());
  };

  const activeHandler = (id) => {
    dispatch(playControlsActions.adjustActive(id)); //這裡
  };

  return (
    <button
      className={active === props.a ? classes.iconActive : classes.icon} //這裡
      onClick={() => {
        changeMusicHandler();
        activeHandler(props.a); //這裡
      }}
    >
      <div className={classes.picture}>
        <AlbumPicture
          picture={props.a}
          className={classes.buttonPicture}
        ></AlbumPicture>
      </div>
      <div className={classes.album}>{props.album}</div>
      <div className={classes.singer}>{props.singer}</div>
    </button>
  );
}

export default AlbumItem;
