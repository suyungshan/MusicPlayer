function VolumeProgress(props) {
  return (
    <div className={props.className}>
      <input
        type="range"
        min="0"
        max="1"
        step="any"
        value={props.valume}
        onChange={props.valumeHandler}
      ></input>
    </div>
  );
}

export default VolumeProgress;
