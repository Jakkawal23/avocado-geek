import { redirect } from "next/navigation";

// Guide browsing now lives inside the unified "ความรู้" (knowledge) page —
// this route only exists so old links to /guides still land somewhere.
// Individual guides still have their own page at /guides/[slug].
export default function GuidesIndexRedirect() {
  redirect("/articles");
}
