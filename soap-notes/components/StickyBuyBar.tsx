"use client";

import { useSyncExternalStore } from "react";
import {
  subscribeStickyBar,
  getStickyBarVisible,
  getStickyBarVisibleServerSnapshot,
} from "@/lib/sticky-bar-store";
import primitives from "./primitives.module.css";
import styles from "./StickyBuyBar.module.css";

export default function StickyBuyBar() {
  const visible = useSyncExternalStore(
    subscribeStickyBar,
    getStickyBarVisible,
    getStickyBarVisibleServerSnapshot
  );

  return (
    <div className={`${styles.bar} ${visible ? styles.barIn : ""}`}>
      <div className={styles.inner}>
        <span className={styles.label}>The Founding Set</span>
        <span className={styles.price}>$18 a bar · $48 the trio</span>
        <a href="#founding" className={`${primitives.btn} ${styles.cta}`}>
          Shop the set
        </a>
      </div>
    </div>
  );
}
