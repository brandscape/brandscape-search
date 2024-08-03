"use client";

export default function Sub() {
  return (
    <main className="min-h-screen p-24">
      <div className="flex flex-col flex-nowrap">
        <span>Hello Sub Page</span>
        <input
          type="text"
          onChange={(e) => {
            console.log("value", e.target.value);
          }}
        />
      </div>
    </main>
  );
}
