export interface ExchangeRate {
    date: string;    
    usd: number;
    eur: number;
    jpy: number;
}

export interface FetchRangeParams {
    start: string; 
    end: string;   
}
