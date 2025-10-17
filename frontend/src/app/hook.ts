import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// dispatch에 타입을 입힌 커스텀 hook
export const useAppDispatch: () => AppDispatch = useDispatch;

// selector에도 RootState 타입 지정
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
