import { config } from 'dotenv';

config();

export const jwtConstants = {
  atSecret: process.env.AT_SECRET,
  rtSecret: process.env.RT_SECRET
};
