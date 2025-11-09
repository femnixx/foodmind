import { GoogleGenAI } from '@google/genai';
import React, { useState } from 'react'
import ReactMarkDown from 'react-markdown';

const genAI = new GoogleGenAI({ apiKey: import.meta.env.REACT_APP_GEMINI_API_KEY || "AIzaSyDt-0Ow9iPOgDcwAxEgQ5gZvuSGwee0wEo" });

const UploadPage = () => {
    const [ingredients, setIngredients] = useState('');
    const [output, setOutput] = useState<(string | undefined)[]>([]);

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

  return (
    <div className='p-5'>
        <h1 className='font-bold py-5 text-center'>Upload Page</h1>
        <div className='w-fit'>
            <div className='flex flex-col gap-y-3'>
                <p>Upload file here</p>
                <input type="file" className='border'/>
                <p>Or type ingredients here</p>
                <input type="text" className='border' placeholder='ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)}/>
                <div>
                    <button className='border w-fit px-2' onClick={handleSubmit}>Submit</button>
                </div>
                <div>
                    {output.map((output, index) => (
                        <div key={index}>
                            <ReactMarkDown>
                                {output}
                            </ReactMarkDown>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default UploadPage