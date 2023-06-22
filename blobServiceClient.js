import { BlobServiceClient } from '@azure/storage-blob';
import { DefaultAzureCredential } from '@azure/identity';
import dotenv from 'dotenv';

dotenv.config();

const connectionString =
  'DefaultEndpointsProtocol=https;AccountName=mispuridevstorage;AccountKey=OIQZs9zC37sUCgdSRTwpLTLF1z/lWeid6o/R8NTGosZlDBO0o7uNcBK2Jfa1WU4IcodygOGBckHm+AStQM1Eiw==;EndpointSuffix=core.windows.net';

const client = new BlobServiceClient(
  'https://mispuridevstorage.blob.core.windows.net/',
  new DefaultAzureCredential()
);

let container = client.getContainerClient('bravo');

await container.createIfNotExists();
