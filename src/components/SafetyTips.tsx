export function SafetyTips() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      <h3 className="font-semibold text-amber-900">Safety tips</h3>
      <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-amber-800">
        <li>Meet in a safe, public place when possible.</li>
        <li>Do not wire money or pay in advance; avoid payment methods that cannot be traced.</li>
        <li>Verify the item in person (e.g. VIN, serial number) before paying.</li>
        <li>This is a classifieds platform; Imbatruck does not guarantee transactions.</li>
      </ul>
    </div>
  );
}
