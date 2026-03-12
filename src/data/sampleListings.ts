/**
 * Sample freight and truck listings for platform demonstration.
 * Every listing includes: "Sample listing for marketplace demonstration."
 * No real companies. Data only for demo purposes.
 */

import type { Listing } from "@/lib/data";
import { US_STATES, TRAILER_TYPES } from "@/lib/data";

const SAMPLE_DISCLAIMER = "Sample listing for marketplace demonstration.";

// Cities per state (real US cities, used only for demo variety)
const CITIES_BY_STATE: Record<string, string[]> = {
  AL: ["Birmingham", "Montgomery", "Huntsville"],
  AK: ["Anchorage", "Fairbanks"],
  AZ: ["Phoenix", "Tucson", "Mesa", "Scottsdale"],
  AR: ["Little Rock", "Fort Smith", "Fayetteville"],
  CA: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "Fresno", "San Jose", "Bakersfield"],
  CO: ["Denver", "Colorado Springs", "Aurora", "Fort Collins"],
  CT: ["Hartford", "New Haven", "Stamford", "Bridgeport"],
  DE: ["Wilmington", "Dover", "Newark"],
  FL: ["Miami", "Jacksonville", "Tampa", "Orlando", "Fort Lauderdale", "Tallahassee"],
  GA: ["Atlanta", "Augusta", "Columbus", "Savannah", "Macon"],
  HI: ["Honolulu", "Pearl City", "Hilo"],
  ID: ["Boise", "Idaho Falls", "Meridian"],
  IL: ["Chicago", "Springfield", "Naperville", "Peoria", "Rockford", "Joliet"],
  IN: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Gary"],
  IA: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
  KS: ["Wichita", "Kansas City", "Overland Park", "Olathe", "Topeka"],
  KY: ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
  LA: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
  ME: ["Portland", "Lewiston", "Bangor"],
  MD: ["Baltimore", "Frederick", "Rockville", "Gaithersburg"],
  MA: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
  MI: ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing", "Flint", "Dearborn"],
  MN: ["Minneapolis", "Saint Paul", "Rochester", "Duluth", "Bloomington"],
  MS: ["Jackson", "Gulfport", "Southaven", "Hattiesburg"],
  MO: ["Kansas City", "Saint Louis", "Springfield", "Columbia", "Independence"],
  MT: ["Billings", "Missoula", "Great Falls", "Bozeman"],
  NE: ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
  NV: ["Las Vegas", "Reno", "Henderson", "North Las Vegas"],
  NH: ["Manchester", "Nashua", "Concord"],
  NJ: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison", "Woodbridge"],
  NM: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe"],
  NY: ["New York", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "Brooklyn"],
  NC: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville"],
  ND: ["Fargo", "Bismarck", "Grand Forks", "Minot"],
  OH: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton"],
  OK: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond"],
  OR: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro"],
  PA: ["Philadelphia", "Pittsburgh", "Allentown", "Reading", "Scranton", "Harrisburg"],
  RI: ["Providence", "Warwick", "Cranston", "Pawtucket"],
  SC: ["Columbia", "Charleston", "North Charleston", "Mount Pleasant", "Rock Hill"],
  SD: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"],
  TN: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
  TX: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington", "Corpus Christi", "Lubbock", "Laredo"],
  UT: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem"],
  VT: ["Burlington", "South Burlington", "Rutland", "Essex"],
  VA: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Arlington", "Newport News"],
  WA: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue", "Kent", "Everett"],
  WV: ["Charleston", "Huntington", "Morgantown", "Parkersburg"],
  WI: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine", "Appleton"],
  WY: ["Cheyenne", "Casper", "Laramie", "Gillette"],
};

const TRUCK_MAKES = ["Freightliner", "Kenworth", "Peterbilt", "Volvo", "International", "Mack"] as const;
const TRUCK_MODELS: Record<string, string[]> = {
  Freightliner: ["Cascadia", "Coronado", "Columbia", "M2 106", "Business Class M2"],
  Kenworth: ["T680", "T880", "W990", "T800", "T370"],
  Peterbilt: ["579", "567", "389", "520", "348"],
  Volvo: ["VNL 760", "VNL 640", "VNR", "VHD"],
  International: ["LT", "Lonestar", "Pro Star", "RH", "HV"],
  Mack: ["Anthem", "Pinnacle", "Granite", "TerraPro"],
};
const ENGINE_OPTIONS = ["Detroit DD15", "PACCAR MX-13", "Cummins X15", "Detroit DD13", "PACCAR MX-11", "Cummins ISX15"];

