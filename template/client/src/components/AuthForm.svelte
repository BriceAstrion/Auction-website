<script>
    import { isLoggedIn } from '../stores/auth.js';
    import { token } from '../stores/token.js';
    import router from 'page';

    // Initialize login state based on token in localStorage
    if (localStorage.getItem('token')) {
        isLoggedIn.set(true);
    }

    let email = "", password = "", confirmPassword = "";
    let error = "", message = "";
    let isLogin = true; // Controls whether the form is in login or register mode

    // Clear messages when switching views
    function clearMessages() {
        error = "";
        message = "";
    }

    // Toggle between login and register view
    function toggleAuth() {
        isLogin = !isLogin;
        clearMessages();
    }

    // Handle login submission
    const handleLoginSubmit = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            error = "Invalid Email Format!";
            return;
        }

        if (!password) {
            error = "Enter your password!";
            return;
        }

        try {
            // Send a POST request to your backend with login credentials
            const response = await fetch("http://localhost:3000/tokens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            console.log("Response Status:", response.status); // Log the response status code

            if (response.ok) {
                // Successful login, store the token in localStorage and in store
                const data = await response.json();
                localStorage.setItem("token", data.token);
                isLoggedIn.set(true);
                token.set(data.token); // Update the token store

                router('/');
                location.reload(); // Refresh to update UI based on login status

            } else {
                const data = await response.json();
                console.log("Error Data:", data); // Log the error response data
                error = data.error || "Login failed.";
            }
        } catch (err) {
            console.error("Error:", err);
            error = "An error occurred while logging in.";
        }
    };

    // Handle register submission
    const handleRegisterSubmit = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            error = "Invalid Email! Please, provide a valid email!";
            return;
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.{8,})/;
        if (!passwordRegex.test(password)) {
            error = "Password must be at least 8 characters long and contain at least one uppercase letter!";
            return;
        }

        if (password !== confirmPassword) {
            error = "Password does not match! Try again!";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                message = "Registration successful!";
                isLogin = true; // Switch to log in view
            } else {
                error = data.error || "An error occurred while creating account.";
            }
        } catch (err) {
            console.error("Error:", err);
            error = "An error occurred during registration.";
        }
    };
</script>


<section>
    <form on:submit|preventDefault={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
        <h1>👤</h1>

        {#if isLogin}
            <h2>Join the Artful Journey!<br> Start bidding on exquisite artworks!</h2>
        {:else}
            <h2>Unlock your access to our ArtWork Auction site!</h2>
        {/if}

        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} placeholder="john@example.com" required />

        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} placeholder="Abcde123456" required />

        {#if !isLogin}
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" bind:value={confirmPassword} placeholder="Abcde123456" required />
        {/if}

        <button type="submit">{isLogin ? "Log In" : "Register"}</button>

        {#if message}
            <p class="message">{message}</p>
        {/if}

        {#if error}
            <p class="error">{error}</p>
        {/if}

        <p class="toggle-auth">
            {#if isLogin}
                Not a member? <a on:click={toggleAuth}>Register Here!</a>
            {:else}
                Already a member? <a on:click={toggleAuth}>Login Here!</a>
            {/if}
        </p>
    </form>
</section>


<style>
    section {
        background-image: url("../assets/img.png");
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        margin: -1.50rem;
        padding: 3.5em 1.25em;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    form {
        background: #fff;
        padding: 50px;
        width: 300px; /* Set a fixed width */
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 20px 14px 8px #3144e9;
        max-width: 1000px; /* Ensure max width consistency */
        margin-left: auto;
        margin-right: auto; /* Center the form */
    }

    h1 {
        margin: 10px 20px 30px 20px;
        font-size: 40px;
    }

    h2 {
        font-size: 0.85rem;
        margin-bottom: 2rem;
        color: #0ebb0e;
    }

    label {
        margin: 10px 0;
        align-self: flex-start;
        font-weight: 500;
    }

    input {
        border: none;
        border-bottom: 1px solid #ccc;
        margin-bottom: 20px;
        transition: all 300ms ease-in-out;
        width: 100%;
    }

    input:focus {
        outline: 0;
        border-bottom: 1px solid #666;
    }

    button {
        margin-top: 20px;
        background: #0722c4;
        color: white;
        padding: 10px 0;
        width: 200px;
        border-radius: 25px;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        transition: all 300ms ease-in-out;
    }

    button:hover {
        transform: translateY(-2.5px);
        background-color: #0ebb0e;
    }

    .toggle-auth {
        text-align: center;
        padding: 6px;
        font-weight: bold;
        font-size: 13px;
    }

    .toggle-auth a {
        color: #7e11ca;
        cursor: pointer;
    }

    .error {
        color: red;
    }
</style>
