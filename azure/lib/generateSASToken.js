const {
  BlobServiceClient,
  StorageSharedKeyCredential,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require('@azure/storage-blob');

const accountName = process.env.accountName;
const accountKey = process.env.accountKey;
const containerName = 'images';

//Create the key credential for storage
const sharedKeyCredential = new StorageSharedKeyCredential(
  accountName,
  accountKey
);

//Connect to blob storage
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);

async function generateSASToken() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const permissions = new BlobSASPermissions();
  permissions.write = true;
  permissions.create = true;
  permissions.read = true;

  //Create expiration of 30 minutes
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30);

  //Create SAS Token
  const sasToken = generateBlobSASQueryParameters(
    {
      containerName: containerClient.containerName,
      permissions: permissions.toString(),
      expiresOn: expiryDate,
    },
    sharedKeyCredential
  ).toString();

  return sasToken;
}

module.exports = generateSASToken;
