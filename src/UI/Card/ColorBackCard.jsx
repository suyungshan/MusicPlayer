function ColorBackCard(props) {
  return (
    <div className={props.colorBack}>
      <div className={props.colorBackChild}>{props.children}</div>
    </div>
  );
}

export default ColorBackCard;
