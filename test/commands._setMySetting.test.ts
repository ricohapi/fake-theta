import {
  request,
  toMatchInvalidHeaderParameterError,
  toMatchMissingParameterError,
} from './helper';

describe('POST /osc/commands/execute _setMySetting', () => {
  it('should respond with results', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera._setMySetting',
        parameters: {
          mode: 'image',
          options: {
            _filter: 'Noise Reduction',
            exposureProgram: 2,
          },
        },
      })
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('should respond missingParameterError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera._setMySetting',
        parameters: { fileUri: 'dummy' },
      })
      .expect(400);
    toMatchMissingParameterError(res);
  });
});

describe('THETA X POST /osc/commands/execute _setMySetting', () => {
  it('should respond with results', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera._setMySetting',
        parameters: {
          mode: 'image',
          options: {
            _filter: 'Noise Reduction',
            exposureProgram: 2,
          },
        },
      })
      .set('emulating-theta-model', 'x')
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('should respond missingParameterError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera._setMySetting',
        parameters: { fileUri: 'dummy' },
      })
      .set('emulating-theta-model', 'x')
      .expect(400);
    toMatchMissingParameterError(res);
  });
});

describe('THETA Z1 POST /osc/commands/execute _setMySetting', () => {
  it('should respond with results', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera._setMySetting',
        parameters: {
          mode: 'image',
          options: {
            _filter: 'Noise Reduction',
            exposureProgram: 2,
          },
        },
      })
      .set('emulating-theta-model', 'z1')
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('should respond missingParameterError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera._setMySetting',
        parameters: { fileUri: 'dummy' },
      })
      .set('emulating-theta-model', 'z1')
      .expect(400);
    toMatchMissingParameterError(res);
  });
});

describe('Unknown Type POST /osc/commands/execute _setMySetting', () => {
  it('should respond invalidHeaderParameterError', async () => {
    const res = await request()
      .post('/osc/commands/execute')
      .send({
        name: 'camera._setMySetting',
        parameters: {
          mode: 'image',
          options: {
            _filter: 'Noise Reduction',
            exposureProgram: 2,
          },
        },
      })
      .set('emulating-theta-model', 'unknown')
      .expect(400);
    toMatchInvalidHeaderParameterError(res);
  });
});