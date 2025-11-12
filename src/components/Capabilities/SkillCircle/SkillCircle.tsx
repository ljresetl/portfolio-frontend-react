import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./SkillCircle.module.scss";

interface SkillCircleProps {
  label: string;
  level: number;
}

const SkillCircle: React.FC<SkillCircleProps> = ({ label, level }) => {
  return (
    <div className={styles.skill}>
      <CircularProgressbar
        value={level}
        text={`${level}%`}
        styles={buildStyles({
          textColor: "#1f1d1dff",
          pathColor: level > 70 ? "#4caf50" : level > 40 ? "#ff9800" : "#f44336",
          trailColor: "#eee",
        })}
      />
      <div className={styles.label}>{label}</div>
    </div>
  );
};

export default SkillCircle;
