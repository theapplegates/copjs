// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/utils/hash';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check the HTTP method
  if (req.method === 'POST') {
    // If the HTTP method is POST, call the handlePOST function
    await handlePOST(req, res);
  } else {
    // If the HTTP method is not POST, return an error
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

// POST /api/user/create
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  // Create a new user in the database
  const user = await prisma.user.create({
    data: { ...req.body, password: hashPassword(req.body.password) }
  });

  // Return the user object
  res.json(user);
}
