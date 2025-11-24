const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = (supabaseUrl && supabaseServiceRoleKey)
    ? createClient(supabaseUrl, supabaseServiceRoleKey)
    : null;

exports.uploadImage = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;
    // Sanitize filename
    const sanitizedOriginalName = req.file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
    const fileName = `${Date.now()}-${sanitizedOriginalName}`;

    try {
        if (!supabase) {
            console.log('Supabase not configured, returning local mock URL');
            // For local dev without Supabase, we can't easily serve the file unless we set up static serving
            // But for the purpose of the flow, we'll return a mock URL or the local path

            // We'll keep the file in uploads/ for local serving
            // Rename it to the timestamped name
            const newPath = path.join(path.dirname(filePath), fileName);
            fs.renameSync(filePath, newPath);

            const localUrl = `http://localhost:${process.env.PORT || 3001}/uploads/${fileName}`;

            return res.status(200).json({
                message: 'File uploaded locally (Supabase not configured)',
                url: localUrl,
                mock: true
            });
        }

        const fileBuffer = fs.readFileSync(filePath);

        // Ensure bucket exists
        const { data: buckets, error: listBucketsError } = await supabase.storage.listBuckets();
        if (!listBucketsError && !buckets.find(b => b.name === 'screenshots')) {
            await supabase.storage.createBucket('screenshots', {
                public: true
            });
        }

        const { data, error } = await supabase.storage
            .from('screenshots')
            .upload(fileName, fileBuffer, {
                contentType: req.file.mimetype,
                upsert: false,
            });

        // Clean up the local file
        fs.unlinkSync(filePath);

        if (error) {
            console.error('Supabase upload error:', error);
            return res.status(500).json({ error: 'Failed to upload image to Supabase.' });
        }

        // Construct public URL
        const { data: publicUrlData } = supabase.storage
            .from('screenshots')
            .getPublicUrl(fileName);

        const publicUrl = publicUrlData.publicUrl;

        res.status(200).json({ message: 'File uploaded successfully!', url: publicUrl });

    } catch (err) {
        console.error('Upload controller error:', err);
        // Try to cleanup file if it exists
        if (fs.existsSync(filePath)) {
            try { fs.unlinkSync(filePath); } catch (e) { }
        }
        res.status(500).json({ error: 'Internal server error during upload' });
    }
};
