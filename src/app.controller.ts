/* eslint-disable @darraghor/nestjs-typed/api-method-should-specify-api-response */
import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import { Public } from './modules/auth-jwt/decorators'

@Controller()
@Public()
@ApiTags('Healthcheck')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  checkHealth(): string {
    return this.appService.checkHealth()
  }
}
