import { Inject, Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { RoleRepository } from '../repositories/contracts/role.repository';

@Injectable()
export class RoleSeed {
  constructor(
    @Inject()
    private readonly roleRepository: RoleRepository,
  ) {}

  async seed() {
    const roles = [{ name: 'admin' }, { name: 'user' }];

    for (const roleData of roles) {
      const existingRole = await this.roleRepository.findByName(roleData.name);
      if (!existingRole) {
        console.log(`Role ${roleData.name} não existe`);
        const roleEntity = new Role();
        roleEntity.name = roleData.name;
        await this.roleRepository.create(roleEntity);
        continue;
      }
      console.log(`Role ${roleData.name} existe`);
    }
  }
}
