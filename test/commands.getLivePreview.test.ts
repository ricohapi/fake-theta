import fs from 'fs/promises';
import path from 'path';
import { TEST_HOST } from './helper';

describe('POST /osc/commands/execute getLivePreview', () => {
  it('should respond with results', async () => {
    const response = await fetch(`${TEST_HOST}/osc/commands/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'camera.getLivePreview' }),
    });

    expect(response.headers.get('content-type')).toBe(
      'multipart/x-mixed-replace; boundary="---osclivepreview---"',
    );
    const data = Buffer.from(await response.arrayBuffer());

    const filePath = path.resolve(__dirname, './img/sample-preview.jpg');
    const picture = await fs.readFile(filePath);

    const start_boundary =
      '---osclivepreview---\r\nContent-type: image/jpeg\r\nContent-Length: 23660\r\n\r\n';
    const end_boundary = '\r\n\r\n---osclivepreview---\r\n';
    const encoder = new TextEncoder();
    const start = encoder.encode(start_boundary).length;
    const end = data.length - encoder.encode(end_boundary).length;

    expect(data.subarray(0, start).toString()).toBe(start_boundary);
    expect(data.subarray(start, end)).toStrictEqual(picture);
    expect(data.subarray(end, data.length).toString()).toBe(end_boundary);
  });
});
