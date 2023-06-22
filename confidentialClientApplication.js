import { ConfidentialClientApplication } from '@azure/msal-node';

const config = {
  auth: {
    clientId: '',
    authority: 'https://login.microsoftonline.com/<tenantId>/',
    clientSecret: '',
  },
};

const client = new ConfidentialClientApplication(config);

const request = {
  scopes: ['https://graph.microsoft.com/.default'],
};

let response = await client.acquireTokenByClientCredential(request);

console.dir(response.accessToken);
