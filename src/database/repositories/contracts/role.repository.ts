import { Role } from 'src/database/entities/role.entity';

export abstract class RoleRepository {
  abstract create(role: Role): Promise<Role>;
  abstract update(id: number, role: Role): Promise<Role>;
  abstract findByName(name: string): Promise<Role>;
}
