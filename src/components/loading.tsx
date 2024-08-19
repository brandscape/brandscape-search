interface Props {
  label?: React.ReactNode;
}

export default function Loading({ label }: Props) {
  return (
    <div className="w-full h-full absolute top-0 left-0 flex flex-col flex-nowrap items-center justify-center gap-2">
      <span className="loader"></span>
      {label && (
        <div className="text-[--color-text-assistive] text-sm tracking-tighter text-center">
          {label}
        </div>
      )}
    </div>
  );
}
