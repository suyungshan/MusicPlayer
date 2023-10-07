function VolumeIcon(props) {
  return (
    <button onClick={props.muteHandler} className={props.className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M15.2043 6.66628C15.8633 7.61114 16.2498 8.76024 16.2498 9.99961C16.2498 11.239 15.8633 12.3881 15.2043 13.3329M10.1119 3.63768L7.47386 6.27576C7.32973 6.41988 7.25767 6.49195 7.17357 6.54348C7.09901 6.58917 7.01772 6.62284 6.93269 6.64326C6.83679 6.66628 6.73487 6.66628 6.53105 6.66628H5.08333C4.61662 6.66628 4.38327 6.66628 4.20501 6.75711C4.04821 6.837 3.92072 6.96449 3.84083 7.12129C3.75 7.29955 3.75 7.5329 3.75 7.99961V11.9996C3.75 12.4663 3.75 12.6997 3.84083 12.8779C3.92072 13.0347 4.04821 13.1622 4.20501 13.2421C4.38327 13.3329 4.61662 13.3329 5.08333 13.3329H6.53105C6.73487 13.3329 6.83679 13.3329 6.93269 13.356C7.01772 13.3764 7.09901 13.4101 7.17357 13.4557C7.25767 13.5073 7.32973 13.5793 7.47386 13.7235L10.1119 16.3615C10.4689 16.7185 10.6474 16.897 10.8006 16.9091C10.9336 16.9195 11.0635 16.8657 11.1502 16.7643C11.25 16.6474 11.25 16.395 11.25 15.8901V4.10909C11.25 3.60424 11.25 3.35182 11.1502 3.23493C11.0635 3.13351 10.9336 3.07969 10.8006 3.09015C10.6474 3.10221 10.4689 3.2807 10.1119 3.63768Z"
          stroke="#9E9E9E"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default VolumeIcon;
