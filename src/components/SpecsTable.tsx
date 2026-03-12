import type { Listing, TruckSpecs, TrailerSpecs, EquipmentSpecs, PartsSpecs, FreightServiceSpecs, FreightLoadSpecs, DriverSpecs } from "@/lib/data";

function SpecRow({ label, value }: { label: string; value?: string | number | boolean }) {
  if (value === undefined || value === "") return null;
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
  return (
    <tr className="border-b border-gray-100">
      <td className="py-2 pr-4 text-secondary text-sm">{label}</td>
      <td className="py-2 font-medium text-foreground text-sm">{display}</td>
    </tr>
  );
}

export function SpecsTable({ listing }: { listing: Listing }) {
  const s = listing.specs;
  if (!s) return null;

  const rows: { label: string; value?: string | number | boolean }[] = [];

  if (listing.category === "trucks" && s && "year" in s) {
    const t = s as TruckSpecs;
    rows.push(
      { label: "Year", value: t.year },
      { label: "Make", value: t.make },
      { label: "Model", value: t.model },
      { label: "Engine", value: t.engine },
      { label: "Horsepower", value: t.horsepower },
      { label: "Transmission", value: t.transmission },
      { label: "Mileage", value: t.mileage != null ? `${(t.mileage / 1000).toFixed(0)}k mi` : undefined },
      { label: "Sleeper", value: t.sleeper },
      { label: "Axles", value: t.axles },
      { label: "Condition", value: t.condition },
      { label: "VIN", value: t.vin },
      { label: "Clean title", value: t.cleanTitle },
    );
  } else if (listing.category === "trailers" && s && "type" in s) {
    const t = s as TrailerSpecs;
    rows.push(
      { label: "Type", value: t.type },
      { label: "Length", value: t.length },
      { label: "Axles", value: t.axles },
      { label: "Suspension", value: t.suspension },
      { label: "Condition", value: t.condition },
    );
  } else if (listing.category === "equipment" && s && "brand" in s) {
    const e = s as EquipmentSpecs;
    rows.push(
      { label: "Brand", value: e.brand },
      { label: "Model", value: e.model },
      { label: "Year", value: e.year },
      { label: "Hours", value: e.hours },
      { label: "Condition", value: e.condition },
    );
  } else if (listing.category === "parts" && s && "category" in s) {
    const p = s as PartsSpecs;
    rows.push(
      { label: "Category", value: p.category },
      { label: "Compatible models", value: p.compatibleModels },
      { label: "Condition", value: p.condition },
    );
  } else if (listing.category === "freight-services" && s && "originCity" in s) {
    const f = s as FreightLoadSpecs;
    rows.push(
      { label: "Origin", value: f.originCity && f.originState ? `${f.originCity}, ${f.originState}` : undefined },
      { label: "Destination", value: f.destinationCity && f.destinationState ? `${f.destinationCity}, ${f.destinationState}` : undefined },
      { label: "Trailer type", value: f.trailerType },
      { label: "Weight (lbs)", value: f.weightLbs != null ? f.weightLbs.toLocaleString() : undefined },
      { label: "Pickup date", value: f.pickupDate },
    );
  } else if (listing.category === "freight-services" && s && "serviceArea" in s) {
    const f = s as FreightServiceSpecs;
    rows.push(
      { label: "Service area", value: f.serviceArea },
      { label: "Equipment type", value: f.equipmentType },
      { label: "Insurance", value: f.insurance },
      { label: "MC/DOT number", value: f.mcDotNumber },
      { label: "Availability", value: f.availability },
    );
  } else if (listing.category === "drivers" && s && "licenseType" in s) {
    const d = s as DriverSpecs;
    rows.push(
      { label: "License type", value: d.licenseType },
      { label: "Experience", value: d.experience },
      { label: "Availability", value: d.availability },
    );
  }

  const filled = rows.filter((r) => r.value !== undefined && r.value !== "");
  if (filled.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
      <table className="mt-2 w-full">
        <tbody>
          {filled.map((r, i) => (
            <SpecRow key={i} label={r.label} value={r.value} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
