import * as bcrypt from "bcrypt-nodejs";

/**
 * Generates a hash for a password.
 * @param password any string really, ideally a password.
 */
export const generateHash = (password: string): string =>
  password ? bcrypt.hashSync(password, bcrypt.genSaltSync(8)) : "";

/**
 * Returns true or false if the given string value matches the hashed value given.
 * @param password the stringed password
 * @param hashedPassword the hashed password
 */
export const validPassword = (
  password: string,
  hashedPassword: string
): boolean => bcrypt.compareSync(password, hashedPassword);

/**
 * Generates a random string of values.
 */
export const rand = () =>
  Math.random()
    .toString(36)
    .substr(9);

/**
 * Generates a token used for the alpha version.
 */
export const generateToken = () => {
  return (rand() + rand()).toUpperCase();
};

/**
 * Generates a room code; a 4 digit, random, hashed like value.
 */
export const generateRoomCode = () => {
  return rand().toUpperCase();
};

export const ExpressError = (
  message: string = "Some sort of server side error occured",
  statusCode: number = 500
) => {
  const err = new Error(message);
  err["status"] = statusCode;
  return err;
};

/**
 * Returns the sum of two numbers, this method is meant only for testing out the tests.
 */
export const sum = (a: number, b: number) => a + b;