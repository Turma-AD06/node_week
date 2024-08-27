import { Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DatabaseModule } from 'src/database/database.module';
import { EntityManager } from 'typeorm';

export function IsUnique(
  table: string,
  column: string,
  message = 'O valor não é único',
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: ValueIsUnique,
      constraints: [table, column, message],
    });
  };
}

@ValidatorConstraint({ async: true })
@Injectable()
export class ValueIsUnique implements ValidatorConstraintInterface {
  private entityManager: EntityManager;
  constructor() {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const app = await NestFactory.createApplicationContext(DatabaseModule);
    this.entityManager = app.get(EntityManager);
    const [table, column] = validationArguments.constraints;

    const result = await this.entityManager.query(
      `SELECT ${column} FROM ${table} WHERE ${column} = '${value}'`,
    );

    return result.length === 0;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    const [column, message] = validationArguments.constraints;
    return message ?? `${column} já está cadastrado.`;
  }
}
