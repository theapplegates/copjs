// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/utils/hash';
import { isValidEmail } from '@/utils/validate';

// POST /api/user/create
async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
  // Get email and password from request body
  const { email, password } = req.body;

  if (
    !email ||
    !password ||
    !isValidEmail(email) ||
    password.length < 6 ||
    password.length > 100 ||
    email.length > 100
  ) {
    return res.status(400).json(null);
  }

  // Create a new user in the database
  await prisma.user
    .create({
      data: { email, password: hashPassword(password) }
    })
    .then(user => {
      // Return the user object
      res.json(user);
    })
    .catch(() => {
      // If there was an error, return null
      res.status(500).json(null);
    })
    .finally(async () => {
      // Disconnect from the database
      await prisma.$disconnect();
    });
}

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
