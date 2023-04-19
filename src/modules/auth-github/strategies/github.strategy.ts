import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-github2'
import { Injectable } from '@nestjs/common'

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:5000/api/v1/auth/github/redirect',
      scope: ['email', 'profile'],
    })
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    // eslint-disable-next-line @typescript-eslint/ban-types
    done: Function,
  ): Promise<any> {
    const { displayName, username, photos } = profile
    const [firstName, lastName] = displayName?.split(' ') || []

    const user = {
      firstName,
      lastName,
      username,
      avatar: photos[0].value,
      accessToken,
    }

    done(null, user)
  }
}
