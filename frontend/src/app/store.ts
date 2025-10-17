// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import exchangeReducer from "../features/exchange.slice";
import grainsReducer from "../features/grains.slice";
import commoditiesReducer from "../features/commodities.slice";
import stockReducer from "../features/stock.slice";
import sentimentReducer from "../features/sentiment.slice";
import exportImportReucer from "../features/exportImport.slice"

export const store = configureStore({
    reducer: {
        exchange: exchangeReducer,
        grains: grainsReducer,
        commodities: commoditiesReducer,
        stock: stockReducer,
        sentiment: sentimentReducer,
        exportImport: exportImportReucer
    },
    // middleware: (getDefault) => getDefault().concat(myMiddleware)  // 필요 시
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


