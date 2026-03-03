"use client";

export function ReportButton() {
  return (
    <button
      type="button"
      className="text-sm text-secondary hover:text-foreground underline"
      onClick={() => alert("Report submitted. Thank you.")}
    >
      Report listing
    </button>
  );
}
