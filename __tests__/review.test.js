const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const mockUser = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  password: '12345',
};

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? mockUser.password;
  const agent = request.agent(app);
  const user = await UserService.create({ ...mockUser, ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  return [agent, user];
};

describe('review routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it.only('DELETE /api/v1/reviews/:id deletes a review', async () => {
    const [agent] = await registerAndLogin();
    await agent
      .post('/api/v1/restaurants/4/reviews')
      .send({ stars: 2, detail: 'overrated' });
    const resp = await agent
      .delete('/api/v1/reviews/4')
      .send({ message: 'delete successful' });
    expect(resp.status).toBe(200);
  });
});
