import Link from "next/link";
import React, { useCallback } from "react";
import styles from "./Header.module.css";
import baseButtonStyles from "../../buttons/BaseButton/BaseButton.module.css";

import classnames from "classnames";
import { useAuth, useRegister } from "../../../contexts/AuthContext";

/** @type {React.VFC} */
export const Header = () => {
  const { loggedIn } = useAuth();
  const register = useRegister();

  const handleClickLoginButton = useCallback(() => {
    register();
  }, [register]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.nameText}>
        <Link className={styles.nameTextAnchor} prefetch={false} href="/">
          CyberTicket
        </Link>
      </h1>

      {loggedIn ? (
        <div>ログイン中です</div>
      ) : (
        <button className={styles.loginButton} onClick={handleClickLoginButton}>
          ログイン
        </button>
      )}
    </div>
  );
};
