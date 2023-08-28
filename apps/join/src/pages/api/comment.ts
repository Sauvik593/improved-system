import { NextApiRequest, NextApiResponse } from 'next';
import { Comments } from '@lib/api/strapi/postComment';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === 'POST') {
    const result = await new Comments().add(req.body);
    res.status(200).json({ result });
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}
