import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUserPayload } from './auth-request';

export async function resolveAuthUserId(
  prisma: PrismaService,
  authUser?: AuthUserPayload,
): Promise<number> {
  const candidateIds: Array<number | string | undefined> = [
    authUser?.id,
    authUser?.userId,
    authUser?.sub,
  ];

  for (const candidateId of candidateIds) {
    const numericId = Number(candidateId);

    if (Number.isInteger(numericId) && numericId > 0) {
      return numericId;
    }
  }

  if (authUser?.email) {
    const user = await prisma.user.findUnique({
      where: { email: authUser.email },
      select: { id: true },
    });

    if (user) {
      return user.id;
    }
  }

  if (typeof authUser?.sub === 'string') {
    const user = await prisma.user.findUnique({
      where: { appleSub: authUser.sub },
      select: { id: true },
    });

    if (user) {
      return user.id;
    }
  }

  throw new UnauthorizedException('Unable to resolve authenticated user.');
}
