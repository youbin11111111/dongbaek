import { useId } from "react";
import "./Pyramid.css";

const levels = ["Self Actualisation", "Esteem", "Love Belonging", "Safety", "Physiological"] as const;

type PyramidProps = {
  title?: string;
  /** Level from top to bottom; use null for no highlighted level. */
  activeLevel?: 0 | 1 | 2 | 3 | 4 | null;
  className?: string;
};

/** Scalable Maslow pyramid based on the supplied design CSS. */
export default function Pyramid({ title = "Maslow Pyramid", activeLevel = 1, className = "" }: PyramidProps) {
  const titleId = useId();
  return (
    <figure className={`${"maslow-pyramid"} ${className}`} aria-labelledby={titleId}>
      <figcaption id={titleId} className={"maslow-title"}>{title}</figcaption>
      <svg viewBox="0 0 447 342" className={"maslow-diagram"} role="img" aria-label={`Five levels: ${levels.join(", ")}.${activeLevel !== null ? ` Highlighted: ${levels[activeLevel]}.` : ""}`}>
        {levels.map((label, index) => {
          const top = index * 68.4;
          const bottom = (index + 1) * 68.4;
          const leftTop = 170 - top * 170 / 342;
          const leftBottom = 170 - bottom * 170 / 342;
          const active = index === activeLevel;
          return (
            <g key={label} className={active ? "maslow-active" : "maslow-level"}>
              <polygon className={"maslow-slice"} points={`${leftTop},${top} 170,${top} 170,${bottom} ${leftBottom},${bottom}`} />
              {active ? <path className={"maslow-highlight"} d={`M170 ${top}H399Q409 ${top} 409 ${top+10}V${bottom-10}Q409 ${bottom} 399 ${bottom}H170Z`} /> : <><line className={"maslow-divider"} x1="176" x2="409" y1={top} y2={top}/>{index===4 && <line className={"maslow-divider"} x1="176" x2="409" y1={bottom-1} y2={bottom-1}/>}</>}
              <text className={"maslow-label"} x={active ? 289.5 : 203} y={(top+bottom)/2} textAnchor={active ? "middle" : "start"} dominantBaseline="middle">{label}</text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}

