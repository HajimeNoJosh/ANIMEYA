function Scroll(today) {
    const element = document.getElementById("container-wrapper-" + today.toDateString())
    const scrollElements = document.getElementsByClassName("container_body-wrapper")

    if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        element.scrollIntoView({ top: y, behavior: 'smooth' })
    }

    const handleScroll = () => {
        // Get the current scroll position
        // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Loop through elementRefs and find the top visible element
        let topMostVisibleElement = null; // Keep track of the topmost visible element
        [...scrollElements].forEach((container) => {
            // Get the first child element of the container
            const firstChildElement = container.firstElementChild;

            // Get the bounding rect of the first child element
            const rect = firstChildElement.getBoundingClientRect();

            // Check if the first child element is fully visible in the viewport
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                // Update the topMostVisibleElement if applicable
                if (!topMostVisibleElement || rect.top < topMostVisibleElement.getBoundingClientRect().top) {
                    topMostVisibleElement = firstChildElement;
                }
            }
        });

        // Loop through elementRefs again and apply classes
        [...scrollElements].forEach((container) => {
            // Get the first child element of the container
            const firstChildElement = container.firstElementChild;

            // Check if the first child element is the topmost visible element
            if (firstChildElement === topMostVisibleElement) {
                // Get the bounding rect of the first child element
                const rect = firstChildElement.getBoundingClientRect();

                // Check if the element is completely visible in the viewport
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    // Apply the "active" class
                    firstChildElement.classList.add("container_body-wrapper-date-active");
                    firstChildElement.classList.remove("container_body-wrapper-date-inactive");
                } else {
                    // Apply the "inactive" class if the new element is completely at the top
                    firstChildElement.classList.add("container_body-wrapper-date-inactive");
                    firstChildElement.classList.remove("container_body-wrapper-date-active");
                }
            } else {
                // Apply the "inactive" class to all other elements
                firstChildElement.classList.add("container_body-wrapper-date-inactive");
                firstChildElement.classList.remove("container_body-wrapper-date-active");
            }
        });
    };



    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    // Clean up the event listener when the component unmounts or when elementRefs changes
    return () => {
        window.removeEventListener("scroll", handleScroll); // Remove scroll event listener
    };
}

export default Scroll;
