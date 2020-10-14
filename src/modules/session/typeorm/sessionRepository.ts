import { getMongoRepository } from 'typeorm';
import Session from './schemas/sessionSchema';
import { uuid } from 'uuidv4';

interface ICreateSessionDTO {
  name: string;
  total_value: number;
}

export const createSession = async ({ name, total_value }: ICreateSessionDTO): Promise<Session> => {

  const ormRepository = getMongoRepository(Session);
  const hash = uuid();

  const session = ormRepository.create({ name, total_value, hash });

  await ormRepository.save(session);

  return session;

}
