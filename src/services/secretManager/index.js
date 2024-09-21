import AWS from 'aws-sdk';

const createSecretManagerClient = async (secret_name, region = 'ap-south-1') => {
  try {
    console.log('Connecting on AWS Region -> ' + region);
    const client = new AWS.SecretsManager({
      region,
    });
    const secretValue = await client.getSecretValue({ SecretId: secret_name }).promise();
    console.log('Secrets Manager call successful');
    if ('SecretString' in secretValue) {
      let secrets = secretValue.SecretString;
      secrets = JSON.parse(secrets);
      return secrets;
    } else {
      const buff = Buffer.from(secretValue.SecretBinary, 'base64');
      let decodedBinarySecret = buff.toString('ascii');
      decodedBinarySecret = JSON.parse(decodedBinarySecret);
      return decodedBinarySecret;
    }
  } catch (error) {
    console.log('Failed Secret Manager Call ', secret_name);
    throw error;
  }
};

const getSecretManagerClient = async (secret_name, region) => {
  return await createSecretManagerClient(secret_name, region);
};

export { getSecretManagerClient };
