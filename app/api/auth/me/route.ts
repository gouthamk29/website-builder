import { NextResponse } from "next/server";
import { getUserfromSession } from "@/helpers/sessionHelper";

export async function GET() {
  const user = await getUserfromSession();
  if (!user) return NextResponse.json(null, { status: 401 });
  return NextResponse.json(user);
}
