function Button({ size = "", children, color = "", onClick }) {
  if (size === "large")
    return (
      <button
        onClick={onClick}
        className={" text-white   btn-lg btn-wide btn-" + color + " btn"}
      >
        {children}
      </button>
    );
  else if (size === "small")
    return (
      <button
        onClick={onClick}
        className={"btn text-white btn-xs btn-" + color + ""}
      >
        {children}
      </button>
    );
  else
    return (
      <button onClick={onClick} className={"btn text-white btn-" + color + ""}>
        {children}
      </button>
    );
}

export default Button;
