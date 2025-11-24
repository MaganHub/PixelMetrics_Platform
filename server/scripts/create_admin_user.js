const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function createAdminUser() {
    const email = 'admin@pixelmetrics.com';
    const password = 'adminpassword123';

    console.log(`Creating admin user: ${email}`);

    // Check if user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('Error listing users:', listError);
        return;
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        console.log('Admin user already exists. ID:', existingUser.id);
        return;
    }

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: 'Admin User' }
    });

    if (error) {
        console.error('Error creating admin user:', error);
    } else {
        console.log('Admin user created successfully:', data.user.id);
    }
}

createAdminUser();
