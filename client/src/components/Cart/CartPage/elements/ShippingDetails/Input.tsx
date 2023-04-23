import classnames from "classnames";
import { useState, useRef, useEffect } from "react";

interface Props {
  onChange: (...args: any[]) => void;
  inputName: string;
  width: string;
  label: string;
  value: string;
  type?: string;
}
//transform: translateY(26px);
export const Input: React.FC<Props> = ({
  onChange,
  inputName,
  width,
  label,
  value,
  type,
}) => {
  const [shouldLabelFloat, setLabelFloat] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const labelClass = classnames({
    label: true,
    float: shouldLabelFloat,
  });
  useEffect(() => {
    value && setLabelFloat(true);
  });
  const makeLabelFloat = () => {
    setLabelFloat(true);
    inputRef.current?.focus();
  };
  const onBlur = () => {
    !value && setLabelFloat(false);
  };

  return (
    <>
      <div style={{ width: `${width}` }} className="inputArea">
        <div onClick={makeLabelFloat} className={labelClass}>
          {label}
        </div>
        <input
          onFocus={makeLabelFloat}
          onClick={makeLabelFloat}
          style={value ? { backgroundColor: "white" } : {}}
          ref={inputRef}
          onBlur={onBlur}
          type={type ? type : "text"}
          name={inputName}
          onChange={onChange}
        />
      </div>
    </>
  );
};
