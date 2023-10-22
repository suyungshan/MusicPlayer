import classes from "./MainInformation.module.css";

function MainInformation(props) {
  return (
    <div className={props.className}>
      <p className={classes.AlbumName}>{props.album}</p>
      <div className={classes.infor}>
        <p className={classes.singer}>{props.singer}</p>
        <p className={classes.fulltime}>{props.fulltime}</p>
      </div>
    </div>
  );
}

export default MainInformation;
