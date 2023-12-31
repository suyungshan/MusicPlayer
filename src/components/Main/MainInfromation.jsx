import classes from "./MainInformation.module.css";

function MainInformation(props) {
  return (
    <div className={props.className}>
      <h1 className={`h1 ${classes.AlbumName}`}>{props.album}</h1>
      <div className={classes.infor}>
        <p className={classes.singer}>{props.singer}</p>
        <p className={classes.fulltime}>{props.fulltime}</p>
      </div>
    </div>
  );
}

export default MainInformation;
