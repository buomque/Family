// ==========================================
// 1. CLOUDINARY CONFIGURATION
// ==========================================
window.cloudName = "dvrhzamw";       // 👈 Replace with your actual Cloud Name
window.tag = "Reo_family_photos";         // 👈 Replace with your exact Cloudinary tag

// ==========================================
// 2. FETCH AND DISPLAY IMAGES
// ==========================================
function loadCloudinaryPhotos() {
  console.log("Scripts.js is running and connecting to Cloudinary...");
  
  // special URL asking Cloudinary for files sharing your tag
  const url = `https://cloudinary.com{cloudName}/image/list/${tag}.json`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Make sure 'Resource list' is allowed/unrestricted in your Cloudinary Security settings.");
      }
      return response.json();
    })
    .then(data => {
      // ⭐ MATCHED CONTAINER: Target your exact HTML id="gallery-grid"
      const galleryContainer = document.getElementById("gallery-grid"); 
      
      if (!galleryContainer) {
        console.error("Could not find an HTML element with id='gallery-grid'!");
        return;
      }

      // Clear out the "No photos found" placeholder box automatically
      const emptyStateBox = document.getElementById("empty-state");
      if (emptyStateBox) emptyStateBox.style.display = "none";
      
      galleryContainer.innerHTML = ""; 

      if (!data.resources || data.resources.length === 0) {
        galleryContainer.innerHTML = "<p class='col-span-full text-center text-slate-500'>No photos found in the cloud with this tag yet!</p>";
        return;
      }

      // Update the little photo counter badge at the top of your site
      const counterBadge = document.getElementById("photo-count-badge");
      if (counterBadge) counterBadge.innerText = data.resources.length;

      // Loop through every photo found in your Cloudinary account
      data.resources.forEach(photo => {
        const imageUrl = `https://cloudinary.com{cloudName}/image/${photo.type}/v${photo.version}/${photo.public_id}.${photo.format}`;
        
        // Build a beautiful Tailwind-styled photo card that matches your layout theme
        const cardElement = document.createElement("div");
        cardElement.className = "bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-md transition-shadow group";
        
        cardElement.innerHTML = `
          <div class="aspect-square w-full bg-slate-100 overflow-hidden relative">
            <img src="${imageUrl}" loading="eager" alt="Family Memory" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
          </div>
        `;

        // Push the finished card into your gallery layout row
        galleryContainer.appendChild(cardElement);
      });
    })
    .catch(error => {
      console.error("Error drawing images from cloud storage:", error);
    });
}

// Run this function instantly when the web page finishes loading structural frames
window.onload = loadCloudinaryPhotos;
