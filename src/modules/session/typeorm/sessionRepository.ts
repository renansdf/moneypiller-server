import { getMongoRepository } from 'typeorm';
import Session from './schemas/sessionSchema';

interface ICreateSessionDTO {
  name: string;
  totalValue: number;
  hash: string;
}

export const createSession = async ({ name, totalValue, hash }: ICreateSessionDTO): Promise<Session> => {

  const ormRepository = getMongoRepository(Session);

  const session = ormRepository.create({ name, totalValue, hash });

  await ormRepository.save(session);

  return session;

}
