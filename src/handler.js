import { schedulerSample } from './service';

async function hello(event) {
  console.log(JSON.stringify(event, null, 2));

  // call the scheduler function
  const result = await schedulerSample(event);

  /**
   * sample event:
  {
    scheduleExpression, // at(2024-02-01T08:07:39)
    description,
    payload,
    startDate,
    endDate,
    state,
  }
   */
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World', event: result }),
  };
}

export const handler = hello;
