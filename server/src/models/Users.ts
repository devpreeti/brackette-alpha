import { Model, RelationMappings } from "objection";
import * as Joi from "joi";
import UserTokens from "./UserTokens"
import { join } from "path";

class User extends Model {
  static tableName = "users";
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
  tokens?: UserTokens;

  static jsonSchema = {
    type: "object",
    required: ["username", "email", "displayName", "password"],
    properties: {
      id: { type: "integer" },
      username: { type: "string", minLength: 3, maxLength: 255 },
      email: { type: "string", minLength: 3, maxLength: 255 },
      displayName: { type: "string", minLength: 3, maxLength: 255 },
      admin: { type: "boolean" },
      password: { type: "string", minLength: 8, maxLength: 255 },
      facebookKey: { type: ["string", "null"] },
      challongeKey: { type: ["string", "null"] },
      smashggKey: { type: ["string", "null"] }
    }
  };

  static relationMappings: RelationMappings = {
    tokens: {
      relation: Model.HasOneRelation,
      modelClass: join(__dirname, 'UserTokens'),
      join: {
        from: "users.id",
        to: "user_tokens.userId"
      },
      filter: (q) => {
        return q.column("token");
      }
    }
  }
}

export const NewUserSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(255)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  displayName: Joi.string()
    .min(3)
    .max(255)
    .required(),
  password: Joi.string()
    .min(8)
    .required()
});

export const LoginUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export default User;
