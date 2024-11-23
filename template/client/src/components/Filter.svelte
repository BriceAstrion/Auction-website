<script>
    import { onMount } from 'svelte';
    import { ArtworksFiltered } from "../stores/auth.js";

    export let items = [];
    export let country = [];
    export let category = [];
    export let yearOfRelease = [];


    let selectedCountry = '';
    let selectedCategory = '';
    let selectedYearOfRelease = '';
    let filteredItems = items;


    let showCategoryOptions = false;
    let showCountryOptions = false;
    let showYearOptions = false;


    onMount(async () => {
        const response = await fetch('http://localhost:3000/artworks', {
            method: "GET",
        })
        items = await response.json();
        $ArtworksFiltered = items;

        getCountry();
        getCategory();
        getYear();
    });


    const getCountry = () => {
        country = [...new Set(items.map(item => item.country))];
        country = country.sort();
    }

    const getCategory = () => {
        category = [...new Set(items.map(item => item.category))];
        category = category.sort();
    }

    const getYear = () => {
        yearOfRelease = [...new Set(items.map(item => item.yearOfRelease))];
        yearOfRelease = yearOfRelease.sort();
    }

    $: if (selectedCountry || selectedCategory || selectedYearOfRelease) {
        filteredItems = items.filter(item =>
            (selectedCategory === 'All' || !selectedCategory || item.category === selectedCategory) &&
            (selectedCountry === 'All' || !selectedCountry || item.country === selectedCountry) &&
            (selectedYearOfRelease === 'All' || !selectedYearOfRelease || item.yearOfRelease === selectedYearOfRelease)
        );
        $ArtworksFiltered = filteredItems;
    }

    function toggleCategoryOptions() {
        showCategoryOptions = !showCategoryOptions;
    }
    function toggleCountryOptions() {
        showCountryOptions = !showCountryOptions;
    }
    function toggleYearOptions() {
        showYearOptions = !showYearOptions;
    }
</script>


<div class="filter-container">
    <h2>Filters</h2>

    <div class="filter-section">
        <div class="title">Category</div>
        <select id="category" bind:value={selectedCategory} class:show-options={toggleCategoryOptions}>
            <option disabled selected value="">Select a category</option>
            <option value="All">All Categories</option>
            {#each category as item}
                <option value={item}>{item}</option>
            {/each}
        </select>
    </div>

    <div class="filter-section">
        <div class="title">Country</div>
        <select id="country" bind:value={selectedCountry} class:show-options={toggleCountryOptions}>
            <option disabled selected value="">Select a country</option>
            <option value="All">All Countries</option>
            {#each country as land}
                <option value={land}>{land}</option>
            {/each}
        </select>
    </div>


    <div class="filter-section">
        <div class="title">Year Of Release</div>
        <select id="year" bind:value={selectedYearOfRelease} class:show-options={toggleYearOptions}>
            <option disabled selected value="">Select a year</option>
            <option value="All">All Year Of Release</option>
            {#each yearOfRelease as year}
                <option value={year}>{year}</option>
            {/each}
        </select>
    </div>
</div>


<style>
    .filter-container {
        width: 180px;
        height: 50%;
        margin-top: 50px;
        margin-left: -44px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 2px;
        background-color: #f0f0f0;
    }

    h2 {
        margin-top: 10px;
        text-decoration: underline;
    }

    .filter-section {
        margin-bottom: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-top: 25px;
        width: 100%;
    }

    select {
        width: 100%;
        padding: 5px;
        border: 1px solid #3eb7f8;
        border-radius: 3px;
        display: none;
    }

    .show-options {
        display: block;
    }

</style>