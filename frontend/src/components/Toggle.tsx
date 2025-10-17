// src/components/Toggle.tsx
import { forwardRef, useState, useId } from "react";
import styles from "../styles/Toggle.module.scss";

interface ToggleProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (v: boolean) => void;
    disabled?: boolean;
    ariaLabel?: string;
    text?: string;
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
    { checked, defaultChecked, onChange, disabled, ariaLabel, text, ...rest },
    ref
) {
    const id = useId();
    const isControlled = typeof checked === "boolean";
    const [inner, setInner] = useState(defaultChecked ?? false);
    const on = isControlled ? (checked as boolean) : inner;

    return (
        <button
            id={id}
            type="button"
            role="switch"
            aria-checked={on}
            aria-label={ariaLabel}
            aria-disabled={disabled || undefined}
            className={`${styles.toggle} ${on ? styles.on : styles.off}`}
            disabled={disabled}
            onClick={() => {
                if (disabled) return;
                if (!isControlled) setInner(!on);
                onChange?.(!on);
            }}
            ref={ref}
            {...rest}
        >
            {text ? text : ""}
        </button>
    );
});

export default Toggle;
