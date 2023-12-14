// app/api/comments/route.ts
import { type NextRequest } from 'next/server';
import { cosmic } from '@/lib/cosmic';

export async function POST(request: NextRequest) {
  const res = await request.json();
  const data = await cosmic.objects.insertOne(res.comment);
  return Response.json(data);
}
