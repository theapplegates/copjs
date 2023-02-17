// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

// GET /api/user/:id
async function handleGET(id: string, res: NextApiResponse) {
  // Get the user from the database
  await prisma.user
    .findFirst({
      where: { id }
      // include: { id: true, name: true, email: true, image: true },
    })
    .then(user => {
      // Return the user object
      res.json(user);
    })
    .catch(() => {
      // If there was an error, return null
      res.json(null);
    })
    .finally(async () => {
      // Disconnect from the database
      await prisma.$disconnect();
    });
}

// GET /api/user/:id
async function handlePOST(
  id: string,
  res: NextApiResponse,
  req: NextApiRequest
) {
  // Update the user in the database
  await prisma.user
    .update({
      where: { id },
      data: { ...req.body }
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
    })
    .finally(async () => {
      // Disconnect from the database
      await prisma.$disconnect();
    });
}

// DELETE /api/user/:id
async function handleDELETE(id: string, res: NextApiResponse) {
  // Delete the user from the database
  await prisma.user
    .delete({
      where: { id }
    })
    .then(() => {
      res.json({ success: true });
    })
    .catch(() => {
      res.json({ success: false });
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
  // Get the session from the request
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user || session.user.role !== 'admin') {
    // If the user is not authenticated or is not admin, return an error
    res.status(401).json({ message: 'Unauthorized' });

    return;
  }

  // Get the id from the request query
  const id: string = `${req.query.id || ''}`;

  if (req.method === 'GET') {
    // If the HTTP method is GET, call the handleGET function
    handleGET(id, res);
  } else if (req.method === 'POST') {
    // If the HTTP method is POST, call the handlePOST function
    handlePOST(id, res, req);
  } else if (req.method === 'DELETE') {
    // If the HTTP method is DELETE, call the handleDELETE function
    handleDELETE(id, res);
  } else {
    // If the HTTP method is not GET, POST, or DELETE, return an error
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
