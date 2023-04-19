import { Injectable } from '@nestjs/common'
import { Cinema } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCinemaDto, UpdateCinemaDto } from './dto'

@Injectable()
export class CinemaService {
  constructor(private readonly prisma: PrismaService) {}

  async createCinema(cinemaData: CreateCinemaDto): Promise<Cinema> {
    return await this.prisma.cinema.create({ data: cinemaData })
  }

  async findAllCinemas(): Promise<Cinema[]> {
    return await this.prisma.cinema.findMany()
  }

  async findCinemaByCinemaHallId(cinemaHallId: number): Promise<Cinema> {
    const cinemaHallWithCinema = await this.prisma.cinemaHall.findUniqueOrThrow({
      where: {
        id: cinemaHallId,
      },
      include: {
        cinema: true,
      },
    })

    return cinemaHallWithCinema.cinema
  }

  async findOneCinema(id: number): Promise<Cinema | null> {
    return await this.prisma.cinema.findUnique({ where: { id } })
  }

  async updateCinema(id: number, updateCinemaData: UpdateCinemaDto): Promise<Cinema> {
    return await this.prisma.cinema.update({
      where: { id },
      data: updateCinemaData,
    })
  }

  async deleteCinema(id: number): Promise<Cinema> {
    return await this.prisma.cinema.delete({ where: { id } })
  }
}
