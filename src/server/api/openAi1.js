

const { OpenAIApi, Configuration} = require('openai');
require('dotenv').config();

//const readline = require ("readline");
//const express = require("express");
 
const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
  })
)
/*
const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


userInterface.prompt()
userInterface.on("line", async input => {
  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  })
  console.log(response.data.choices[0].message.content)
  userInterface.prompt()
})
*/
let sendMessage2 = 'hi';

async function sendToChatGPT(message){
  const response = await openAi.createChatCompletion({
       model: 'gpt-3.5-turbo',
       messages: [
           { role: 'user', content: message}
       ]
   })
   return response;
}

async function askChatGPT(sendMessage){
   const response = await sendToChatGPT(sendMessage + ', תן תשובה של עד שלושים מילים');
   const answerGPT =  response.data.choices[0].message.content;
   //console.log('answerGPT:', answerGPT);
   //let answerGPT = {hi: 'hi you'};
   return  answerGPT
}
//askChatGPT('hi');

module.exports = {
  async getData(value){
    if(value !== ''){
      const answer = await askChatGPT(value)
      return  answer
    }else{
    const answer = await askChatGPT(sendMessage2)
    return  answer
  } 
}

};

