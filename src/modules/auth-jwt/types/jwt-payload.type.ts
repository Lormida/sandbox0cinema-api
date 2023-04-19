import { RoleEnum } from '@prisma/client'
import { UnixDate } from '../../../common/types/UnixDate.type'

export type JwtPayload = {
  email?: string
  username?: string
  sub: number
  role: RoleEnum
  iat: UnixDate
  exp: UnixDate
}
