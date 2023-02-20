import React from "react";
import { FlexPlugin } from "@twilio/flex-plugin";

import ResponseEnhancer from "./components/ResponseEnhancer/ResponseEnhancer";

const PLUGIN_NAME = "EnhancedResponsesPlugin";

export default class EnhancedResponsesPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   */
  async init(flex, manager) {
    flex.MessageInputActions.Content.add(
      <ResponseEnhancer
        key="response-enhancer"
        session={manager.store.getState().flex.session}
      />,
      {
        sortOrder: -1,
      }
    );
  }
}
