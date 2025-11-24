const { GoogleGenerativeAI } = require("@google/generative-ai");
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = (supabaseUrl && supabaseServiceRoleKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key');

exports.analyzeImage = async (req, res) => {
    try {
        const { imageUrl, userId } = req.body;

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        console.log('Analyzing image:', imageUrl);

        let result;

        // Fallback for development without API key
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
            console.log('Using mock response (no API key provided)');
            result = {
                scores: {
                    usability: 8,
                    design: 7,
                    accessibility: 9,
                    overall: 8
                },
                feedback: "This is a mock analysis response. To get real AI insights, please configure your GEMINI_API_KEY in the server .env file.\n\nThe layout is clean and the contrast is good. Consider increasing the padding around the primary button.",
                boundingBoxes: [
                    { x: 50, y: 100, width: 200, height: 50, label: "Primary Button", type: "button" },
                    { x: 20, y: 20, width: 100, height: 100, label: "Logo", type: "image" }
                ]
            };
        } else {
            // Fetch image and convert to base64
            const imageResp = await fetch(imageUrl);
            if (!imageResp.ok) throw new Error(`Failed to fetch image: ${imageResp.statusText}`);
            const imageBuffer = await imageResp.buffer();
            const base64Image = imageBuffer.toString('base64');
            const mimeType = imageResp.headers.get('content-type') || 'image/jpeg';

            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = `You are an expert UX/UI designer and accessibility specialist. 
            Analyze the provided screenshot and return a JSON object with the following structure:
            {
              "scores": {
                "usability": number (1-10),
                "design": number (1-10),
                "accessibility": number (1-10),
                "overall": number (1-10)
              },
              "feedback": "Detailed text feedback mentioning strengths and improvements",
              "boundingBoxes": [
                { "x": number, "y": number, "width": number, "height": number, "label": "string", "type": "string" }
              ]
            }
            For bounding boxes, identify key UI elements (buttons, inputs, headers) with their approximate coordinates (0-100 scale for percentage of width/height).
            IMPORTANT: Return ONLY the JSON object, no markdown formatting or backticks.`;

            const resultPart = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: mimeType
                    }
                }
            ]);

            const response = await resultPart.response;
            const text = response.text();

            // Clean up markdown if present
            const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
            result = JSON.parse(jsonStr);
        }

        // Save to Supabase if configured and userId is present
        if (supabase && userId) {
            const { error } = await supabase
                .from('analysis_history')
                .insert({
                    user_id: userId,
                    screenshot_url: imageUrl,
                    scores: result.scores,
                    feedback: result.feedback,
                    bounding_boxes: result.boundingBoxes
                });

            if (error) console.error('Error saving to history:', error);
            else console.log('Analysis saved to history');
        }

        res.json(result);

    } catch (error) {
        console.error('Analysis error:', error);
        res.status(500).json({ error: 'Failed to analyze image', details: error.message });
    }
};
