// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions as nextAuthOptions } from '@/pages/api/auth/[...nextauth]';

const restricted = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);

  if (session) {
    res.send({
      content: 'Access granted.'
    });
  } else {
    res.send({
      error: 'Access denied.'
    });
  }
};

export default restricted;
