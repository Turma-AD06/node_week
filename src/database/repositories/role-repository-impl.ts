import { Injectable } from '@nestjs/common';
import { RoleRepository } from './contracts/role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(role: Role): Promise<Role> {
    return this.roleRepository.save(role);
  }
  async update(id: number, role: Role): Promise<Role> {
    await this.roleRepository.update({ id }, role);
    return this.roleRepository.findOneBy({ id });
  }
  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findOneBy({ name });
  }
}
