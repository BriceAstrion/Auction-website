<script>
    export let active;
    import { isLoggedIn } from '../stores/auth.js';
    import { getDecodedToken } from '../stores/token.js';

    let isUserLoggedIn = false;
    let isAdmin = false;

    // Subscribe to the isLoggedIn store to reactively update login status
    isLoggedIn.subscribe(value => {
        isUserLoggedIn = value;
        const decodedToken = getDecodedToken();
        if (decodedToken) {
            isAdmin = decodedToken.isAdmin;
        } else {
            isAdmin = false;
        }
    });

    function handleLogout() {
        // Clear user's session
        localStorage.removeItem('token'); // Remove token from localStorage
        isLoggedIn.set(false); // Set isLoggedIn store to false
        isAdmin = false; // Reset isAdmin variable
        console.log("User logged out!");
        alert("You logged out");
    }
</script>


<nav>
    <div>
        <div class="title">ICONIC ARTS FOR ALL</div>
        <div class="subtitle">Auction for iconic arts</div>
    </div>

    <ul>
        <li><a class:active={active === "/"} href="/">Home</a></li>
        {#if isUserLoggedIn && isAdmin}
            <li><a class:active={active === "/artAdmin"} href="/artAdmin">ArtAdmin</a></li>
            <li><a class:active={active === "/users"} href="/users">Users</a></li>
        {/if}
        <li><a class:active={active === "/about"} href="/about">About</a></li>
    </ul>

    {#if !isUserLoggedIn}
        <a class:active={active === "/login"} href="/login">Login</a>
    {:else}
        <a class:active={active === "/login"} on:click={handleLogout} href="/login">Logout</a>
    {/if}
</nav>


<style>
    nav {
        background-color: #6661ef;
        padding: 2rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: -1.50rem;
        font-weight: bold;
    }

    .title {
        font-size: 1.5rem;
        font-weight: bold;
        text-align: center;
        margin: 0;
        color: #e1e1f4;
    }

    .subtitle {
        font-size: 1.2rem;
        margin-top: 0.5rem;
        color: #19f487;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
    }

    li {
        margin-right: 3rem;
    }

    li:last-child {
        margin-right: 0;
    }

    a {
        text-decoration: none;
        color: white;
        transition: color 0.3s ease; /* Add a smooth color transition */
        position: relative; /* For pseudo-element */
        font-size: 1.2rem;
    }

    a.active {
        font-weight: bold;
    }

    a::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #f60707;
        transform: scaleX(0); /* Initially no line */
        transform-origin: center;
        transition: transform 0.3s ease; /* Add a smooth line transition */
    }

    a.active::after {
        transform: scaleX(1); /* Show the line on active link */
    }

    /* Hover effect for non-active links */
    a:not(.active):hover {
        color: #fff; /* Change color on hover */
    }

</style>