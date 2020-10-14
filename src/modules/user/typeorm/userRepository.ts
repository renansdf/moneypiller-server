import { getMongoRepository } from 'typeorm';
import User from './schemas/userSchema';

interface ICreateUserDTO {
  socketId: string;
  name: string;
  session_hash: string;
  monthly_cost: number;
  monthly_profit: number;
  balance: number;
}

export const createUser = async ({ socketId, name, session_hash, monthly_cost, monthly_profit, balance }: ICreateUserDTO): Promise<User> => {

  const ormRepository = getMongoRepository(User);

  const user = ormRepository.create({ socketId, name, session_hash, monthly_cost, monthly_profit, balance });

  await ormRepository.save(user);

  return user;

}
