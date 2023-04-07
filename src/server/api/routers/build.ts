import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { getShortCommitId } from '@/utils/build';

// Build Router
export const buildRouter = createTRPCRouter({
  version: publicProcedure.query(async () => {
    const commitId = await getShortCommitId();

    return commitId || '';
  })
});
