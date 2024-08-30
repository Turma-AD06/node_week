import { Inject, Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { DbSeed } from '../seed/db.seed';

@Injectable()
export class SeedCommand {
  constructor(
    @Inject()
    private readonly dbSeeder: DbSeed,
  ) {}

  @Command({
    command: 'db:seed',
    describe: 'Executa a Seed do banco de dados',
  })
  async seed() {
    await this.dbSeeder.call();
  }
}
