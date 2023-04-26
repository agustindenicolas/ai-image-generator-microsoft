export async function GET(request: Request) {
  //Connect to our Microsoft Azure Function endpoint
  const response = await fetch(
    'https://ai-image-generator-microsoft-agus.azurewebsites.net/api/getchatgptsuggestion',
    {
      cache: 'no-store',
    }
  );

  const textData = await response.text();

  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
