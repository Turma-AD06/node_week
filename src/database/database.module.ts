import { UserRepository } from './repositories/contracts/user.repository';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryImpl } from './repositories/user-repository-impl';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { DbSeed } from './seed/db.seed';
import { RoleSeed } from './seed/role.seed';
import { RoleRepository } from './repositories/contracts/role.repository';
import { RoleRepositoryImpl } from './repositories/role-repository-impl';
import { SeedCommand } from './commands/seed.command';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_DRIVER as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname.concat('/entities/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Role]),
  ],
  providers: [
    {
      provide: RoleRepository,
      useClass: RoleRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    SeedCommand,
    DbSeed,
    RoleSeed,
  ],
  exports: [UserRepository],
})
export class DatabaseModule {}
