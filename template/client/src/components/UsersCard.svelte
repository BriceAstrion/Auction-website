<script>
    export let user = {};
    export let onDelete;
    export let onEdit;

    function isAdmin() {
        return user.isAdmin ? 'Admin' : 'User';
    }
</script>


<div class="user-card">
    <div class="user-info">Name: {user.name}</div>
    <div class="user-info">Email: {user.email}</div>
    <div class="user-info">Role: {isAdmin()}</div>

    <button class="pen" on:click={() => onEdit(user)}>✏️</button>
    <button class="bin" on:click={() => onDelete(user.email)}>🗑️</button>
</div>


<style>
    .user-card {
        width: 300px;
        padding: 20px;
        margin: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .user-info {
        font-weight: bold;
        margin-bottom: 10px;
    }

    .pen {
        font-size: 1rem;
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #cd0430;
    }

    .bin {
        font-size: 1rem;
        position: absolute;
        bottom: 10px;
        right: 10px;
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: #cd0430;
    }

    .pen:hover, .bin:hover {
        color: #000;
    }
</style>