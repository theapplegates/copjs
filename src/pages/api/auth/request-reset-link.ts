// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  // Get the email from the request body
  const { email } = req.body;

  // Check the user exists
  await prisma.user
    .findFirst({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
        role: true
      }
    })
    .then(user => {
      if (user) {
        // If the user exists, return status 200
        res.status(200).json(null);
      } else {
        // If the user does not exist, return status 401
        res.status(401).json(null);
      }
    })
    .catch(() => {
      // If there was an error, return status 500
      res.status(500).json(null);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
