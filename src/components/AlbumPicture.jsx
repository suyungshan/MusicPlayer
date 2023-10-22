function AlbumPicture(props) {
  return (
    <div className={props.className}>
      <img src={props.picture} alt="Album Cover" />
    </div>
  );
}

export default AlbumPicture;
