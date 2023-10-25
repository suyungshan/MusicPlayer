function NextPlayIcon(props) {
  return (
    <button
      onClick={() => {
        props.choiceMusicHandler();
        props.activeHandler(props.song);
      }}
      className={props.className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M4.16675 4.1576C4.16675 3.3483 4.16675 2.94365 4.33549 2.72059C4.48249 2.52626 4.70718 2.40601 4.95041 2.39149C5.22961 2.37482 5.5663 2.59928 6.23968 3.0482L15.0026 8.89018C15.5591 9.26111 15.8373 9.44658 15.9342 9.68035C16.019 9.88473 16.019 10.1144 15.9342 10.3188C15.8373 10.5526 15.5591 10.738 15.0026 11.109L6.23968 16.951C5.5663 17.3999 5.22961 17.6243 4.95041 17.6077C4.70718 17.5931 4.48249 17.4729 4.33549 17.2786C4.16675 17.0555 4.16675 16.6509 4.16675 15.8416V4.1576Z"
          fill="white"
        />
      </svg>
    </button>
  );
}

export default NextPlayIcon;
