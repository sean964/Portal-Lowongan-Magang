import { NEXT_PUBLIC_API_URL } from '../../../environment/env';

export async function photoFetch(nim) {
  const res = await fetch(`${NEXT_PUBLIC_API_URL}/photo/${nim}`);
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const arrayBuffer = await res.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString('base64');
  const contentType = res.headers.get('content-type');
  return { base64, contentType };
}
