'use server';

import { auth } from './auth';

const createAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  const user =
    email &&
    password &&
    (await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: 'admin',
      },
    }));

  console.log(user);
};

export default createAdmin;
