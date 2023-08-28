import { NextApiRequest, NextApiResponse } from 'next';
import { HubspotForm } from '@lib/api/hubspot/HubspotForm';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, headers } = req;

  const hubspotForm = new HubspotForm();
  if (method === 'POST') {
    try {
      const formHeaders = { type: headers['type'] as string };
      const response = await hubspotForm.submit(body, formHeaders);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: 'Failed to submit the form' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
