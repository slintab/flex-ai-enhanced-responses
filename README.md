# Twilio Flex: Enhanced responses with GPT-3

This [Twilio Flex](https://www.twilio.com/flex) plugin uses [GPT-3](https://openai.com/api/) to enhance and rephrase agent responses.

## Demo
![Demo](demo.gif?)

## Design
![Architecture](architecture.png?raw=true)

The repository contains two folders:
- `enahnced-responses-function`: contains the code for a [Twilio Function](https://www.twilio.com/docs/runtime/functions) used for fetching the enhanced responses from the OpenAI API. 
- `enhanced-responses-plugin`: contains the code for a [Twilio Flex plugin](https://www.twilio.com/docs/flex/developer/plugins). The plugin adds a new rephrase button to the [MessageInputActions](https://assets.flex.twilio.com/docs/releases/flex-ui/2.0.0-beta.1/programmable-components/components/MessageInputActions) component.

## Setup

1. ***Deploy the Twilio Function***
   1. Install the [Twilio Serverless Toolkit](https://www.twilio.com/docs/labs/serverless-toolkit).
   2. Navigate to the function directory: `cd enhanced-responses-function`
   3. Rename `.env.example` to `.env` and update it with your OpenAI API key and Twilio credentials.
   3. Deploy the function using the `twilio serverless:deploy` command.
   4. Make note of the newly deployed function URLs.

2. ***Install the Flex plugin:***

   Note that the plugin uses **Flex UI 2**.


   1. Install the [Flex Plugins CLI](https://www.twilio.com/docs/flex/developer/plugins/cli).
   2. Navigate to the plugin directory: `cd enhanced-responses-plugin`
   3. Open the `/src/config.js` file. Set `FUNCTION_URL` to the base URL of your Twilio functions from step 1.
   4. Install the flex plugin using the `twilio flex:plugins:deploy` command. 
   

That's it! Navigate to your Flex instance and click on a messaging-based task to see the plugin in action.

## Maintainer
Thanks for reading this far!
If you have any questions, do not hesitate to reach out at `hello@slintab.dev`