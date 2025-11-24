const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = (supabaseUrl && supabaseServiceRoleKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key', // Prevent crash if key is missing
});

exports.analyzeImage = async (req, res) => {
    try {
        const { imageUrl, userId } = req.body; // Expect userId from frontend if available

        if (!imageUrl) {
            return res.status(400).json({ error: 'Image URL is required' });
        }

        console.log('Analyzing image:', imageUrl);

        let result;

        // Fallback for development without API key
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key') {
            console.log('Using mock response (no API key provided)');
            result = {
                scores: {
                    usability: 8,
                    design: 7,
                    accessibility: 9,
                    overall: 8
                },
                feedback: "This is a mock analysis response. To get real AI insights, please configure your OPENAI_API_KEY in the server .env file.\n\nThe layout is clean and the contrast is good. Consider increasing the padding around the primary button.",
                boundingBoxes: [
                    { x: 50, y: 100, width: 200, height: 50, label: "Primary Button", type: "button" },
                    { x: 20, y: 20, width: 100, height: 100, label: "Logo", type: "image" }
                ]
            };
        } else {
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content: `You are an expert UX/UI designer and accessibility specialist. 
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
              For bounding boxes, identify key UI elements (buttons, inputs, headers) with their approximate coordinates (0-100 scale for percentage of width/height).`
                    },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: "Analyze this UI screenshot." },
                            {
                                type: "image_url",
                                image_url: {
                                    "url": imageUrl,
                                },
                            },
                        ],
                    },
                ],
                response_format: { type: "json_object" },
                max_tokens: 1500,
            });

            result = JSON.parse(response.choices[0].message.content);
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
