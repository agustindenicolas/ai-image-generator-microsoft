const { app } = require('@azure/functions');
const axios = require('axios');
const openai = require('../../lib/openai');
const generateSASToken = require('../../lib/generateSASToken');

const { BlobServiceClient } = require('@azure/storage-blob');

const accountName = process.env.accountName;
const containerName = 'images';

app.http('generateImage', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request) => {
    //Get the prompt
    const { prompt } = await request.json();

    console.log(`The Prompt is: ${prompt}`);

    //Create image using the prompt
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    image_url = response.data.data[0].url;

    //Download the image and return it as an arraybuffer
    const res = await axios.get(image_url, { responseType: 'arraybuffer' });

    const arrayBuffer = res.data;

    sasToken = await generateSASToken();

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net?${sasToken}`
    );

    const containerClient = blobServiceClient.getContainerClient(containerName);

    //Generate current timestamp
    const timestamp = new Date().getTime();
    const file_name = `${prompt}_${timestamp}.png`;

    const blockBlobClient = containerClient.getBlockBlobClient(file_name);

    try {
      await blockBlobClient.uploadData(arrayBuffer);
      console.log('File uploaded successfully');
    } catch (error) {
      console.log('Error uploading file:', error.message);
    }

    return { body: 'Successfully Uploaded Image' };
  },
});
