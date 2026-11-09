"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import { Delete, Heart, Lightbulb, LockKeyhole } from "lucide-react";

export default function PasswordGate({
  children,
}: {
  children: ReactNode;
}) {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.trim()) {
      setIsUnlocked(true);
    }
  }

  if (isUnlocked) {
    return children;
  }

  return (
    <main className="relative flex h-[100dvh] w-full items-start justify-center overflow-y-auto bg-[#fffafb] px-5 py-8 text-[#243047]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,rgba(255,45,112,0.08),transparent_55%)]" />

      <section className="relative z-10 my-auto flex w-full max-w-[560px] flex-col items-center text-center">
        <div className="relative mb-6 h-[235px] w-[240px]">
          <div className="absolute inset-0 overflow-hidden rounded-[22px] border-2 border-rose-100 bg-rose-50 shadow-[0_12px_30px_rgba(30,41,59,0.12)]">
            <Image
              src="/bg2.jpg"
              alt="A birthday surprise"
              fill
              priority
              sizes="240px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10" />
          </div>
          <span className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#ff2670] text-white shadow-lg">
            <LockKeyhole size={22} aria-hidden="true" />
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          A Surprise for You <span aria-hidden="true">💕</span>
        </h1>
        <p className="mt-2 font-serif text-xl italic text-[#ff2670] sm:text-2xl">
          Do you wanna open your birthday surprise?
        </p>

        <form onSubmit={unlock} className="mt-7 w-full">
          <div className="mb-2 flex items-center justify-between text-left text-sm font-medium text-slate-700">
            <label
              htmlFor="birthday-password"
              className="flex items-center gap-2"
            >
              <LockKeyhole size={16} className="text-[#ff2670]" aria-hidden="true" />
              Enter Secret Birthday Password:
            </label>
            <button
              type="button"
              onClick={() => setShowHint((visible) => !visible)}
              className="flex items-center gap-1 text-[#ff2670] hover:text-pink-700"
              aria-expanded={showHint}
            >
              <Lightbulb size={15} aria-hidden="true" />
              Hint
            </button>
          </div>

          {showHint && (
            <p className="mb-3 text-sm text-slate-500">
              Any password will open your surprise.
            </p>
          )}

          <input
            id="birthday-password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Type any password"
            className="h-14 w-full rounded-2xl border-2 border-slate-200 bg-white px-4 text-center text-lg tracking-[0.3em] shadow-sm outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-100"
          />

          <div className="mx-auto mt-4 grid max-w-[300px] grid-cols-3 gap-2">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map(
              (key) => (
                <button
                  key={key}
                  type="button"
                  aria-label={
                    key === "C"
                      ? "Clear password"
                      : key === "⌫"
                        ? "Delete last character"
                        : `Add ${key}`
                  }
                  onClick={() =>
                    setPassword((current) =>
                      key === "C"
                        ? ""
                        : key === "⌫"
                          ? current.slice(0, -1)
                          : current + key,
                    )
                  }
                  className="flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-lg font-semibold text-slate-700 shadow-sm transition hover:border-pink-200 hover:bg-pink-50 active:scale-95"
                >
                  {key === "⌫" ? (
                    <Delete size={19} aria-hidden="true" />
                  ) : key === "C" ? (
                    "C"
                  ) : (
                    key
                  )}
                </button>
              ),
            )}
          </div>

          <button
            type="submit"
            disabled={!password.trim()}
            className="mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#ff2366] to-[#f12ca5] px-5 text-lg font-bold text-white shadow-lg shadow-pink-200 transition hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Heart size={20} fill="currentColor" aria-hidden="true" />
            YES! Open It!
          </button>
        </form>
      </section>
    </main>
  );
}
