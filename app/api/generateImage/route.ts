import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  //res now contains body
  const res = await request.json();
  const prompt = res.prompt;

  const response = await fetch(
    'https://ai-image-generator-microsoft-agus.azurewebsites.net/api/generateimage',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    }
  );

  const textData = await response.text();

  return NextResponse.json(textData);
}
