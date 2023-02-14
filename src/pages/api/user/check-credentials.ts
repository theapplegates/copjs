// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  // Get the email and password from the request body
  const { email, password } = req.body;

  // Check the credentials using the checkCredentials function
  await prisma.user
    .findUnique({
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
      if (user && user.password === password) {
        // If the credentials are valid, return a success message
        res.status(200).json(user);
      } else {
        // If the credentials are invalid, return null
        res.status(401).json(null);
      }
    })
    .catch(() => {
      // If there was an error, return null
      res.status(500).json(null);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
