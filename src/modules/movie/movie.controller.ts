import { Controller, UseFilters, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'
import { NotFoundResponseDto } from '../../common/dtos/errors'
import { Serialize } from '../../common/interceptors'
import { Public } from '../auth-jwt/decorators'
import { PrismaClientExceptionFilter } from '../prisma/prisma-client-exception'
import { MovieEntity } from './entity'
import { MovieService } from './movie.service'

@Controller('movies')
@ApiTags('Movie')
@UseFilters(PrismaClientExceptionFilter)
@Serialize(MovieEntity)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ description: 'Get all movies' })
  @ApiOkResponse({ type: MovieEntity, isArray: true })
  findAllMovies(): MovieEntity[] {
    const movies = this.movieService.findAllMovies()

    return movies
  }

  @Public()
  @Get(':movieId')
  @ApiOperation({ description: 'Get one movie by movieId (from MovieRecord)' })
  @ApiNotFoundResponse({ type: NotFoundResponseDto })
  @ApiOkResponse({ type: MovieEntity })
  async findOneMovie(@Param('movieId', ParseIntPipe) movieId: number): Promise<MovieEntity> {
    const movie = await this.movieService.findOneMovie(movieId)

    if (!movie) {
      throw new NotFoundException(`Could not find movie with ${movieId}.`)
    }

    return movie
  }
}
