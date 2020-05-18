import React from "react";
import styles from "./statbar.module.css";

import { Radar } from "react-chartjs-2";

function Statbar({ stats }) {
  return (
    <div className={styles["detail-stat"]}>
      <Radar
        data={{
          labels: [
            "HP",
            "Attack",
            "Defense",
            "Speed",
            "Spl.Attack",
            "Spl.Defense",
          ],
          datasets: [
            {
              label: "pts",
              backgroundColor: "rgba(0, 0, 255, 0.5)",
              borderColor: "rgba(0, 0, 255, 0.6)",
              data: [
                stats.hp,
                stats.attack,
                stats.defense,
                stats.speed,
                stats.specialAttack,
                stats.specialDefense,
              ],
            },
          ],
        }}
        options={{
          scale: {
            angleLines: {
              display: true,
            },
            ticks: {
              suggestedMin: 0,
              suggestedMax: 100,
            },
          },
          legend: { display: false },
          title: {
            display: true,
            text: `STATS`,
          },
        }}
      />
    </div>
  );
}

export default Statbar;

// const keys = Object.keys(stats);
//   const attributes = keys.map((key) => {
//     return (
//       <div className={styles["stat-row"]} key={key}>
//         <span>{key}</span>
//         <div className={styles.progress}>
//           <span style={backgroundStyle} />
//           <span
//             style={{
//               ...defaultForeGroundStyle,
//               width: `${stats[key] > 100 ? stats[key] / 2 : stats[key]}%`,
//             }}
//           />
//         </div>
//       </div>
//     );
//   });
