// Get references to HTML elements
const input = document.getElementById("user-input");
const button = document.getElementById("send-btn");
const messages = document.querySelector(".messages");

// Run this code whenever the Send button is clicked
button.addEventListener("click", async function () {

    // Get the text from the input box and remove extra spaces
    const userMessage = input.value.trim();

    // Don't send empty messages
    if (userMessage === "") {
        return;
    }

    // Create a new div for the user's message
    const messageDiv = document.createElement("div");

    // Add CSS classes
    messageDiv.classList.add("message");
    messageDiv.classList.add("user");

    // Put the user's text inside the div
    messageDiv.textContent = userMessage;

    // Add the new message to the chat
    messages.appendChild(messageDiv);

    // Clear the input box
    input.value = "";

    // Move to the newest message automatically
    messages.scrollTop = messages.scrollHeight;
    const aiReply = await askAI(userMessage);
    createAIMessage(aiReply);
    
});
function createAIMessage(text) {

    const aiMessage = document.createElement("div");

    aiMessage.classList.add("message");
    aiMessage.classList.add("ai");

    aiMessage.textContent = text;

    messages.appendChild(aiMessage);

    messages.scrollTop = messages.scrollHeight;

}
async function askAI(prompt) {

    const response = await fetch("http://127.0.0.1:1234/v1/chat/completions", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            model: "gpt-oss-20b",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        })

    });

    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;

}