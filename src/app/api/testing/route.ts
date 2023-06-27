import clientPromise from '@/lib/mongodb';

export async function POST(request:Request) {
      try {
      const body = await request.json()
      const client = await clientPromise;
      const db = client.db('KYUK_Operations');
      const postForm = await db.collection('referrals').insertOne(body);
      return new Response(JSON.stringify('vibe: litty'));
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    else message = String(error);
    console.error(message);
    throw new Error(message);
  }
  }

export const dynamic = "force-static";
