// ToggleGroup.tsx
import { useState } from "react";
import Toggle from "../components/Toggle";

interface Props {
    options?: string[];
}

function ToggleGroup(props: Props) {
    const {options=["1Y", "5Y", "10Y", "MAX"]} = props;
    const [selected, setSelected] = useState<string>("1Y");


    return (
        <div style={{ display: "flex", gap: "8px" }}>
            {options.map((label) => (
                <Toggle
                    key={label}
                    text={label}
                    checked={selected === label}
                    onChange={() => setSelected(label)}
                />
            ))}
        </div>
    );
}

export default ToggleGroup;
