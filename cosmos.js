import { ConfidentialClientApplication } from '@azure/msal-node';
import { CosmosClient } from '@azure/cosmos';

class MyAzureCredential {
  async getToken(requestedScopes) {
    const config = {
      auth: {
        clientId: '',
        authority: 'https://login.microsoftonline.com//',
        clientSecret: '',
      },
    };
    var client = new ConfidentialClientApplication(config);
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

var client = CosmosClient({
  endpoint: 'https://mispuridevcosmos.documents.azure.com:443/',
  aadCredentials: new MyAzureCredential(),
});

let response = await client.getDatabaseAccount();
console.dir(response);
