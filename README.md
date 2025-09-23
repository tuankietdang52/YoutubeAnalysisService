<h1 align="center" id="title">Youtube Analysis Service</h1>

<p id="description" align="center">A simple project for analyze audio of Youtube video and more</p>

<p align="center"><img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&amp;logoColor=white" alt="shields"><img src="https://img.shields.io/badge/Express-000000?logo=express&amp;logoColor=white" alt="shields"></p>

<img width="1102" height="475" alt="image" src="https://github.com/user-attachments/assets/b6a39e92-55bb-475b-9f06-43811b2a1b40" />


<h2>Features</h2>

*   Screenshot Youtube Video Tab without open browser and saving to Cloudinary
*   Download Audio of the video
*   Transcript it to text and check it though AI Detector using ZeroGPT
*   Saving to MongoDB database

<h2>Prerequisites</h2>

* Node JS v24.8.0 (latest)
* MongoDB Server v8.2.0 (latest)
* Chrome Browser
* FFMPEG
* Elevenlabs Api Key
* ZeroGPT Api Key
* Cloudinary Api Key and Secret Key

<h2>Installation</h2>

* First, we install all the package needed by using

> npm install

if this error happen:

``` node_modules/@elevenlabs/elevenlabs-js/wrapper/music.d.ts:32:5 - error TS2416: Property 'composeDetailed' in type 'Music' is not assignable to the same property in base type 'Music'. ```

locate the file and fix the error line to (remember to import HttpResponsePromise)

``` composeDetailed(request?: ElevenLabs.BodyComposeMusicWithADetailedResponseV1MusicDetailedPost, requestOptions?: Music.RequestOptions): HttpResponsePromise<ReadableStream<Uint8Array>>; ``` 

* Then, create .env file in root folder with these variable

  ```
  HOST=YOUR_HOST
  PORT=YOUR_PORT
  DATABASE_URI=YOUR_DATABASE_URI
  DATABASE_USERNAME=YOUR_DATABASE_USERNAME
  DATABASE_PASSWORD=YOUR_DATABASE_PASSWORD
  ELEVENLABS_API_KEY=YOUR_ELVENLABS_API_KEY
  ZEROGPT_API_KEY=YOUR_ZEROGPT_API_KEY
  CLOUDINARY_NAME=YOUR_CLOUDINARY_STORAGE_NAME
  CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
  CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
  FFMPEG_PATH=YOUR_FFMPEG_PATH
  SCREENSHOT_PATH=YOUR_SAVE_SCREENSHOT_PATH
  AUDIO_PATH=YOUR_SAVE_AUDIO_PATH

  ```

* Finally, run the project by using (make sure MongoDb server is running)
> npm run start or npm run dev

<h2>Technology</h2>
This project is writing in TypeScript with NodeJS instead of JavaScript cause of the safe typing, clean code with MongoDB for better scale and having no relation, flexibility and more. For screenshot and audio download, with Puppeteer take screenshot with easy headless browser setup and ytdl-core + ffmpeg to download the audio. I'm using ElevenLabs to transcript audio and ZeroGPT instead of GPTZero cause ZeroGPT provide a free plan and easy api approach. Cloudinary is the best API for saving image in the cloud for beginner, offer a free-tier and support image upload, fast delivery via CDN
