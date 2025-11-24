const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const getStats = async (req, res) => {
    try {
        // Get total users (approximate from user_profiles)
        const { count: userCount, error: userError } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true });

        if (userError) throw userError;

        // Get total analyses
        const { count: analysisCount, error: analysisError } = await supabase
            .from('analysis_history')
            .select('*', { count: 'exact', head: true });

        if (analysisError) throw analysisError;

        // Calculate average score (mock calculation for now as it's expensive to aggregate JSONB in simple query without SQL function)
        // For MVP, we'll fetch last 100 and average them
        const { data: recentAnalyses, error: recentError } = await supabase
            .from('analysis_history')
            .select('scores')
            .limit(100);

        if (recentError) throw recentError;

        let totalScore = 0;
        let count = 0;
        recentAnalyses.forEach(a => {
            if (a.scores && a.scores.overall) {
                totalScore += a.scores.overall;
                count++;
            }
        });
        const avgScore = count > 0 ? (totalScore / count).toFixed(1) : 0;

        res.json({
            totalUsers: userCount,
            totalAnalyses: analysisCount,
            activeToday: 0, // Placeholder
            avgScore: avgScore
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
};

const getUsers = async (req, res) => {
    try {
        // Fetch users from Supabase Auth (requires service role key)
        const { data: { users }, error } = await supabase.auth.admin.listUsers({
            page: 1,
            perPage: 50
        });

        if (error) throw error;

        // Fetch profiles to merge (optional, but good for names)
        const { data: profiles, error: profileError } = await supabase
            .from('user_profiles')
            .select('id, full_name, username, avatar_url');

        if (profileError) console.warn('Error fetching profiles:', profileError);

        // Merge data
        const enrichedUsers = users.map(user => {
            const profile = profiles?.find(p => p.id === user.id);
            return {
                id: user.id,
                email: user.email,
                full_name: profile?.full_name || user.user_metadata?.full_name || 'N/A',
                username: profile?.username || 'N/A',
                created_at: user.created_at,
                last_sign_in_at: user.last_sign_in_at,
                avatar_url: profile?.avatar_url || user.user_metadata?.avatar_url
            };
        });

        res.json(enrichedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const getRecentActivity = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('analysis_history')
            .select('*, user_profiles(full_name, username)') // Join with user_profiles if possible
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) throw error;

        // Transform data
        const activity = data.map(item => ({
            user: item.user_profiles?.full_name || item.user_profiles?.username || 'Unknown User',
            action: 'Completed analysis',
            time: item.created_at,
            status: 'completed'
        }));

        res.json(activity);
    } catch (error) {
        console.error('Error fetching activity:', error);
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
};

const getAnalyticsData = async (req, res) => {
    try {
        // Fetch last 30 days of analysis history
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data, error } = await supabase
            .from('analysis_history')
            .select('created_at')
            .gte('created_at', thirtyDaysAgo.toISOString())
            .order('created_at', { ascending: true });

        if (error) throw error;

        // Group by date
        const dailyCounts = {};
        data.forEach(item => {
            const date = item.created_at.split('T')[0];
            dailyCounts[date] = (dailyCounts[date] || 0) + 1;
        });

        // Fill in missing dates
        const chartData = [];
        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            chartData.push({
                date: dateStr,
                count: dailyCounts[dateStr] || 0
            });
        }

        res.json(chartData);
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).json({ error: 'Failed to fetch analytics data' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ error: 'User ID is required' });

        // Delete from Supabase Auth (cascades to user_profiles and analysis_history if configured, otherwise we might need manual cleanup)
        // Ideally, foreign keys should handle cascade.
        const { error } = await supabase.auth.admin.deleteUser(id);

        if (error) throw error;

        // Log admin activity
        await supabase.from('admin_activity').insert({
            admin_id: req.user.id,
            activity_type: 'delete_user',
            target_user_id: id,
            details: `Deleted user ${id}`
        });

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = { getStats, getUsers, getRecentActivity, getAnalyticsData, deleteUser };
