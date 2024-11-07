<main class="about">
    <h2>Welcome To ArtWorld</h2>

    <div class="content-container">
        <section class="content">
            <p>
                ArtWorld is your gateway to a world of art,<br>
                Bringing breathtaking paintings and sculptures to start,<br>
                From cultures around the globe, we play our part,<br>
                Connecting art enthusiasts with masterpieces, that's our art.
            </p>
            <p>
                Whether you're an avid collector, connoisseur with heart,<br>
                Or simply someone who appreciates beauty from the very start,<br>
                ArtWorld offers a unique platform, a work of fine art,<br>
                To discover, bid, and own extraordinary pieces, that's the chart.
            </p>
            <p>
                Join our vibrant community, where passions spark,<br>
                Embark on a journey through time and culture, leave your mark,<br>
                With every stroke of brush and chisel, create a spark,<br>
                Experience the magic of art at ArtWorld today, embark!<br>
                Peace & Love!
            </p>
        </section>

        <div class="poem">
            <p>
                In galleries of color and halls of form,<br>
                Where brush and chisel wield their artistry,<br>
                A world of dreams and stories do they storm,<br>
                In paintings and in sculpture's tapestry.<br>
            </p>
            <p>
                With strokes of brilliance, canvases come alive,<br>
                Each hue and shade, a window to the soul,<br>
                In every stroke, the artist seeks to dive,<br>
                To capture life's essence, make it whole.<br>
            </p>
            <p>
                In marble's grace and bronze's steady hold,<br>
                Sculptors breathe life into inert stone,<br>
                With careful hands and visions pure and bold,<br>
                They carve emotions in each curve and bone.<br>
            </p>
        </div>

        <div class="poem2">
            <p>
                Through eyes that see and hearts that understand,<br>
                They conjure worlds from simple grains of sand,<br>
                From canvas, stone, and every master's hand,<br>
                A symphony of art, forever grand.<br>
            </p>
            <p>
                For in these works, emotions do transcend,<br>
                To touch our hearts, our spirits gently mend,<br>
                In paintings and in sculptures, we find,<br>
                A timeless beauty, a transcendent mind.<br>
            </p>
            <p>
                So let us cherish art's enduring grace,<br>
                In every stroke and every sculpted face,<br>
                For in these forms, our souls find their place,<br>
                In the world of art, where dreams embrace.
            </p>
        </div>
    </div>
</main>


<script>
    document.querySelectorAll(".content p, .poem p, .poem2 p").forEach((p) => {
        p.innerHTML = p.textContent
            .split(" ")
            .map(word => `<span>${word}</span>`)
            .join(" ");
    });
</script>


<style>
    main.about {
        text-align: center;
        background: linear-gradient(120deg, #05fb80, #03d2fd, #d2e61b, #25d1cc);
        background-size: 400% 400%;
        animation: gradientBackground 10s ease infinite;
        padding: 3.5em 1.25em;
        color: #f60707;
        font-family: Arial, sans-serif;
        margin: -1.5rem;
        position: relative;
    }

    @keyframes gradientBackground {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }

    main.about::before, main.about::after {
        content: "";
        position: absolute;
        border-radius: 50%;
        opacity: 0.9;
        animation: floatBubbles 15s infinite ease-in-out;
        pointer-events: none;
    }

    main.about::before {
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(246, 2, 189, 0.5), transparent);
        top: 10%;
        left: 15%;
        animation-delay: 0s;
    }

    main.about::after {
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(239, 5, 5, 0.3), transparent);
        bottom: 15%;
        right: 10%;
        animation-delay: 5s;
    }

    @keyframes floatBubbles {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-30px); }
    }

    .content-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }

    .content, .poem, .poem2 {
        opacity: 0;
        animation-duration: 3s;
        animation-fill-mode: forwards;
    }

    .content {
        animation-name: slideInLeft;
        animation-delay: 0s;
    }

    .poem {
        animation-name: fadeIn;
        animation-delay: 3s;
    }

    .poem2 {
        animation-name: slideInRight;
        animation-delay: 6s;
    }

    @keyframes slideInLeft {
        from { opacity: 0; transform: translateX(-50%); }
        to { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(50%); }
        to { opacity: 1; transform: translateX(0); }
    }

    p {
        font-size: 1.1rem;
        color: #0e0e0d;
        text-align: left;
        font-family: "Charm", cursive;
        line-height: 1.5em;
    }

    h2 {
        font-size: 2.8rem;
        color: #cd0430;
        font-family: "Times New Roman", serif;
        animation: fadeIn 2s ease-in-out;
    }
</style>