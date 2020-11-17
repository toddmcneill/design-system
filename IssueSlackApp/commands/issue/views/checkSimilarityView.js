exports.checkSimilarityView = async ({ ack, body, client }) => {
  // Acknowledge the command request
  await ack();
  try {
    // Call views.open with the built-in client
    const result = await client.views.push({
      // Pass the view_id
      trigger_id: body.trigger_id,

      // View payload with updated blocks
      view: {
        type: "modal",
        // View identifier
        callback_id: "checkSimilarityView",
        private_metadata: body.view.private_metadata,
        title: {
          type: "plain_text",
          text: "Bug",
        },
        blocks: [
          {
            type: "input",
            block_id: "titleInput",
            label: {
              type: "plain_text",
              text: "Title",
            },
            element: {
              type: "plain_text_input",
              action_id: "title_input",
              multiline: false,
            },
          },
          {
            type: "input",
            block_id: "descriptionInput",
            label: {
              type: "plain_text",
              text: "Short Description",
            },
            element: {
              type: "plain_text_input",
              action_id: "description_input",
              multiline: false,
            },
          },
          {
            type: "input",
            block_id: "expectedBehaviorInput",
            label: {
              type: "plain_text",
              text: "Expected Behavior",
            },
            element: {
              type: "plain_text_input",
              action_id: "expected_behavior_input",
              multiline: true,
            },
          },
          {
            type: "input",
            block_id: "actualBehaviorInput",
            label: {
              type: "plain_text",
              text: "Actual Behavior",
            },
            element: {
              type: "plain_text_input",
              action_id: "actual_behavior_input",
              multiline: true,
            },
          },
          {
            type: "input",
            block_id: "stepsToReproInput",
            label: {
              type: "plain_text",
              text: "Steps to repro",
            },
            element: {
              type: "plain_text_input",
              action_id: "steps_to_repro_input",
              initial_value: "1.",
              multiline: true,
            },
          },
          {
            type: "input",
            block_id: "relatedPackagesInput",
            label: {
              type: "plain_text",
              text: "Related Packages",
            },
            element: {
              type: "plain_text_input",
              action_id: "related_packages_input",
              placeholder: {
                type: "plain_text",
                text: "- button@7.0.1 \n- core@2.3.4",
              },
              multiline: true,
            },
          },
          {
            type: "input",
            block_id: "environmentInput",
            label: {
              type: "plain_text",
              text: "Environment",
            },
            element: {
              type: "plain_text_input",
              action_id: "environment_input",
              placeholder: {
                type: "plain_text",
                text: "- OS - MacOS 10.12 \n- Browser version - Chrome v60",
              },
              multiline: true,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: {
                  type: "plain_text",
                  text: "Continue",
                },
                action_id: "check_similarity",
              },
            ],
          },
        ],
      },
    });
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};
