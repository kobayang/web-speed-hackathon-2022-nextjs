"use client";

import { useEffect, useState } from "react";
import { formatCloseAt } from "../../../../utils/DateUtils";

export function CloseAtText({ closeAt }) {
  const [closeAtText, setCloseAtText] = useState(formatCloseAt(closeAt));

  // 締切はリアルタイムで表示したい
  useEffect(() => {
    const timer = setInterval(() => {
      setCloseAtText(formatCloseAt(closeAt));
    }, 0);

    return () => {
      clearInterval(timer);
    };
  }, [closeAt]);

  return <p>{closeAtText}</p>;
}
