import { NextResponse } from "next/server";
import { getProductSuggestions } from "../../../../services/product-service";

export const dynamic = "force-dynamic";

const MIN_QUERY_LENGTH = 2;
const MAX_QUERY_LENGTH = 100;


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get("q") ?? "";
  const q = raw.trim().slice(0, MAX_QUERY_LENGTH);

  if (q.length < MIN_QUERY_LENGTH) {
    return NextResponse.json({ query: q, results: [] });
  }

  try {
    const results = getProductSuggestions(q);
    return NextResponse.json({ query: q, results });
  } catch {
    // No internal error detail leaked to the client.
    return NextResponse.json({ query: q, results: [] }, { status: 500 });
  }
}
