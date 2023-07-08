import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const postForm = await db
      .collection(process.env.DB_COLLECTION ?? "test")
      .insertOne(body);
    return NextResponse.json({ status: 201, body: postForm });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.error(message);
    return NextResponse.json({
      error: `Ahh man something went wrong. Check this out:${message}`,
    });
  }
}
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const companyProfile = await db
      .collection(process.env.DB_COLLECTION ?? "test")
      .findOne({ referrerRelationshipType: "BOOM BLAW" });
    return NextResponse.json({ status: 200, body: companyProfile });
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.error(message);
    return NextResponse.json({
      error: `Ahh man something went wrong. Check this out:${message}`,
    });
  }
}

export const dynamic = "force-static";
