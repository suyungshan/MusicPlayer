import Favorite from "../UI/Icons/Favorite";
import AlbumPicture from "./AlbumPicture";
import { useSelector, useDispatch } from "react-redux";
import { interfaceActions } from "../store/interface";
import classes from "./ControlerInfor.module.css";

function ControlerInfor(props) {
  const smallScreen = useSelector((state) => state.windowSize.smallScreen);
  const midScreen = useSelector((state) => state.windowSize.midScreen);
  const control = useSelector((state) => state.interface.control);
  const controlerInfor = useSelector((state) => state.musicData.controlerInfor);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const musicPlay = useSelector((state) => state.musicData.musicPlay);
  const dispatch = useDispatch();

  const controlPageHandler = () => {
    dispatch(interfaceActions.openControl());
  };

  const favData = controlerInfor[videoIndex];

  return (
    <div className={control ? classes.inforControl : classes.infor}>
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
          <p className={control ? classes.songcontrol : classes.song}>
            {musicPlay[videoIndex].song}
          </p>
          <p className={control ? classes.singerControl : classes.singer}>
            {Object.prototype.toString.call(controlerInfor) === "[object Array]"
              ? favData.singer
              : controlerInfor.singer}
          </p>
        </div>
      </button>
      {smallScreen || control ? <></> : <Favorite></Favorite>}
    </div>
  );
}
export default ControlerInfor;
