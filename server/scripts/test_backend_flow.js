const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function testBackendFlow() {
    try {
        console.log('Starting backend flow test...');

        // 1. Login (Get Session)
        const { data: { session }, error: loginError } = await supabase.auth.signInWithPassword({
            email: 'testuser_flow@example.com',
            password: 'password123'
        });

        if (loginError) throw loginError;
        console.log('Logged in successfully. User ID:', session.user.id);

        // 2. Upload Image
        // We need a file to upload. Let's create a dummy file if not exists.
        const testFilePath = path.join(__dirname, 'test_image.png');
        if (!fs.existsSync(testFilePath)) {
            // Create a simple text file masked as png for testing (server might check mime type but let's try)
            // Or better, copy the one I generated if I knew the path.
            // I'll just create a dummy buffer.
            fs.writeFileSync(testFilePath, Buffer.from('fake image content'));
        }

        const formData = new FormData();
        formData.append('screenshot', fs.createReadStream(testFilePath));

        console.log('Uploading image...');
        const uploadRes = await fetch(`${process.env.REACT_APP_API_URL}/api/upload`, {
            method: 'POST',
            body: formData
        });

        if (!uploadRes.ok) {
            const text = await uploadRes.text();
            throw new Error(`Upload failed: ${uploadRes.status} ${text}`);
        }

        const uploadData = await uploadRes.json();
        console.log('Upload successful. URL:', uploadData.url);

        // 3. Analyze Image
        console.log('Analyzing image...');
        const analyzeRes = await fetch(`${process.env.REACT_APP_API_URL}/api/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}` // If analyze endpoint was protected, but it expects userId in body currently
            },
            body: JSON.stringify({
                imageUrl: uploadData.url,
                userId: session.user.id
            })
        });

        if (!analyzeRes.ok) {
            const text = await analyzeRes.text();
            throw new Error(`Analysis failed: ${analyzeRes.status} ${text}`);
        }

        const analysisData = await analyzeRes.json();
        console.log('Analysis successful. Score:', analysisData.scores.overall);

        // 4. Verify History
        console.log('Verifying history...');
        const { data: history, error: historyError } = await supabase
            .from('analysis_history')
            .select('*')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(1);

        if (historyError) throw historyError;

        if (history.length > 0 && history[0].screenshot_url === uploadData.url) {
            console.log('History verification passed!');
        } else {
            console.error('History verification failed. Latest entry:', history[0]);
        }

    } catch (error) {
        console.error('Test failed:', error);
    }
}

testBackendFlow();
