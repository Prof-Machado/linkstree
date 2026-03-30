exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    const response = await fetch(
      "https://api.github.com/repos/Prof-Machado/linktfolio/dispatches",
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github+json",
          "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`
        },
        body: JSON.stringify({
          event_type: "new_submission",
          client_payload: data
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: 500,
        body: JSON.stringify({
          success: false,
          error: errorText
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};
