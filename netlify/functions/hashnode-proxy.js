export async function handler(event, context) {
  console.log("process.env.HASHNODE_TOKEN", process.env.HASHNODE_TOKEN);

  try {
    const body = JSON.parse(event.body);

    console.log(body);
    console.log("{process.env.HASHNODE_TOKEN", process.env.HASHNODE_TOKEN);

    const response = await fetch("https://gql.hashnode.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HASHNODE_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL errors:", data.errors);
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({ error: "GraphQL errors", detail: data.errors }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Proxy error", detail: error.message }),
    };
  }
}
