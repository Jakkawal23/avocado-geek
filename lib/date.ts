// Thai month names with a Gregorian (ค.ศ.) year — the "th-TH" locale defaults
// to the Buddhist calendar, so this explicitly forces Gregorian throughout
// the site (all stored dates are already plain Gregorian ISO strings).
export function formatThaiDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("th-TH-u-ca-gregory", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
