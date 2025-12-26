import * as React from "react";
import { Input } from "@/shared/ui/shadcn/input";

type MoneyInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange"
> & {
  value: string;
  onChange: (value: string) => void;
};

function normalize(raw: string) {
  // allow digits + one dot, remove spaces, convert comma->dot
  let s = raw.replace(/\s|\u00A0/g, "").replace(",", ".");
  // keep only digits and dot
  s = s.replace(/[^0-9.]/g, "");

  // allow only first dot
  const firstDot = s.indexOf(".");
  if (firstDot !== -1) {
    const before = s.slice(0, firstDot);
    const after = s.slice(firstDot + 1).replace(/\./g, ""); // remove extra dots
    s = before + "." + after;
  }

  // limit decimals to 2 if dot exists
  const [intPart, decPart] = s.split(".");
  if (s.includes(".")) {
    return intPart + "." + (decPart ?? "").slice(0, 2);
  }

  return intPart;
}

function formatWithSpaces(normalized: string) {
  if (!normalized) return "";

  const hasDot = normalized.includes(".");
  const [intPartRaw, decPartRaw] = normalized.split(".");

  // remove leading zeros but keep single zero if needed
  let intPart = intPartRaw.replace(/^0+(?=\d)/, "");
  if (intPart === "") intPart = "0";

  // group by 3 with spaces
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // show decimals only if user typed dot
  if (!hasDot) return grouped;

  // if user typed dot but no decimals yet, keep dot visible
  if (decPartRaw === undefined || decPartRaw === "") return grouped + ".";

  return grouped + "." + decPartRaw;
}

// find caret position in formatted string that matches digits count
function caretFromDigitsCount(formatted: string, digitsCount: number) {
  if (digitsCount <= 0) return 0;

  let count = 0;
  for (let i = 0; i < formatted.length; i++) {
    const ch = formatted[i];
    if (ch >= "0" && ch <= "9") {
      count++;
      if (count === digitsCount) return i + 1;
    }
  }
  return formatted.length;
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const innerRef = React.useRef<HTMLInputElement | null>(null);

    // merge refs
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const el = e.target;
      const raw = el.value;
      const caret = el.selectionStart ?? raw.length;

      const normalizedAll = normalize(raw);
      const normalizedBeforeCaret = normalize(raw.slice(0, caret));

      // nechta raqam caret'dan oldin turibdi (dot hisobga olinmaydi)
      const digitsCnt = (normalizedBeforeCaret.match(/\d/g) || []).length;

      // caret dot'dan keyin bo'lishi kerakmi?
      const dotBeforeCaret = normalizedBeforeCaret.includes(".");

      const formatted = formatWithSpaces(normalizedAll);

      onChange(formatted);

      requestAnimationFrame(() => {
        const input = innerRef.current;
        if (!input) return;

        let newCaret = caretFromDigitsCount(formatted, digitsCnt);

        // ✅ agar user '.' yozgan bo'lsa, caret nuqtadan keyinda tursin
        if (dotBeforeCaret) {
          const dotIndex = formatted.indexOf(".");
          if (dotIndex !== -1) {
            newCaret = Math.max(newCaret, dotIndex + 1);
          }
        }

        input.setSelectionRange(newCaret, newCaret);
      });
    };

    return (
      <Input
        ref={innerRef}
        inputMode="decimal"
        placeholder="0"
        value={value}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";
