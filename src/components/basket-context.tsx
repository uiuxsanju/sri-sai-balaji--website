"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type BasketLine = {
  /** product slug */
  slug: string;
  name: string;
  teluguName: string;
  size: string;
  quantity: number;
  image: string | null;
};

type BasketValue = {
  lines: BasketLine[];
  count: number;
  add: (line: Omit<BasketLine, "quantity"> & { quantity?: number }) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  ready: boolean;
};

const STORAGE_KEY = "ssbn-basket-v1";
const BasketContext = createContext<BasketValue | null>(null);

const keyOf = (slug: string, size: string) => `${slug}__${size}`;

export function BasketProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BasketLine[]>([]);
  const [ready, setReady] = useState(false);

  // Restore on first mount. Wrapped in try/catch: storage can be unavailable in
  // private windows or when site data is blocked.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setLines(parsed as BasketLine[]);
      }
    } catch {
      // ignore — the basket just starts empty
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines, ready]);

  const add = useCallback<BasketValue["add"]>((line) => {
    const quantity = line.quantity ?? 1;
    setLines((prev) => {
      const i = prev.findIndex(
        (l) => keyOf(l.slug, l.size) === keyOf(line.slug, line.size),
      );
      if (i === -1) return [...prev, { ...line, quantity }];
      const next = [...prev];
      next[i] = {
        ...next[i]!,
        quantity: Math.min(99, next[i]!.quantity + quantity),
      };
      return next;
    });
  }, []);

  const setQuantity = useCallback<BasketValue["setQuantity"]>(
    (slug, size, quantity) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => keyOf(l.slug, l.size) !== keyOf(slug, size))
          : prev.map((l) =>
              keyOf(l.slug, l.size) === keyOf(slug, size)
                ? { ...l, quantity: Math.min(99, quantity) }
                : l,
            ),
      );
    },
    [],
  );

  const remove = useCallback<BasketValue["remove"]>((slug, size) => {
    setLines((prev) =>
      prev.filter((l) => keyOf(l.slug, l.size) !== keyOf(slug, size)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<BasketValue>(
    () => ({
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      add,
      setQuantity,
      remove,
      clear,
      ready,
    }),
    [lines, add, setQuantity, remove, clear, ready],
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
}

export function useBasket(): BasketValue {
  const ctx = useContext(BasketContext);
  if (!ctx) throw new Error("useBasket must be used inside <BasketProvider>");
  return ctx;
}
