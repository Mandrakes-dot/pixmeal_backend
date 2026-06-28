import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export async function resolveAuthUserId(
  prisma: PrismaService,
  authUser: any,
): Promise<number> {
  const rawId = authUser?.id ?? authUser?.userId ?? authUser?.sub;

  const numericId = Number(rawId);

  if (Number.isInteger(numericId) && numericId > 0) {
    return numericId;
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