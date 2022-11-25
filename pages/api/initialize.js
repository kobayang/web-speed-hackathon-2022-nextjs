export const config = {
  runtime: "experimental-edge",
};

export default async function handler(req) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/initialize`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    });
  } finally {
    return new Response(null, {
      status: 204,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
