const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function createTestUser() {
    const email = 'testuser_flow@example.com';
    const password = 'password123';

    console.log(`Creating user: ${email}`);

    // Check if user exists
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('Error listing users:', listError);
        return;
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        console.log('User already exists. ID:', existingUser.id);
        return;
    }

    // Create user
    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: 'Test Flow User' }
    });

    if (error) {
        console.error('Error creating user:', error);
    } else {
        console.log('User created successfully:', data.user.id);
    }
}

createTestUser();
