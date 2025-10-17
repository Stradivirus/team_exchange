// src/components/common/SelectRadix/SelectRadix.tsx
import React from "react";
import * as Select from "@radix-ui/react-select";
import styles from "../styles/Select.module.scss";
import type { Option } from "../types/option";

// (선택) 아이콘: lucide-react 없으면 inline SVG 사용해도 됩니다.
import { ChevronDown, ChevronUp, Check } from "lucide-react";

export interface SelectRadixProps {
    options: Option[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    /** 트리거 너비 (기본 auto). 예: 200, "240px", "100%" */
    width?: number | string;
}

const SelectRadix: React.FC<SelectRadixProps> = ({
    options,
    value,
    defaultValue,
    onChange,
    placeholder = "Select…",
    disabled,
    className,
    width,
}) => {
    return (
        <Select.Root value={value} defaultValue={defaultValue} onValueChange={onChange} disabled={disabled}>
            <Select.Trigger
                className={`${styles.trigger} ${className ?? ""}`}
                aria-label="Select"
                style={{ width }}
            >
                <Select.Value placeholder={placeholder} />
                <Select.Icon className={styles.chevron}>
                    <ChevronDown size={16} />
                </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
                <Select.Content className={styles.content} position="popper" sideOffset={6}>
                    <Select.ScrollUpButton className={styles.scrollBtn}>
                        <ChevronUp size={16} />
                    </Select.ScrollUpButton>

                    <Select.Viewport className={styles.viewport}>
                        {/* 그룹 없이 단순 옵션 목록 */}
                        {options.map((opt) => (
                            <Select.Item key={opt.value} value={opt.value} className={styles.item}>
                                <Select.ItemText>{opt.label}</Select.ItemText>
                                <Select.ItemIndicator className={styles.indicator}>
                                    <Check size={14} />
                                </Select.ItemIndicator>
                            </Select.Item>
                        ))}
                    </Select.Viewport>

                    <Select.ScrollDownButton className={styles.scrollBtn}>
                        <ChevronDown size={16} />
                    </Select.ScrollDownButton>
                </Select.Content>
            </Select.Portal>
        </Select.Root>
    );
};

export default SelectRadix;
