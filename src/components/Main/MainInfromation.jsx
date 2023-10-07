import classes from "./MainInformation.module.css";

function MainInformation(props) {
  return (
    <div className={props.className}>
      <p className={classes.AlbumName}>{props.album}</p>
      <div className={classes.infor}>
        <p className={classes.detail}>{props.singer}</p>
        <p className={classes.detail}>{props.fulltime}</p>
      </div>
    </div>
  );
}

export default MainInformation;
