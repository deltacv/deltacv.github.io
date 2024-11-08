<script>
    export let title = "Card Title";
    export let description = "This is the description that appears on hover.";
    export let gifSrc = "/path/to/your.gif"; // URL to the GIF
    export let href = "#"; // URL for the card link
</script>

<style>
    .card {
        position: relative;
        width: 300px;
        border-radius: 20px;
        overflow: hidden;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease;
        box-sizing: border-box;
        background-color: #1a1a1a; /* Dark background for the card */
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5); /* Slight shadow around the card */
    }

    .card:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); /* More pronounced shadow on hover */
    }

    .card img {
        width: 100%;
        height: 60%; /* Takes up 60% of the card height */
        object-fit: cover;
        border-radius: 20px 20px 0 0; /* Rounded corners at the top */
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px;
        border-radius: 20px;
        box-sizing: border-box;
    }

    .card:hover .overlay {
        opacity: 1;
    }

    .footer {
        width: 100%;
        background: #131313; /* Darker background for the footer */
        color: white;
        text-align: center;
        padding: 8px 10px; /* Reduced padding */
        border-radius: 0 0 20px 20px; /* Rounded corners at the bottom */
        box-sizing: border-box;
        font-weight: bold;
        height: 50px; /* Fixed height */
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden; /* Ensures no overflow happens */
    }

    .footer h2 {
        text-decoration: none;
        color: white;
        margin: 0; /* Removes extra space around the title */
        font-size: 16px; /* Adjust font size to fit */
        word-wrap: break-word; /* Prevents text from overflowing */
        max-width: 100%; /* Ensures text stays within the footer */
    }

    /* Optional: Style for the hover state */
    .footer h2:hover {
        color: #f0f0f0; /* Lighter color on hover */
        text-decoration: underline;
    }
</style>

<a href={href} class="card">
    <img src={gifSrc} alt="GIF content" />
    <div class="overlay">
        <p>{description}</p>
    </div>
    <div class="footer">
        <h2>{title}</h2>
    </div>
</a>