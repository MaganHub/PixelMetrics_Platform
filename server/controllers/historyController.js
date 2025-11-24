const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = (supabaseUrl && supabaseServiceRoleKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

exports.getHistory = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!supabase) {
            console.log('Supabase not configured, returning empty list or mock');
            return res.json([]);
        }

        console.log('Fetching history from Supabase...');
        let query = supabase
            .from('analysis_history')
            .select('*')
            .order('created_at', { ascending: false });

        if (userId) {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query;

        if (error) throw error;

        // Transform data to match frontend expectation if needed
        // Frontend expects: { id, imageUrl, score, date, status, title }
        // DB has: { id, screenshot_url, scores, created_at }

        const transformedData = data.map(item => ({
            id: item.id,
            imageUrl: item.screenshot_url,
            score: item.scores?.overall || 0,
            date: new Date(item.created_at).toISOString().split('T')[0],
            status: 'Completed', // Assuming all saved are completed
            title: 'Analysis Result' // Placeholder title
        }));

        res.json(transformedData);

    } catch (error) {
        console.error('Error fetching history:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};
