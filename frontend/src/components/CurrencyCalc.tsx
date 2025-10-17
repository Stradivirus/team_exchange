import React, { useState, useMemo } from 'react';
import styles from '../styles/CurrencyCalculator.module.scss';
import { useAppSelector } from '../app/hook';
import { selectLatestExchange } from '../features/exchange.slice';

interface Currency {
  code: string;
  flag: string;
}

const currencies: Currency[] = [
  { code: 'USD', flag: '🇺🇸' },
  { code: 'KRW', flag: '🇰🇷' },
  { code: 'EUR', flag: '🇪🇺' },
  { code: 'JPY', flag: '🇯🇵' }
];

const CurrencyCalculator: React.FC = () => {
  const latest = useAppSelector(selectLatestExchange);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('KRW');
  const [fromAmount, setFromAmount] = useState<string>('1');

  // latest 데이터로 환율 맵 생성
  const exchangeRates = useMemo(() => {
    if (!latest) return {};
    
    // 각 통화의 KRW 대비 환율 (1 외화 = X KRW)
    const rates: Record<string, number> = {
      USD: latest.usd || 1,
      EUR: latest.eur || 1,
      JPY: latest.jpy / 100,
      KRW: 1
    };

    // 통화 간 교차 환율 계산
    const crossRates: Record<string, Record<string, number>> = {};
    
    Object.keys(rates).forEach(from => {
      crossRates[from] = {};
      Object.keys(rates).forEach(to => {
        if (from === to) {
          crossRates[from][to] = 1;
        } else if (from === 'KRW') {
          // KRW → 다른 통화: 1 / 해당 통화의 KRW 환율
          crossRates[from][to] = 1 / rates[to];
        } else if (to === 'KRW') {
          // 다른 통화 → KRW: 해당 통화의 KRW 환율
          crossRates[from][to] = rates[from];
        } else {
          // 다른 통화 간 교차 환율
          crossRates[from][to] = rates[from] / rates[to];
        }
      });
    });

    return crossRates;
  }, [latest]);

  const getCurrencyByCode = (code: string): Currency | undefined => {
    return currencies.find(c => c.code === code);
  };

  // 환율 계산 - useMemo로 자동 계산
  const toAmount = useMemo(() => {
    if (!fromAmount || isNaN(Number(fromAmount))) {
      return '0';
    }

    if (fromCurrency === toCurrency) {
      return parseFloat(fromAmount).toLocaleString();
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency] || 1;
    const convertedAmount = parseFloat(fromAmount) * rate;
    
    return convertedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }, [fromAmount, fromCurrency, toCurrency, exchangeRates]);

  return (
    <div className={styles.calculator}>
      {/* From Currency + Amount Input */}
      <div className={styles.row}>
        <div className={styles.currencySelect}>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className={`${styles.select} ${styles.selectPrimary}`}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          
          <div className={styles.flag}>
            {getCurrencyByCode(fromCurrency)?.flag}
          </div>
          
          <div className={`${styles.arrow} ${styles.arrowPrimary}`}>
            ▼
          </div>
        </div>

        <input
          type="number"
          value={fromAmount}
          onChange={(e) => setFromAmount(e.target.value)}
          className={styles.input}
        />
      </div>

      {/* To Currency + Result Display */}
      <div className={styles.row}>
        <div className={styles.currencySelect}>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className={`${styles.select} ${styles.selectSecondary}`}
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code}
              </option>
            ))}
          </select>
          
          <div className={styles.flag}>
            {getCurrencyByCode(toCurrency)?.flag}
          </div>
          
          <div className={`${styles.arrow} ${styles.arrowSecondary}`}>
            ▼
          </div>
        </div>

        <div className={styles.result}>
          {toAmount}
        </div>
      </div>
    </div>
  );
};

export default CurrencyCalculator;