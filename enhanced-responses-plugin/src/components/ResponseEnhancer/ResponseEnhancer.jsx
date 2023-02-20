import React, { useEffect, useState } from "react";
import * as Flex from "@twilio/flex-ui";
import axios from "axios";
import { NewIcon } from "@twilio-paste/icons/esm/NewIcon";
import { ResponseEnhancerWrapper } from "./ResponseEnhancerStyles";
import config from "../../config";

const ResponseEnhancer = ({ conversationSid, disabledReason, session }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const currResponse = Flex.useFlexSelector(
    (state) => state.flex.chat.conversationInput[conversationSid].inputText
  );

  const rephraseResponse = async () => {
    if (currResponse.trim().length == 0) {
      return;
    }

    const newResponse = await getEnhancedResponse(currResponse);

    if (!newResponse) {
      return;
    }

    Flex.Actions.invokeAction("SetInputText", {
      body: newResponse,
      conversationSid: conversationSid,
    });
  };

  const getEnhancedResponse = async (message) => {
    const url = config.FUNCTION_URL;
    const payload = {
      message: message,
      Token: session.ssoTokenPayload.token,
    };

    let result;

    try {
      const response = await axios.post(url, payload);

      if (response?.status == 200 && response?.data) {
        result = response.data.result;
      }
    } catch (error) {
      console.log("Error fetching suggested answer: " + error);
    }

    return result;
  };

  useEffect(() => {
    if (!disabledReason || disabledReason == "Send Message") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [disabledReason]);

  return (
    <ResponseEnhancerWrapper>
      <button onClick={rephraseResponse} disabled={isDisabled}>
        <NewIcon decorative={false} title="Rephrase" />
      </button>
    </ResponseEnhancerWrapper>
  );
};

export default ResponseEnhancer;
