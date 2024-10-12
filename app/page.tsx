"use client"
import React, { useState } from 'react';
import Image from "next/image";
import Topbar from "@/components/topbar/topbar";
import Description from "@/components/topbar/description";
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = "AIzaSyALgrBDyepyU7cKVKIkqAWwyeu9qn2OltI";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(input) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage(`Act as a medical doctor and tell about the potential disease with symptoms. Don't ask questions. You should entertain only questions related to medical and nothing out of context. Don't use bold, italic, stars or any other in text. Keep the whole text in normal format. Question is : ${input}`);
    console.log(result.response.text());
    return result.response.text();
  }

export default function Home() {

    const [inputValue, setinputValue] = useState('');
    const [responseText, setResponseText] = useState('');

    const InputText = (event) => {
      setinputValue(event.target.value.replace("*", ""));
    }

    const handleSend = async() => {
      setinputValue('');
      setResponseText(run(inputValue)); // Update the state with the response text
      } 
    

  return (
    <div className="h-screen w-screen h-14 bg-gradient-to-br from-green-500 to-blue-500 overflow-x-hidden">
    <Topbar/>
    <Description/>
    <div className="flex">
      <div className="flex justify-between items-center flex-col w-1/5 h-60 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-10 backdrop-invert bg-green-500/20">
        <button className="border-none rounded-full border-2 p-1 m-1 hover:backdrop-blur-md hover:bg-white/30"><div>Personal Diagnosis</div></button>
        <button className="border-none rounded-full border-2 p-1 m-1 hover:backdrop-blur-md hover:bg-white/30"><div>Synthetic Medical Data</div></button>
        <button className="border-none rounded-full border-2 p-1 m-1 hover:backdrop-blur-md hover:bg-white/30"><div>Contact Doctors</div></button>
        <button className="border-none rounded-full border-2 p-1 m-1 hover:backdrop-blur-md hover:bg-white/30"><div>Library</div></button>
        <button className="border-none rounded-full border-2 p-1 m-1 hover:backdrop-blur-md hover:bg-white/30"><div>About</div></button>
      </div>
      <div className=" h-screen w-4/5 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/20 flex flex-col justify-center items-center">

        <div className="relative h-5/6 w-11/12 p-1 m-1 rounded-lg border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/30">

          <div className='absolute left-1 border-gray-400 border-2 bg-gray-400 rounded-md flex justify-center items-center h-auto w-auto'>{responseText}</div>

        </div>
        <div className='relative h-14 w-11/12 p-1 m-1 rounded-full border-white border-2 backdrop-opacity-5 backdrop-invert bg-white/30 text-black placeholder:text-gray-900'>

        <button className='absolute bottom-0 right-20 z-10'><Image src="/assets/images/link.svg" height={50} width={50} alt='image'></Image></button>

        <input
        type="text"
        value={inputValue}
        className="absolute h-14 w-11/12 rounded-full border-none backdrop-opacity-5 backdrop-invert bg-white/30 text-black placeholder:text-gray-900 top-0 left-0"
        placeholder="How Are You Feeling Today?"
        id='prompt'
        onChange={InputText}
      />
      <button 
      className='absolute bottom-0 right-0 z-10'
      onClick={handleSend}><Image src="/assets/images/send.svg" height={50} width={50} alt='image'></Image></button>
      </div>
        </div>
        
    </div>
    <span className='text-red-700'>Always consult a medical professional before making any medical decisions.</span>
    </div>  
  );
}