import classes from "./PlayTime.module.css";

function PlayTime(props) {
  return (
    <div className={classes.playTime}>
      <p>{props.playsecond}</p>
    </div>
  );
}

export default PlayTime;
