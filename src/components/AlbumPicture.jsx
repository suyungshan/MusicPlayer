function AlbumPicture(props) {
  // console.log(props.picture);
  return (
    <div className={props.className}>
      <img src={props.picture} alt="Album Cover" />
    </div>
  );
}

export default AlbumPicture;
