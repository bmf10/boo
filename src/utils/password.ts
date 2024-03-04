/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as crypt from 'bcrypt'

export const hash = (plain: string): Promise<string> => {
  return crypt.hash(plain, 5)
}

export const verify = (hash: string, plain: string): Promise<boolean> => {
  return crypt.compare(plain, hash)
}

export default { hash, verify }
