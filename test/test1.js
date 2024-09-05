// eslint-disable-next-line @typescript-eslint/no-var-requires
const { publicClient, authClient } = require('./config');

class AuthTest {
  static signUpTest = async () => {
    const { data } = await publicClient.post('/user', {
      email: 'test@gmail.com',
      name: '홍길동',
      password: 'test123',
    });

    return data;
  };

  static loginTest = async () => {
    const { data } = await publicClient.post('/auth/login', {
      email: 'test@gmail.com',
      password: 'test123',
    });

    return data;
  };

  static getUserProfile = async () => {
    const { data } = await authClient.get('/user');
    return data;
  };
}

const main = async () => {
  // signUpTest();
  // await loginTest();
  const result = await AuthTest.getUserProfile();
  console.log(result);
};

main();
