import clsx from "clsx";
import styles from "./index.module.css";

const Footer = ({ copyright }) => {
  return (
    <footer>
      {copyright && (
        <div>
          <span>©️</span>
          <span>{copyright}</span>
        </div>
      )}
    </footer>
  );
};

const UserLayout = ({ float, align, blur, centered, logo, title, desc, footer, children }) => {
  return (
    <div
      className={clsx(styles.main, {
        [styles.float]: float,
        [styles.blur]: blur,
        [styles.centered]: centered,
        [styles["align-" + align]]: styles["align-" + align],
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>
              <img className={styles.logo} src={logo} alt="logo" />
              <h2 className={styles.text}>{title}</h2>
            </div>
            {desc && <div className={styles.desc}>{desc}</div>}
          </div>
          <div className={styles.body}>{children}</div>
          <div className={styles.footer}>{footer}</div>
        </div>
      </div>
    </div>
  );
};

UserLayout.defaultProps = {
  float: true,
  blur: true,
  title: "网站标题",
};

UserLayout.Footer = Footer;

export default UserLayout;
