<a href="/blog" class="card" aria-label="Blog">
	<div class="icon-container">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="80"
			height="80"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
			<polyline points="14 2 14 8 20 8" />
			<line x1="16" y1="13" x2="8" y2="13" />
			<line x1="16" y1="17" x2="8" y2="17" />
			<polyline points="10 9 9 9 8 9" />
		</svg>
	</div>

	<div class="footer">
		<h2>Blog</h2>
	</div>
</a>

<style>
	/* Import the same font */
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

	/* --- CARD STYLES --- 
       (Copied directly from your ProjectCard.svelte)
    */
	.card {
		font-family: 'Inter', sans-serif;
		position: relative;
		width: 300px; /* <<< KEY */
		border-radius: 16px;
		overflow: hidden;
		cursor: pointer;
		display: flex;
		flex-direction: column;
		background-color: #1a1a1a;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		text-decoration: none;
	}

	.card:hover {
		transform: scale(1.03);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
	}

	/* --- NEW ICON AREA ---
       (Styled to match your .image-container + img)
    */
	.icon-container {
		position: relative;
		width: 100%;
		overflow: hidden;

		/* This is the *most important* part. 
           It forces this div to have the same
           dimensions as your images.
        */
		aspect-ratio: 16 / 9; /* <<< KEY */

		/* This is the placeholder color from your img style */
		background-color: #333;

		/* This centers the SVG icon */
		display: flex;
		align-items: center;
		justify-content: center;

		/* Use the accent color from your title hover */
		color: #4fc3f7;
	}

	/* --- FOOTER STYLES --- 
       (Copied directly from your ProjectCard.svelte)
    */
	.footer {
		width: 100%;
		background: #131313;
		color: white;
		text-align: center;
		padding: 1rem;
		box-sizing: border-box;
		min-height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid rgba(255, 255, 255, 0.1);
	}

	.footer h2 {
		color: white;
		margin: 0;
		font-size: 1.1rem;
		font-weight: 600;
		word-wrap: break-word;
		max-width: 100%;
		transition: color 0.2s ease;
	}

	/* Copied hover effect for the title */
	.card:hover .footer h2 {
		color: #4fc3f7;
	}
</style>