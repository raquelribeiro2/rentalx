import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ICreateCategoryDTO } from './ICategoriesRepository';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
