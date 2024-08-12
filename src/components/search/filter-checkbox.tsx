"use client";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  text: string;
  checkedColor?: string;
}

export default function FilterCheckbox({
  id,
  name,
  checked,
  onChange,
  text,
  checkedColor = "bg-[--color-primary-normal]",
}: Props) {
  return (
    <div className="flex gap-2 items-center me-4">
      <input
        type="checkbox"
        id={id}
        name={name}
        defaultChecked={checked}
        onChange={onChange}
        className={`
        relative peer shrink-0 appearance-none w-4 h-4 border 
        border-[#E1E5EB] rounded bg-transparent 
        checked:bg-[--color-primary-normal] checked:border-0`}
      />
      <label
        htmlFor={id}
        className="select-none cursor-pointer text-sm tracking-tighter font-medium"
      >
        {text}
      </label>
      <svg
        className="absolute w-4 h-4 hidden peer-checked:block text-white p-0.5"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
}
