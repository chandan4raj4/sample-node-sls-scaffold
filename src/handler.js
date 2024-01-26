async function hello(event) {
  console.log(JSON.stringify(event, null, 2));
  // if we return the success message here from lambda,
  // messages in queue gets deleted.
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
}

export const handler = hello;
