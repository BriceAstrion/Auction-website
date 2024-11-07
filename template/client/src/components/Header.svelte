<script>
    export let active;
</script>
<nav>
    <ul>
        <li><a class:active={active === "/"} href="/">Home</a></li>
        <li><a class:active={active === "/about"} href="/about">About</a></li>
    </ul>
</nav>

<style>
    ul {
        list-style-type: none;
    }

    a.active {
        font-weight: bold;
    }
</style>