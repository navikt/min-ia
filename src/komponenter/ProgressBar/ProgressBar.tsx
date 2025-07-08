import React from "react";

import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
  max: number;
  value: number;
  partial: number;
  title: string;
  navn: string;
  className?: string;
  width?: React.CSSProperties["width"];
  partialCountsAs?: number;
};

export function ProgressBar({
  title,
  className = "",
  width = "12rem",
  max,
  value,
  partial,
  navn,
  partialCountsAs = 0.5,
}: ProgressBarProps) {
  if (max === 0) {
    return null;
  }

  const partialProgress = (value + partial * partialCountsAs) / max;

  return (
    <div
      className={`${styles["progress-bar-container"]} ${
        partialProgress === 1
          ? styles["progress-bar-complete"]
          : styles["progress-bar-incomplete"]
      } ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemax={max}
      aria-label={`Fremgang på ${navn}`}
      style={{ width }}
      title={title}
    >
      {
        <div
          className={styles["progress-bar-fill"]}
          style={{
            width: `calc(${partialProgress} * calc(100% - 1.2rem + calc(2 * var(--progress-bar-border-width))) + 1.2rem)`,
          }}
        />
      }
    </div>
  );
}
