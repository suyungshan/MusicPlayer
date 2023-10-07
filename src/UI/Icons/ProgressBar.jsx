import classes from "./ProgressBar.module.css";

function ProgressBar(props) {
  return (
    <div className={props.control ? classes.progressControl : classes.progress}>
      <input
        type="range"
        min="0"
        max="1"
        step="any"
        value={props.played}
        onChange={(e) => props.onSeek(parseFloat(e.target.value))}
      ></input>
    </div>
  );
}

export default ProgressBar;
