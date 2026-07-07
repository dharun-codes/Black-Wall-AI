
const input = document.getElementById("user-input");
const button = document.getElementById("send-btn");
const messages = document.querySelector(".messages");

button.addEventListener("click", async function () {

    const userMessage = input.value.trim();

    if (userMessage === "") {
        return;
    }

    const messageDiv = document.createElement("div");

    messageDiv.classList.add("message");
    messageDiv.classList.add("user");

    messageDiv.textContent = userMessage;

    messages.appendChild(messageDiv);

    input.value = "";

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