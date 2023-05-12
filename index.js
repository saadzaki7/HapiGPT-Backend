const express = require("express");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/find-response", async (req, res) => {
  try {
    const { prompt } = req.body;
    curMsg=[{role: "system", content: "A curious therapist that asks questions"}]
    //console.log("prompt")
    //console.log(prompt)
    curMsg=curMsg.concat(prompt)
    //console.log("curMsg")
    //console.log(curMsg)
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: curMsg,
    });
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].message.content,
    });
  } catch (error) {
    //console.log(error);
    return res.status(400).json({
      success: false,
      error: error.response
        ? error.response.data
        : "There was an issue on the server",
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
