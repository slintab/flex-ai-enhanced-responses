const { Configuration, OpenAIApi } = require("openai");
const TokenValidator = require("twilio-flex-token-validator").functionValidator;

exports.handler = TokenValidator(async function (context, event, callback) {
  const createResponse = () => {
    const response = new Twilio.Response();
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    response.setHeaders(headers);

    return response;
  };

  const getEnhancedText = async (client, text) => {
    const completion = await client.createCompletion({
      model: "text-davinci-003",
      prompt: `Rephrase the following text: ${text}`,
      max_tokens: 500,
    });

    return completion.data.choices[0].text;
  };

  const response = createResponse();
  const openAiconfiguration = new Configuration({
    apiKey: context.OPENAI_API_KEY,
  });
  const openaiClient = new OpenAIApi(openAiconfiguration);

  const result = await getEnhancedText(openaiClient, event.message);
  response.setBody({ result: result.trim() });

  callback(null, response);
});
