// ==========================================
// 1. CLOUDINARY CONFIGURATION
// ==========================================
const cloudName = "dvrhzamw";       // 👈 Replace with your actual Cloud Name
const tag = "Reo_family_photos";         // 👈 Replace with the exact tag you saved in Manage & Analyze

// ==========================================
// 2. FETCH AND DISPLAY IMAGES
// ==========================================
function loadCloudinaryPhotos() {
  // This special URL asks Cloudinary for a clean JSON list of all files sharing your tag
  const url = `https://cloudinary.com{cloudName}/image/list/${tag}.json`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Make sure 'Resource list' is allowed in your Cloudinary Security settings.");
      }
      return response.json();
    })
    .then(data => {
      // Find the gallery area on your index.html page
      const galleryContainer = document.getElementById("gallery"); 
      
      if (!galleryContainer) {
        console.error("Could not find an HTML element with id='gallery'");
        return;
      }

      // Clear out the "No photos found" placeholder message or old default photos
      galleryContainer.innerHTML = ""; 

      // If no assets come back from Cloudinary, stop here
      if (!data.resources || data.resources.length === 0) {
        galleryContainer.innerHTML = "<p>No photos found in the cloud yet!</p>";
        return;
      }

      // Loop through every single photo found in your Cloudinary account
      data.resources.forEach(photo => {
        // Construct the permanent public link for the image file
        const imageUrl = `https://cloudinary.com{cloudName}/image/${photo.type}/v${photo.version}/${photo.public_id}.${photo.format}`;
        
        // Create a new image card element dynamically
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Family Memory";
        imgElement.className = "gallery-thumb"; // You can use this class in your CSS to style your image sizes

        // Push the image right into your website layout
        galleryContainer.appendChild(imgElement);
      });
    })
    .catch(error => {
      console.error("Error loading images from cloud storage:", error);
    });
}

// ==========================================
// 3. RUN ON PAGE LOAD
// ==========================================
// This automatically executes the code the split second your visitor opens the site
window.onload = loadCloudinaryPhotos;
