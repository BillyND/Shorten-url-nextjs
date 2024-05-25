import { NextRequest, NextResponse } from "next/server";
import dbConnect from "./dbConnect";

export async function middleware(req: NextRequest) {
  try {
    await dbConnect();
  } catch (error) {
    console.error("===> Database connection error:", error);
    return new NextResponse("Database connection error", { status: 500 });
  }

  return NextResponse.next();
}
