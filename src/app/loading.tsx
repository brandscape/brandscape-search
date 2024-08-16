interface Props {
  isFullHeight?: boolean;
}
export default function Loading({ isFullHeight = false }: Props) {
  return isFullHeight ? (
    <main className={`w-full relative flex items-center justify-center min-h-screen`}>
      <span className="loader"></span>
    </main>
  ) : (
    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
      <span className="loader"></span>
    </div>
  );
}
