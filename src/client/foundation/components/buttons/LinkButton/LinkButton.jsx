import Link from "next/link";
import classnames from "classnames";
import styles from "./LinkButton.module.css";

export const LinkButton = (props) => {
  return (
    <Link
      className={classnames(styles.linkButton, props.className)}
      {...props}
      prefetch={true}
    />
  );
};
