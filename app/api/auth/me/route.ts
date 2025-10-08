import { NextResponse } from "next/server";
import { getUserfromSession } from "@/helpers/sessionHelper";

export async function GET() {
  const user = await getUserfromSession();
  console.log("from api/auth/me",user);

  if (!user) return NextResponse.json(null, { status: 401 });


  console.log("Passed")

  return NextResponse.json(user);
}
