'use client'
import { FC, useEffect, useRef, useState } from "react"
import WebpageToo from "./WebpageToo"
import { HTML_WEB_CODE } from "./HTMLCode"

interface PlaygroundwebsiteDesignsectionprops {
    generatedCode: any
}

const PlaygroundWebsiteDesignsection: FC<PlaygroundwebsiteDesignsectionprops> = ({ generatedCode }) => {

    const [screensizesWeb, setScreensizesWeb] = useState<string>('web')

    const iFrameRef = useRef<HTMLIFrameElement>(null)

    //Initialize Iframe shell once
    useEffect(() => {

        const iframe = iFrameRef.current;

        if (!iframe) return;

        // =====================================
        // GET IFRAME DOCUMENT
        // =====================================
        const doc =
            iframe.contentDocument ||
            iframe.contentWindow?.document;

        if (!doc) return;

        // =====================================
        // WRITE HTML INTO IFRAME
        // =====================================
        doc.open();
        doc.write(HTML_WEB_CODE);
        doc.close();

        // Wait until iframe body is ready
        const timeout = setTimeout(() => {

            if (!doc.body) return;

            let hoverEl: HTMLElement | null = null;
            let selectedEl: HTMLElement | null = null;

            // =====================================
            // HOVER EFFECT
            // =====================================
            const handleMouseOver = (e: MouseEvent) => {

                const target = e.target as HTMLElement;

                // Ignore body/html
                if (target === doc.body || target === doc.documentElement) return;

                // Don't change outline
                // for selected element
                if (selectedEl === target) return;

                // Remove previous hover
                if (hoverEl && hoverEl !== target) {
                    hoverEl.style.outline = "";
                }

                hoverEl = target;
                hoverEl.style.outline = "2px dotted blue";
            };

            // =====================================
            // REMOVE HOVER
            // =====================================
            const handleMouseOut = () => {

                if (hoverEl && hoverEl !== selectedEl) {
                    hoverEl.style.outline = "";
                    hoverEl = null;
                }
            };

            // =====================================
            // SAVE AFTER EDIT
            // =====================================
            const handleBlur = () => {

                if (selectedEl) {
                    console.log("Updated Element:", selectedEl.outerHTML);
                }
            };

            // =====================================
            // CLICK SELECT
            // =====================================
            const handleClick = (e: MouseEvent) => {

                e.preventDefault();
                e.stopPropagation();

                const target = e.target as HTMLElement;

                // Ignore body/html
                if (target === doc.body || target === doc.documentElement) return;

                // Remove previous selected
                if (selectedEl && selectedEl !== target) {
                    selectedEl.style.outline = "";
                    selectedEl.removeAttribute("contenteditable");
                    selectedEl.removeEventListener("blur", handleBlur);
                }

                selectedEl = target;
                // Selected Border
                selectedEl.style.outline = "2px solid red";
                // Editable Tags
                const editableTags = [
                    "P",
                    "SPAN",
                    "H1",
                    "H2",
                    "H3",
                    "H4",
                    "H5",
                    "H6",
                    "BUTTON",
                    "A",
                    "LI"
                ];

                // Make editable
                if (editableTags.includes(selectedEl.tagName)
                ) {

                    selectedEl.setAttribute("contenteditable", "true");
                    selectedEl.focus();
                }

                selectedEl.addEventListener("blur", handleBlur);
                console.log("Selected Element:", selectedEl);
            };

            // =====================================
            // ESCAPE KEY REMOVE SELECTION
            // =====================================
            const handleKeyDown = (e: KeyboardEvent) => {

                if (e.key === "Escape" && selectedEl) {

                    selectedEl.style.outline = "";
                    selectedEl.removeAttribute("contenteditable");
                    selectedEl.removeEventListener("blur", handleBlur);
                    selectedEl = null;
                }
            };

            // =====================================
            // EVENTS
            // =====================================
            doc.body.addEventListener("mouseover", handleMouseOver);
            doc.body.addEventListener("mouseout", handleMouseOut);
            doc.body.addEventListener("click", handleClick);
            doc.addEventListener("keydown", handleKeyDown);

        }, 100);

        // =====================================
        // CLEANUP
        // =====================================
        return () => {
            clearTimeout(timeout);
            if (!doc.body) return;
            doc.body.replaceWith(
                doc.body.cloneNode(true)
            );
        };

    }, []);

    //Update only when code changes
    useEffect(() => {
        if (!iFrameRef.current) return;
        const doc = iFrameRef.current.contentDocument;
        if (!doc) return;

        const root = doc.getElementById('root')
        if (root) {
            root.innerHTML = generatedCode?.replaceAll("```html", "")
                .replaceAll("```", '')
                .replace("html", '') ?? ""
        }
    }, [generatedCode])

    return (
        <div className="p-5 w-full flex items-center justify-center flex-col">
            <iframe ref={iFrameRef}
                sandbox="allow-scripts allow-same-origin"
                className={`${screensizesWeb === 'web' ? 'w-full' : 'w-100'}  h-150  rounded-2xl border-2`}></iframe>
            <WebpageToo
                screensizesWeb={screensizesWeb}
                setScreensizesWeb={setScreensizesWeb}
                generatedCode={generatedCode}
            />
        </div>

        // <div className='p-4 flex-1 h-full overflow-y-auto'>
        //     <div className="" dangerouslySetInnerHTML={{
        //         __html: `
        //         <!DOCTYPE html>
        //             <html lang="en">
        //             <head>
        //                 <meta charset="UTF-8">
        //                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
        //                 <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
        //                 <title>AI Website Builder</title>

        //                 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

        //                 <!-- Tailwind CSS -->
        //                 <script src="https://cdn.tailwindcss.com"></script>

        //                 <!-- Flowbite CSS & JS -->
        //                 <link
        //                     href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
        //                     rel="stylesheet">
        //                 <script
        //                     src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js">
        //                 </script>

        //                 <!-- Font Awesome Icons -->
        //                 <link
        //                     rel="stylesheet"
        //                     href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        //                     integrity="sha512-SnhWK+zQj+Mj7Vp7k8E5x29nLNX6j+cWen/Xg7fGqOpM8R1+a5/fQ1fJb01Tz2uE5wP5yQ5uI5uA=="
        //                     crossorigin="anonymous"
        //                     referrerpolicy="no-referrer"
        //                 />

        //                 <!-- Chart.js for charts & graphs -->
        //                 <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

        //                 <!-- AOS (Animate On Scroll) for scroll animations -->
        //                 <link
        //                     href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css"
        //                     rel="stylesheet">
        //                 <script
        //                     src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js">
        //                 </script>

        //                 <!-- GSAP (GreenSock) for advanced animations -->
        //                 <script
        //                     src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js">
        //                 </script>

        //                 <!-- Lottie for JSON-based animations -->
        //                 <script
        //                     src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.11.2/lottie.min.js">
        //                 </script>

        //                 <!-- Swiper.js for sliders/carousels -->
        //                 <link
        //                     rel="stylesheet"
        //                     href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
        //                 <script
        //                     src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js">
        //                 </script>

        //                 <!-- Optional: Tooltip & Popover library (Tippy.js) -->
        //                 <link
        //                     rel="stylesheet"
        //                     href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
        //                 <script src="https://unpkg.com/@popperjs/core@2"></script>
        //                 <script src="https://unpkg.com/tippy.js@6"></script>

        //             </head>
        //             <body>

        //                 ${!generatedCode ? 'Website Generate' : generatedCode}

        //             </body>
        //             </html>
        //         `}}>

        //     </div>
        // </div>
    )
}

export default PlaygroundWebsiteDesignsection