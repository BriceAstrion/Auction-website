<script>
    import { onMount, onDestroy } from "svelte";

    export let endDate;

    let remainingTime = "";
    let timerInterval;

    function calculateRemainingTime() {
        const currentDate = new Date().getTime();
        const endTime = new Date(endDate).getTime();
        const timeDifference = endTime - currentDate;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            remainingTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
            remainingTime = "Auction ended";
        }
    }

    onMount(() => {
        calculateRemainingTime();
        timerInterval = setInterval(calculateRemainingTime, 1000);
    });

    onDestroy(() => {
        clearInterval(timerInterval);
    });
</script>

<p>{remainingTime}</p>

<style>
    p {
        font-size: 1rem;
        margin: 5px 0;
        color: red;
        font-weight: bold;
    }
</style>