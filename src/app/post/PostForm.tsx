"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CATEGORIES, US_STATES, CONDITIONS, type CategoryId } from "@/lib/data";
import { Breadcrumb } from "@/components/Breadcrumb";
import { getT } from "@/lib/translations";

const inputClass = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
const labelClass = "block text-sm font-medium text-foreground";

export function PostForm({ lang }: { lang: string }) {
  const t = getT(lang);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState<CategoryId | "">("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [truckYear, setTruckYear] = useState("");
  const [truckMake, setTruckMake] = useState("");
  const [truckModel, setTruckModel] = useState("");
  const [truckEngine, setTruckEngine] = useState("");
  const [truckHp, setTruckHp] = useState("");
  const [truckTrans, setTruckTrans] = useState("");
  const [truckMileage, setTruckMileage] = useState("");
  const [truckSleeper, setTruckSleeper] = useState(false);
  const [truckAxles, setTruckAxles] = useState("");
  const [truckCondition, setTruckCondition] = useState("");
  const [truckVin, setTruckVin] = useState("");
  const [truckCleanTitle, setTruckCleanTitle] = useState(false);
  const [trailerType, setTrailerType] = useState("");
  const [trailerLength, setTrailerLength] = useState("");
  const [trailerAxles, setTrailerAxles] = useState("");
  const [trailerSuspension, setTrailerSuspension] = useState("");
  const [trailerCondition, setTrailerCondition] = useState("");
  const [equipBrand, setEquipBrand] = useState("");
  const [equipModel, setEquipModel] = useState("");
  const [equipYear, setEquipYear] = useState("");
  const [equipHours, setEquipHours] = useState("");
  const [equipCondition, setEquipCondition] = useState("");
  const [partsCategory, setPartsCategory] = useState("");
  const [partsCompatible, setPartsCompatible] = useState("");
  const [partsCondition, setPartsCondition] = useState("");
  const [freightArea, setFreightArea] = useState("");
  const [freightEquipType, setFreightEquipType] = useState("");
  const [freightInsurance, setFreightInsurance] = useState("");
  const [freightMcDot, setFreightMcDot] = useState("");
  const [freightAvailability, setFreightAvailability] = useState("");
  const [driverLicense, setDriverLicense] = useState("");
  const [driverExperience, setDriverExperience] = useState("");
  const [driverAvailability, setDriverAvailability] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          category: category || undefined,
          price: price ? Number(price) : 0,
          location: { state, city },
          description: description.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          images: [],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) {
        setSubmitError("You must sign in to post a listing.");
        setSubmitting(false);
        return;
      }
      if (!res.ok) {
        setSubmitError(data.error ?? "Could not create listing. Try again.");
        setSubmitting(false);
        return;
      }
      router.push(`/${lang}/listings`);
      router.refresh();
    } catch {
      setSubmitError("Something went wrong. Try again.");
      setSubmitting(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Breadcrumb items={[{ label: t.listing.home, href: `/${lang}` }, { label: t.nav.post }]} />
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-12 text-center text-secondary">Loading…</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <Breadcrumb items={[{ label: t.listing.home, href: `/${lang}` }, { label: t.nav.post }]} />
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-bold text-foreground">Post a listing</h1>
          <p className="mt-4 text-foreground">You must sign in to post a listing.</p>
          <Link href={`/${lang}/signin?callbackUrl=/${encodeURIComponent(lang)}/post`} className="mt-6 inline-block rounded-lg bg-cta px-6 py-3 font-medium text-white hover:bg-cta-hover">Sign in</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Breadcrumb items={[{ label: t.listing.home, href: `/${lang}` }, { label: t.nav.post }]} />
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-foreground">Create a listing</h1>
        <p className="mt-1 text-secondary">No payments on the platform. US-focused marketplace. All fields below are required unless marked optional.</p>
        {submitError && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{submitError}</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="category" className={labelClass}>Category</label>
            <select id="category" required value={category} onChange={(e) => setCategory(e.target.value as CategoryId | "")} className={inputClass}>
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="title" className={labelClass}>Title</label>
            <input id="title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="e.g. 2019 Kenworth T680" />
          </div>
          <div>
            <label htmlFor="description" className={labelClass}>Description</label>
            <textarea id="description" required rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className={inputClass} placeholder="Describe your item or service..." />
          </div>
          <div>
            <label htmlFor="price" className={labelClass}>Price (USD)</label>
            <input id="price" type="number" min={0} value={price} onChange={(e) => setPrice(e.target.value)} className={inputClass} placeholder="0" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="state" className={labelClass}>State</label>
              <select id="state" required value={state} onChange={(e) => setState(e.target.value)} className={inputClass}>
                <option value="">Select state</option>
                {US_STATES.map((s) => <option key={s.code} value={s.code}>{s.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="city" className={labelClass}>City</label>
              <input id="city" type="text" required value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} placeholder="e.g. Dallas" />
            </div>
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="your@email.com" />
            <p className="mt-1 text-xs text-secondary">Never share verification codes or passwords with buyers or sellers.</p>
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Phone (optional)</label>
            <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} placeholder="Optional" />
          </div>
          {category === "trucks" && (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold text-foreground">Truck details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Year</label><input type="number" min={1900} max={2030} value={truckYear} onChange={(e) => setTruckYear(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Make</label><input type="text" value={truckMake} onChange={(e) => setTruckMake(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Model</label><input type="text" value={truckModel} onChange={(e) => setTruckModel(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Engine</label><input type="text" value={truckEngine} onChange={(e) => setTruckEngine(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Horsepower</label><input type="number" min={0} value={truckHp} onChange={(e) => setTruckHp(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Transmission</label><input type="text" value={truckTrans} onChange={(e) => setTruckTrans(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Mileage</label><input type="number" min={0} value={truckMileage} onChange={(e) => setTruckMileage(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Axles</label><input type="text" value={truckAxles} onChange={(e) => setTruckAxles(e.target.value)} className={inputClass} placeholder="6x4" /></div>
              </div>
              <div className="flex gap-6">
                <label className="flex items-center gap-2"><input type="checkbox" checked={truckSleeper} onChange={(e) => setTruckSleeper(e.target.checked)} /><span className="text-sm">Sleeper</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={truckCleanTitle} onChange={(e) => setTruckCleanTitle(e.target.checked)} /><span className="text-sm">Clean title</span></label>
              </div>
              <div><label className={labelClass}>Condition</label><select value={truckCondition} onChange={(e) => setTruckCondition(e.target.value)} className={inputClass}><option value="">Select</option>{CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className={labelClass}>VIN (optional)</label><input type="text" value={truckVin} onChange={(e) => setTruckVin(e.target.value)} className={inputClass} /></div>
            </div>
          )}
          {category === "trailers" && (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold text-foreground">Trailer details</h3>
              <div><label className={labelClass}>Type</label><input type="text" value={trailerType} onChange={(e) => setTrailerType(e.target.value)} className={inputClass} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Length</label><input type="text" value={trailerLength} onChange={(e) => setTrailerLength(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Axles</label><input type="text" value={trailerAxles} onChange={(e) => setTrailerAxles(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Suspension</label><input type="text" value={trailerSuspension} onChange={(e) => setTrailerSuspension(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Condition</label><select value={trailerCondition} onChange={(e) => setTrailerCondition(e.target.value)} className={inputClass}><option value="">Select</option>{CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              </div>
            </div>
          )}
          {category === "equipment" && (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold text-foreground">Equipment details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={labelClass}>Brand</label><input type="text" value={equipBrand} onChange={(e) => setEquipBrand(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Model</label><input type="text" value={equipModel} onChange={(e) => setEquipModel(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Year</label><input type="number" min={1900} value={equipYear} onChange={(e) => setEquipYear(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Hours</label><input type="number" min={0} value={equipHours} onChange={(e) => setEquipHours(e.target.value)} className={inputClass} /></div>
                <div><label className={labelClass}>Condition</label><select value={equipCondition} onChange={(e) => setEquipCondition(e.target.value)} className={inputClass}><option value="">Select</option>{CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
              </div>
            </div>
          )}
          {category === "parts" && (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold text-foreground">Parts details</h3>
              <div><label className={labelClass}>Category</label><input type="text" value={partsCategory} onChange={(e) => setPartsCategory(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Compatible models</label><input type="text" value={partsCompatible} onChange={(e) => setPartsCompatible(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Condition</label><select value={partsCondition} onChange={(e) => setPartsCondition(e.target.value)} className={inputClass}><option value="">Select</option>{CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
            </div>
          )}
          {category === "freight-services" && (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold text-foreground">Freight service details</h3>
              <div><label className={labelClass}>Service area</label><input type="text" value={freightArea} onChange={(e) => setFreightArea(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Equipment type</label><input type="text" value={freightEquipType} onChange={(e) => setFreightEquipType(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Insurance</label><input type="text" value={freightInsurance} onChange={(e) => setFreightInsurance(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>MC/DOT (optional)</label><input type="text" value={freightMcDot} onChange={(e) => setFreightMcDot(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Availability</label><input type="text" value={freightAvailability} onChange={(e) => setFreightAvailability(e.target.value)} className={inputClass} /></div>
            </div>
          )}
          {category === "drivers" && (
            <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-semibold text-foreground">Driver details</h3>
              <div><label className={labelClass}>License type</label><input type="text" value={driverLicense} onChange={(e) => setDriverLicense(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Experience</label><input type="text" value={driverExperience} onChange={(e) => setDriverExperience(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Availability</label><input type="text" value={driverAvailability} onChange={(e) => setDriverAvailability(e.target.value)} className={inputClass} /></div>
            </div>
          )}
          <div>
            <label className={labelClass}>Images</label>
            <input type="file" accept="image/*" multiple className="mt-1 block w-full text-sm text-secondary file:rounded-lg file:border-0 file:bg-cta file:px-4 file:py-2 file:text-white file:hover:bg-cta-hover" />
          </div>
          {(title || description || price || city) && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="text-sm font-semibold text-foreground">Preview</h3>
              <p className="mt-2 text-xs text-secondary">How your listing may appear (no backend).</p>
              <div className="mt-3 space-y-1 text-sm">
                {category && <p><span className="text-secondary">Category:</span> {CATEGORIES.find((c) => c.id === category)?.label ?? category}</p>}
                {title && <p><span className="text-secondary">Title:</span> {title}</p>}
                {price !== "" && <p><span className="text-secondary">Price:</span> {price ? `$${price}` : "Contact for price"}</p>}
                {(city || state) && <p><span className="text-secondary">Location:</span> {[city, US_STATES.find((s) => s.code === state)?.name].filter(Boolean).join(", ")}</p>}
              </div>
            </div>
          )}
          <button type="submit" disabled={submitting} className="w-full rounded-xl bg-cta py-3.5 text-base font-semibold text-white shadow-md hover:bg-cta-hover focus:outline-none focus:ring-2 focus:ring-cta focus:ring-offset-2 disabled:opacity-70">{submitting ? "Submitting…" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}
