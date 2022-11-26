function Icon({ type, className }) {
  return (
    <svg className={!className ? "icon" : "icon " + className} aria-hidden="true">
      <use href={"#" + type}></use>
    </svg>
  );
}

export default Icon;
