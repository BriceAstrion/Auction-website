<script>
    import { onMount } from 'svelte';
    import { token } from "../stores/token.js";
    import UserCard from "../components/UsersCard.svelte";

    let users = [];
    const authToken = $token;

    async function fetchUsers() {
        try {
            const response = await fetch('http://localhost:3000/users', {
                headers: {
                    'Authorization': `${authToken}`
                }
            });
            if (response.ok) {
                users = await response.json();
            } else {
                console.error('Failed to fetch users:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    async function handleDelete(email) {
        users = users.filter(user => user.email !== email);
        try {
            const response = await fetch(`http://localhost:3000/users/${email}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${authToken}`
                }
            });
            if (!response.ok) {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    async function updateUser(email, newRole) {
        try {
            const response = await fetch(`http://localhost:3000/users/${email}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `${authToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    role: newRole,
                }),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                users = users.map(user =>
                    user.email === email ? { ...user, isAdmin: updatedUser.isAdmin } : user
                );
                console.log('User updated successfully');
            } else {
                console.error('Failed to update user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }


    function editUser(user) {
        const newRole = prompt("Enter new role for user:", user.isAdmin ? "admin" : "user");
        if (newRole) {
            updateUser(user.email, newRole);
        }
    }

    onMount(() => {
        fetchUsers();
    });
</script>

<div class="user-management">
    <h1>User Management</h1>

    <div class="card-container">
        {#each users as user (user.email)}
            <UserCard {user} onDelete={handleDelete} onEdit={() => editUser(user)}/>
        {/each}
    </div>
</div>

<style>
    h1 {
        margin-top: 3.5rem;
        font-size: 2.8rem;
        color: #cd0430;
        font-family: "Times New Roman", serif;
        animation: fadeIn 2s ease-in-out;
    }

    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
</style>
