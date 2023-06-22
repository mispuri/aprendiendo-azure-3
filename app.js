import { ConfidentialClientApplication } from '@azure/msal-node';
import { BlobServiceClient } from '@azure/storage-blob';

class MyAzureCredential {
  async getToken(requestedScopes) {
    const config = {
      auth: {
        clientId: '',
        authority: 'https://login.microsoftonline.com/<tenantId>/',
        clientSecret: '',
      },
    };

    const client = new ConfidentialClientApplication(config);
    const request = {
      scopes: Array.isArray(requestedScopes)
        ? requestedScopes
        : [requestedScopes],
    };

    let response = await client.acquireTokenByClientCredential(request);
    return {
      token: response.accessToken,
      expiresOnTimestamp: response.expiresOn.getTime(),
    };
  }
}

const connectionString =
  'DefaultEndpointsProtocol=https;AccountName=mispuridevstorage;AccountKey=OIQZs9zC37sUCgdSRTwpLTLF1z/lWeid6o/R8NTGosZlDBO0o7uNcBK2Jfa1WU4IcodygOGBckHm+AStQM1Eiw==;EndpointSuffix=core.windows.net';

const client = new BlobServiceClient(
  'https://mispuridevstorage.blob.core.windows.net/',
  new MyAzureCredential()
);

let container = client.getContainerClient('charlie');

await container.createIfNotExists();
