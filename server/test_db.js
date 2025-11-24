const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseServiceRoleKey ? supabaseServiceRoleKey.length : 0);

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function testConnection() {
    try {
        console.log('Testing connection to analysis_history...');
        const { data, error } = await supabase
            .from('analysis_history')
            .select('*')
            .limit(1);

        if (error) {
            console.error('Supabase Error:', error);
        } else {
            console.log('Success! Data:', data);
        }
    } catch (err) {
        console.error('Unexpected Error:', err);
    }
}

testConnection();