function pick<T>(arr: readonly T[] | T[], index: number): T {
  return arr[index % arr.length];
}

function pickCity(stateCode: string, index: number): string {
  const cities = CITIES_BY_STATE[stateCode] ?? [stateCode];
  return cities[index % cities.length];
}

export function generateSampleFreightListings(): Listing[] {
  const listings: Listing[] = [];
  const stateCodes = US_STATES.map((s) => s.code);
  for (let i = 0; i < 300; i++) {
    const originStateIdx = i % stateCodes.length;
    const destStateIdx = (i * 11 + 7) % stateCodes.length;
    const originState = stateCodes[originStateIdx];
    const destState = stateCodes[destStateIdx];
    const originCity = pickCity(originState, i);
    const destCity = pickCity(destState, i + 100);
    const trailerType = pick(TRAILER_TYPES, i);
    const weightLbs = 5000 + (i * 137) % (45000 - 5000 + 1);
    const rateUSD = 400 + (i * 13) % (4200 - 400 + 1);
    const daysAhead = (i % 30) + 1;
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + daysAhead);
    const pickupStr = pickupDate.toISOString().slice(0, 10);
    const title = `${trailerType} Load – ${originCity}, ${originState} to ${destCity}, ${destState}`;
    listings.push({
      id: `freight-${i + 1}`,
      category: "freight-services",
      title,
      description: `${SAMPLE_DISCLAIMER}\n\n${trailerType} load. ${weightLbs.toLocaleString()} lbs. Pickup ${pickupStr}. Available for qualified carriers.`,
      price: rateUSD,
      state: originState,
      city: originCity,
      email: "info@imbatruck.com",
      imageUrls: [`/images/freight/${i + 1}.jpg`],
      featured: i % 17 === 0,
      sold: false,
      isSample: true,
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      specs: {
        originCity,
        originState,
        destinationCity: destCity,
        destinationState: destState,
        trailerType,
        weightLbs,
        pickupDate: pickupStr,
      },
    });
  }
  return listings;
}

export function generateSampleTruckListings(): Listing[] {
  const listings: Listing[] = [];
  const stateCodes = US_STATES.map((s) => s.code);
  for (let i = 0; i < 120; i++) {
    const make = pick(TRUCK_MAKES, i);
    const models = TRUCK_MODELS[make] ?? ["Model"];
    const model = pick(models, i);
    const year = 2014 + (i % 10);
    const mileageMiles = 150000 + (i * 5837) % (850000 - 150000 + 1);
    const priceUSD = 28000 + (i * 891) % (135000 - 28000 + 1);
    const stateCode = pick(stateCodes, i * 3);
    const city = pickCity(stateCode, i + 50);
    const engine = pick(ENGINE_OPTIONS, i);
    const title = `${year} ${make} ${model}`;
    listings.push({
      id: `truck-${i + 1}`,
      category: "trucks",
      title,
      description: `${SAMPLE_DISCLAIMER}\n\n${year} ${make} ${model}. ${(mileageMiles / 1000).toFixed(0)}k miles. ${engine}. Well maintained.`,
      price: priceUSD,
      state: stateCode,
      city,
      email: "info@imbatruck.com",
      imageUrls: [`/images/trucks/${i + 1}.jpg`],
      featured: i % 12 === 0,
      sold: false,
      isSample: true,
      createdAt: new Date(Date.now() - (i + 300) * 3600000).toISOString(),
      specs: {
        year,
        make,
        model,
        mileage: mileageMiles,
        engine,
        transmission: i % 2 === 0 ? "Automatic" : "Manual",
        condition: i % 3 === 0 ? "Excellent" : i % 3 === 1 ? "Good" : "Fair",
      },
    });
  }
  return listings;
}

export function getAllSampleListings(): Listing[] {
  return [...generateSampleFreightListings(), ...generateSampleTruckListings()];
}
