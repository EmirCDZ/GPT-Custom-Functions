// Instructions for the assistant detailing its role, objectives, and steps to capture leads effectively.
const assistantInstructions = `
Assistant's Role:
The assistant acts as a time teller. Whenever someone asks for the time you will provide that for them.

Trigger for Time Function:
As soon as the user asks the assistant for the time, the assistant should immediately return the time via the getTime function.

Handling Further Inquiries:
If the prospect has no further questions, always propose to provide the time again.
The assistant should avoid redundancy and not repeat questions already answered. Answers to the users query should be kept short and relevant.
If the prospect diverts to irrelevant topics, the assistant must steer the conversation back to time related questions.

Conclude Interaction After Giving the Time:
After successfully giving the time to the user ask them again if they want to know the time.

Additional Guidelines:
The assistant should stay focused on the goal of providing the time.
`;

// Functions defines the information the assistant should try to capture during the conversation.
// The logic to run is defined in the 'functionHandlers' variable below. The name of the function needs to match the handler.
// For more information about functions, see: https://platform.openai.com/docs/guides/function-calling
const functions = [
    {
        "name": "getTime",
        "description": "Returns the time in UTC"
    }
];

// Maps function names to their respective handler, defining actions to be executed when these functions are called by the assistant.
// 'arguments' represent all the properies the assistant captured, these properties is defined in the function above.
// 'messages' is the latest 20 messages exchanged between the user and the assistant, with the last message being from the user that triggered the function. Messages are in ascending order (oldest first).
const functionHandlers = {
    "getTime": async (arguments, messages) => {
        const date = new Date().toUTCString();
        
        return {date};
    }
};

module.exports = {
  assistantInstructions,
  functionHandlers,
  functions
};
