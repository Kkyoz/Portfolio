document.addEventListener("DOMContentLoaded", function () {
  // Enable smooth scrolling on anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      // Smoothly scroll to the target section
      window.scrollTo({
        top: targetSection.offsetTop - document.querySelector('.navBar').offsetHeight,  // Adjust for navbar height
        behavior: 'smooth'
      });
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const gallerySlide = document.querySelector('.gallery-slide');
    const images = document.querySelectorAll('.gallery-slide img');
    const totalImages = images.length;  // Total number of images (13 after cloning)
    const imageWidth = images[0].width + 20;  // Width of an image + margin
    let currentIndex = 0;

    // Function to update the gallery by moving images
    function moveToNextImage() {
        currentIndex++;

        // If we reach the last set of images (11-12-13, which are actually 2-3-4),
        // smoothly scroll to that set first before instantly jumping back to 1-2-3
        if (currentIndex === totalImages - 3) {
            // Smooth scroll to the second-to-last set (11-12-13) of images
            gallerySlide.style.transition = 'transform 1s ease-in-out';  
            const offset = -(currentIndex * imageWidth); 
            gallerySlide.style.transform = `translateX(${offset}px)`;

            // After 1 second, reset to first set (1-2-3) without animation
            setTimeout(() => {
                gallerySlide.style.transition = 'none';  // Disable transition
                gallerySlide.style.transform = 'translateX(0)';  // Jump back to the first images
                currentIndex = 0;  // Reset index to first set (1-2-3)

                // Re-enable transition for the next scroll
                setTimeout(() => {
                    gallerySlide.style.transition = 'transform 1s ease-in-out';  // Re-enable smooth transition
                }, 50);
            }, 1000);  // Wait for the smooth scroll transition to finish
        } else {
            // Normal scrolling to the next set of images
            const offset = -(currentIndex * imageWidth); 
            gallerySlide.style.transition = 'transform 1s ease-in-out';  // Apply smooth transition
            gallerySlide.style.transform = `translateX(${offset}px)`;
        }
    }

    // Set the interval for automatic scrolling (e.g., every 3 seconds)
    setInterval(moveToNextImage, 3000);  // Change images every 1 second (1000ms)
});
