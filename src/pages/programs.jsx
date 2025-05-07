import React from 'react';
import '../styles/programs.css'; // Assuming catalog.css is correctly imported

// Define the program data in an array
const programs = [
    {
        href: "/exhibition",
        alt: "Exhibition",
        imgBase: "img/programs/main-programs/exhibition.jpg",
        title: "Exhibition"
    },
    {
        href: "/raya-championship-of-cosplay",
        alt: "Raya Championship of Cosplay",
        imgBase: "img/programs/main-programs/cosplay-championship.jpg",
        title: "Raya Championship of Cosplay"
    },
    {
        href: "/gaming-competition",
        alt: "Gaming Competition",
        imgBase: "img/programs/main-programs/gaming-competition.jpg",
        title: "Gaming Competition"
    },
    {
        href: "/live-performance",
        alt: "Live Performance",
        imgBase: "img/programs/main-programs/live-performance.jpg",
        title: "Live Performance"
    },
    {
        href: "/coswalk",
        alt: "Coswalk",
        imgBase: "img/programs/main-programs/coswalk.jpg",
        title: "Coswalk"
    },
    {
        href: "/main-guest-talkshow",
        alt: "Main Guest Talkshow",
        imgBase: "img/programs/main-programs/talkshow.jpg",
        title: "Main Guest Talkshow"
    },
    {
        href: "/movie-panel",
        alt: "Movie Panel",
        imgBase: "img/programs/main-programs/movie-panel.jpg",
        title: "Movie Panel"
    },
    {
        href: "/portfolio-review",
        alt: "Portfolio Review",
        imgBase: "img/programs/main-programs/portfolio-review.jpg",
        title: "Portfolio Review"
    },
    {
        href: "/meet-and-greet",
        alt: "Meet & Greet",
        imgBase: "img/programs/main-programs/meet-and-greet.jpg",
        title: "Meet & Greet"
    },
    {
        href: "/workshop",
        alt: "Workshop",
        imgBase: "img/programs/main-programs/workshop.jpg",
        title: "Workshop"
    }
];

// Base URL for images (assuming it's consistent)
const imageBaseUrl = "https://indonesiacomiccon.com";
// Image processing parameters (assuming Nuxt Image format)
const imageParams = "_ipx/f_webp&q_85&s_540x675";

const Programs = () => {

    // Map the program data array to JSX elements and store in a variable
    const programItems = programs.map((program) => {
        const imgSrc = `${imageBaseUrl}/${imageParams}/${program.imgBase}`;
        // Note: The original srcset had duplicate URLs. Replicating that,
        // but ideally, the second URL might have different parameters (e.g., size).
        const imgSet = `${imgSrc} 540w, ${imgSrc} 1080w`;

        return (
            <a
                href={program.href}
                // Use a unique key for each item when mapping
                key={program.href}
                className="relative isolate block overflow-hidden rounded-xl border border-border bg-gray-100 transition duration-300 @container hover:ring-2 hover:ring-blue-600 dark:bg-gray-900 sm:rounded-2xl" // Added hover effect example
            >
                <img
                    onError={(e) => e.currentTarget.setAttribute('data-error', '1')}
                    width="540px"
                    height="675px"
                    alt={program.alt}
                    loading="lazy"
                    data-nuxt-img="" // Keep if needed for Nuxt Image functionality
                    sizes="540px" // Adjust if necessary based on layout
                    srcSet={imgSet}
                    className="pointer-events-none relative z-0 h-full w-full select-none object-cover transition-transform duration-300 group-hover:scale-105" // Added example hover effect
                    src={imgSrc}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 flex h-20 flex-col items-center justify-end bg-gradient-to-t from-black/60 to-transparent px-3 pb-1.5 text-center @[300px]:px-5 @[300px]:pb-5">
                    {/* Added 'inline-block' to potentially fix the span visibility issue from previous question */}
                    <span className={
                        // Keep other necessary classes (Tailwind or custom) for layout, font size, etc.
                        "inline-block mb-3 text-base font-extrabold !leading-[1.2] tracking-tighter " +
                        // Add the new CSS class for the stroke effect
                        "program-title-stroked " +
                        "@[300px]:text-xl" // Keep responsive size adjustment if needed
                        // Removed Tailwind text-black, arbitrary properties, and drop-shadow
                    }>
                        {program.title}
                    </span>
                </div>
            </a>
        );
    });

    return (
        <div className="container" style={{ zIndex: 1, paddingBlock: '100px', backgroundColor: 'black'}}>
            <div className="flex flex-col items-center text-center">
                <h2 className="section-title" style={{color: 'yellow'}}>Programs</h2>
                <p className="mt-4 max-w-screen-md text-base tracking-tight sm:text-xl" style={{color: 'yellow'}}>
                    Immerse yourself in the heart of ICC with our main programs, featuring world-class exhibitions, thrilling competitions, and exclusive panels that bring the world of pop culture to life.
                </p>
            </div>
            {/* Render the program items stored in the variable */}
            <section className="grid grid-cols-2 gap-2 xl:grid-cols-4 2xl:grid-cols-5 mt-6 lg:mt-10">
                {programItems}
            </section>
        </div>
    );
}

export default Programs;