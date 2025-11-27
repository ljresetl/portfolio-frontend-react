import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./CurrencyTicker.module.scss";
import { FaDollarSign, FaEuroSign, FaPoundSign } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { SiPolkadot } from "react-icons/si";

interface CurrencyRate {
  code: string;
  rateCZKPerUnit: number;
}

const CurrencyTicker: React.FC = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);

  const currencyIcon = (code: string) => {
    if (code === "EUR") return <FaEuroSign size={20} color="#2563eb" />;
    if (code === "USD") return <FaDollarSign size={20} color="#16a34a" />;
    if (code === "UAH") return <GiMoneyStack size={20} color="#f59e0b" />;
    if (code === "GBP") return <FaPoundSign size={20} color="#9333ea" />;
    if (code === "PLN") return <SiPolkadot size={20} color="#ef4444" />;
    return <FaDollarSign size={20} color="#64748b" />;
  };

  const getRates = useCallback(async () => {
    try {
      const frankfurterUrl = `https://api.frankfurter.app/latest?from=CZK&to=EUR,USD,GBP,PLN`;
      const uahUrl = `https://api.exchangerate.host/latest?base=UAH&symbols=CZK`;

      const [frankfurterRes, uahRes] = await Promise.all([
        axios.get(frankfurterUrl),
        axios.get(uahUrl),
      ]);

      const ratesData = frankfurterRes.data?.rates;
      const uahRate = uahRes.data?.rates?.CZK;

      const data: CurrencyRate[] = [];

      if (ratesData) {
        for (const [code, rate] of Object.entries(ratesData)) {
          data.push({ code, rateCZKPerUnit: 1 / (rate as number) });
        }
      }

      if (uahRate) {
        data.push({ code: "UAH", rateCZKPerUnit: uahRate });
      }

      const order = ["EUR", "USD", "UAH", "GBP", "PLN"];
      data.sort((a, b) => order.indexOf(a.code) - order.indexOf(b.code));

      setRates(data);
    } catch (error) {
      console.error("Помилка завантаження курсів:", error);
      setRates([{ code: "ERR", rateCZKPerUnit: 0 }]);
    }
  }, []);

  useEffect(() => {
    getRates();
  }, [getRates]);

  return (
    <div className={styles.tickerWrapper}>
      <div className={styles.ticker}>
        <div className={styles.tickerContent}>
          <span className={styles.cityLabel}>Exchange Rates (CZK per 1 unit)</span>
          {rates.map((r, idx) => (
            <span key={idx} className={styles.dayChip}>
              {currencyIcon(r.code)}
              <span className={styles.dayText}>
                {r.code === "ERR"
                  ? "Помилка завантаження"
                  : `1 ${r.code} = ${r.rateCZKPerUnit.toFixed(
                      r.code === "UAH" || r.code === "PLN" ? 3 : 2
                    )} CZK`}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrencyTicker;
