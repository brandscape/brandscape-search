interface Props {
  text: string;
  placement: "top" | "bottom";
}

export default function Tooltip({ text, placement }: Props) {
  return (
    <div
      className={`tooltip inline-flex justify-center p-2 rounded-md shadow-lg bg-black text-white text-xs font-bold whitespace-nowrap ${
        placement === "bottom" ? "tooltip-bottom" : "tooltip-top"
      }`}
    >
      <span>{text}</span>
      <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.04114 7.91128L1.11509 2.37455C0.483388 1.48368 1.12039 0.251099 2.21249 0.251099H9.86325C10.9403 0.251099 11.5806 1.45366 10.9795 2.3473L7.25476 7.88404C6.7295 8.66483 5.58546 8.67891 5.04114 7.91128Z"
          fill="black"
          stroke="black"
          strokeWidth="0.336323"
        />
      </svg>
    </div>
  );
}
