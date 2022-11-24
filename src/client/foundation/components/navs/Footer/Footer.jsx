import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

/** @type {React.VFC} */
export const Footer = () => {
  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={styles.listItem}>ヘルプ</li>
        <li className={styles.listItem}>お問い合わせ</li>
        <li className={styles.listItem}>広告ガイドライン</li>
        <li className={styles.listItem}>運営会社</li>
        <li className={styles.listItem}>利用規約</li>
        <li className={styles.listItem}>特定商取引法</li>
        <li className={styles.listItem}>プライバシーポリシー</li>
      </ul>

      <h1 className={styles.nameText}>
        <Link className={styles.nameTextInnerAnchor} prefetch={true} href="/">
          CyberTicket
        </Link>
      </h1>

      <p className={styles.warningText}>
        じゃんけんはどこの国の商標でもなく、中国から九州に伝来した虫拳に由来する日本の遊戯です。拳券の購入は20歳になってから。じゃんけんは適度に楽しみましょう。
      </p>
    </div>
  );
};
