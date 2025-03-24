export async function GET() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();

  return new Response(JSON.stringify(data));
}
