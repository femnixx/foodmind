import { GoogleGenAI } from '@google/genai';
import React, { useState } from 'react'
import ReactMarkDown from 'react-markdown';

const genAI = new GoogleGenAI({ 
    apiKey: import.meta.env.REACT_APP_GEMINI_API_KEY ||"AIzaSyDt-0Ow9iPOgDcwAxEgQ5gZvuSGwee0wEo"
});

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
            setOutput(prev => [...prev, text]);
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

            const text = model.text;
            setOutput(prev => [...prev, text]);

        } catch (err) {
            console.log("Something went wrong: ", err);
            alert("API quota exceeded. Please try again later.");
        }
    }

    async function arrayBufferToBase64(buffer: ArrayBuffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) { 
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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-10">
            {/* Page Header */}
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                Upload Ingredients / Image
            </h1>

            {/* Main Card */}
            <div className="bg-white w-full max-w-3xl shadow-sm rounded-xl border border-gray-200 p-8">
                {/* Upload Section */}
                <div className="space-y-6">
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Image
                        </label>
                        <input 
                            type="file" 
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            onChange={handleImage}
                        />
                    </div>

                    <div className="flex items-center justify-center text-gray-500">
                        <div className="h-px w-1/3 bg-gray-300"></div>
                        <span className="mx-2 text-sm">OR</span>
                        <div className="h-px w-1/3 bg-gray-300"></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Enter Ingredients
                        </label>
                        <input 
                            type="text" 
                            placeholder="e.g. chicken, garlic, soy sauce"
                            className="block w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-3">
                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                            onClick={handleSubmit}
                        >
                            Generate from Text
                        </button>

                        <button 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                            onClick={handleSubmitImage}
                        >
                            Generate from Image
                        </button>
                    </div>
                </div>
            </div>

            {/* Output Section */}
            <div className="w-full max-w-3xl mt-10">
                {output.length > 0 && (
                    <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 space-y-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Results
                        </h2>

                        {output.map((block, i) => (
                            <div 
                                key={i} 
                                className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                            >
                                <ReactMarkDown>
                                    {block || "No content"}
                                </ReactMarkDown>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPage;
