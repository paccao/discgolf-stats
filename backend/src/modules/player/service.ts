import prisma from '@/utils/prisma'
import { CreateScoreCardInput, GetHeaderIDInput } from './schema'

export async function getScoreCard({ id }: GetHeaderIDInput) {
  return prisma.scoreCard.findUnique({
    where: { id },
  })
}

export async function createScoreCard({}: CreateScoreCardInput) {}
