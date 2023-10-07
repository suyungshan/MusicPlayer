import AlbumPicture from "../../components/AlbumPicture";
import { useSelector } from "react-redux";

function PictureBackCard(props) {
  const controlerInfor = useSelector((state) => state.musicData.controlerInfor);
  const videoIndex = useSelector((state) => state.playControls.videoIndex);
  const control = useSelector((state) => state.interface.control);

  const favData = controlerInfor[videoIndex];
  const picture =
    Object.prototype.toString.call(controlerInfor) === "[object Array]"
      ? favData.a
      : controlerInfor.a;

  return (
    <div className={props.back}>
      <AlbumPicture
        className={props.pictureBack}
        picture={control ? picture : props.picture}
      ></AlbumPicture>
      <div className={props.contentBack}>{props.children}</div>
    </div>
  );
}

export default PictureBackCard;
