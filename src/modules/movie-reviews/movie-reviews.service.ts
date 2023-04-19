import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { MovieReviews } from './types/MovieReviews.type'
import reviews from '../../../data/reviews.json'

@Injectable()
export class MovieReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllMoviesReviews(): MovieReviews[] {
    return reviews
  }

  async findReviewsByMovie(id: number): Promise<MovieReviews | undefined> {
    const movieRecord = await this.prisma.movieRecord.findUnique({
      where: {
        id,
      },
    })

    if (movieRecord) {
      return reviews.find((reviews) => reviews.id === movieRecord.imdbId)
    }
  }
}
