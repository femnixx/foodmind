import { GoogleGenAI } from '@google/genai';
import React, { useState } from 'react'
import ReactMarkDown from 'react-markdown';

const genAI = new GoogleGenAI({ apiKey: import.meta.env.REACT_APP_GEMINI_API_KEY || "AIzaSyDt-0Ow9iPOgDcwAxEgQ5gZvuSGwee0wEo" });


const UploadPage = () => {
    const [ingredients, setIngredients] = useState('');
    const [output, setOutput] = useState<(string | undefined)[]>([]);
    const [image, setImage] = useState<string | null>(null);

    async function handleSubmit() {
        try { 
            const model = await genAI.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `With the ingredients provided, provide a list, with the format of a title on-top, a numbered list below, with a colon and then an explanation on the description of the step. The ingredients are: ${ingredients}.`
            });
            const text = await model.text;
            setOutput(prev => [
                ...prev,
                text
            ]);
        } catch (err) {
            console.log("Something went wrong: ", err);
        }
    }

    async function handleSubmitImage() {
        try { 
            if (!image) return;
            const file = await fetch(image).then(r => r.blob());
            const arrayBuffer = await file.arrayBuffer();
            const base64Data = await arrayBufferToBase64(arrayBuffer);

            const model = await genAI.models.generateContent({ 
                model: "gemini-2.0-flash",
                contents: [
                        { text: "Describe a recipe using this image." },
                        { inlineData: { mimeType: file.type, data: base64Data }}
                ]
            });
            const text = await model.text;
            setOutput(prev => [
                ...prev,
                text
            ]);
        } catch (err) {
            console.log("Something went wrong: ", err);
            alert("API quota exceeded. Please try again later.");
        }
    }

    async function arrayBufferToBase64(buffer: ArrayBuffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) { 
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImage(url);
    }

  return (
    <div className='p-5'>
        <h1 className='font-bold py-5 text-center'>Upload Page</h1>
        <div className='w-fit'>
            <div className='flex flex-col gap-y-3'>
                <p>Upload file here</p>
                <input type="file" className='border' onChange={handleImage}/>
                <p>Or type ingredients here</p>
                <input type="text" className='border' placeholder='ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
                <div>
                    <button className='border w-fit px-2' onClick={handleSubmit}>Submit</button>
                </div>
                <div>
                    <button className='border w-fit px-2' onClick={handleSubmitImage}>Submit if image</button>
                </div>
                <div>
                    {output.map((output, index) => (
                        <ReactMarkDown key={index}>
                            { output|| "No content" }
                        </ReactMarkDown>
                    ))}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default UploadPage