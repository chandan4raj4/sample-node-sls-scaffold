async function hello(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Chandan Kumar' }),
  };
}

export const handler = hello;
