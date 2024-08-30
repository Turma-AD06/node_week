import { RoleSeed } from './role.seed';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DbSeed {
  constructor(
    @Inject()
    private readonly roleSeed: RoleSeed,
  ) {}

  async call() {
    return Promise.all([this.roleSeed.seed()]);
  }
}
