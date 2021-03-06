import * as Joi from 'joi';
import { Model, RelationMappings } from 'objection';
import { join } from 'path';

import Tokens from './Tokens';
import Tournaments from './Tournaments';

class User extends Model {
  static tableName = 'users';
  readonly id!: number;
  username!: string;
  email!: string;
  password!: string;
  displayName!: string;
  admin!: boolean;
  facebookKey?: string;
  challongeKey?: string;
  smashggKey?: string;
  createdAt?: Date;
  updatedAt?: Date;

  // optional
  token?: Tokens;
  tournaments?: Tournaments[];

  static jsonSchema = {
    type: 'object',
    required: ['username', 'email', 'displayName', 'password'],
    properties: {
      id: { type: 'integer' },
      username: { type: 'string', minLength: 3, maxLength: 255 },
      email: { type: 'string', minLength: 3, maxLength: 255 },
      displayName: { type: 'string', minLength: 3, maxLength: 255 },
      admin: { type: 'boolean' },
      password: { type: 'string', minLength: 8, maxLength: 255 },
      facebookKey: { type: ['string', 'null'] },
      challongeKey: { type: ['string', 'null'] },
      smashggKey: { type: ['string', 'null'] },
    },
  };

  static relationMappings: RelationMappings = {
    token: {
      relation: Model.HasOneRelation,
      modelClass: join(__dirname, 'Tokens'),
      join: {
        from: 'users.id',
        to: 'tokens.userId',
      },
      filter: (q) => {
        return q.column('token');
      },
    },
    tournaments: {
      relation: Model.HasManyRelation,
      modelClass: join(__dirname, 'Tournaments'),
      join: {
        from: 'users.id',
        to: 'tournaments.userId',
      },
    },
  };
}

export const NewUserSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  token: Joi.string().required(),
  displayName: Joi.string()
    .min(3)
    .max(255)
    .required(),
  password: Joi.string()
    .min(8)
    .required(),
});

export default User;
