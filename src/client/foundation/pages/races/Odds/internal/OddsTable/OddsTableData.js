import { OddsMarker } from "../OddsMarker";
import { BuyButton } from "./BuyButton";
import { mapKey } from "./mapkey";

import styles from "./OddsTable.module.css";

export const OddsTableData = ({ headNumbers, oddsMap, isRaceClosed }) => {
  return (
    <div className={styles.scrollWrapper}>
      <div>
        <table className={styles.table}>
          <thead className={styles.th}>
            <tr>
              <th className={styles.th} width="64px">
                2位
              </th>
              <th className={styles.th} width="32px"></th>

              {headNumbers.map((second) => (
                <th className={styles.th} key={second} width="auto">
                  {second}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {headNumbers.map((third, i) => (
              <tr key={third}>
                {i === 0 && (
                  <th className={styles.th} rowSpan={headNumbers.length}>
                    3位
                  </th>
                )}

                <th className={styles.th}>{third}</th>

                {headNumbers.map((second) => {
                  const item = oddsMap[mapKey(second, third)];

                  return (
                    <td className={styles.td} key={second} width="auto">
                      {second !== third ? (
                        isRaceClosed ? (
                          <div className={styles.inactiveBaseButton}>
                            <OddsMarker odds={item.odds} />
                          </div>
                        ) : (
                          <BuyButton item={item}>
                            <OddsMarker odds={item.odds} />
                          </BuyButton>
                        )
                      ) : (
                        <button className={styles.buyButton} disabled>
                          -
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
