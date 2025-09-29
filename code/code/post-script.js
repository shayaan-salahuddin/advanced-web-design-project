// Function that handles loading in the posts. Previously created posts are stored in local memory.
// If this is the very first time loading the webpage, then one sample post is uploaded
function loadPosts() {
  return JSON.parse(localStorage.getItem('posts')) || [];
}

function savePosts(posts) {
  localStorage.setItem('posts', JSON.stringify(posts));
}

// Page routing! This event listener handles going from the community posts page to the form page.
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    if (path.endsWith("posts.html") || path === "/" || path === "/posts" || path.endsWith("/code")) {
        renderPostsPage();
    }
    else if (path.endsWith("createPost.html")) {
        setupCreateForm();
    }
});

// function to load in the posts in the community posts page
function renderPostsPage() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    const username = userData.username || "Anonymous";
    const posts = loadPosts();
    const container = document.getElementById('post-list');
    container.innerHTML = '';
    posts.forEach((post, idx) => {
        const postDiv = document.createElement("div");
        postDiv.className = "card";

        // fun functionaliy: users can like (or unlike) posts 
        // post like count goes up or down reflecting a like or unlike
        postDiv.innerHTML = `
        <img src="${post.image}" alt="Location Image" />
        <h3>${post.location}</h3>
        <p><strong>Date:</strong> ${new Date(post.date).toLocaleDateString()}</p>
        <p>${post.description}</p>
        <button data-id="${post.id}">❤️ Like (<span>${post.likes}</span>)</button>
        `;

        const button = postDiv.querySelector("button");
        const likedKey = `liked-${post.id}`;
        // Initialize button state based on if user liked this post
        const isLiked = localStorage.getItem(likedKey) === "true";
        if (isLiked) {
            button.textContent = `❤️ Unlike (${post.likes})`;
        }
        else {
            button.textContent = `❤️ Like (${post.likes})`;
        }
        button.addEventListener("click", () => {
            const likedNow = localStorage.getItem(likedKey) === "true";
            if (likedNow) {
                // Unlike: decrement likes, remove liked flag
                post.likes = Math.max(post.likes - 1, 0);
                localStorage.removeItem(likedKey);
                button.textContent = `❤️ Like (${post.likes})`;
            }
            else {
                // Like: increment likes, add liked flag
                post.likes++;
                localStorage.setItem(likedKey, "true");
                button.textContent = `❤️ Unlike (${post.likes})`;
            }
            savePosts(posts);
        });
        container.appendChild(postDiv);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-post-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            const posts = loadPosts();
            posts.splice(idx, 1);
            savePosts(posts);
            renderPosts();
        });
    });
}
// the logic behind setting up the page.
function setupCreateForm() {
    const form = document.getElementById("newForm");
    form.addEventListener("submit", (e) => {
        var _a;
        e.preventDefault();
        const imageInput = document.getElementById("image");
        const locationInput = document.getElementById("location");
        const dateInput = document.getElementById("date");
        const descriptionInput = document.getElementById("description");
        const file = (_a = imageInput.files) === null || _a === void 0 ? void 0 : _a[0];
        if (!file)
            return alert("Please upload an image");
        const reader = new FileReader();
        reader.onload = function () {
            const newPost = {
                id: crypto.randomUUID(),
                image: reader.result,
                location: locationInput.value,
                date: dateInput.value,
                description: descriptionInput.value,
                likes: 0,
                username // <-- add this line
            };
            const posts = loadPosts();
            posts.unshift(newPost);
            savePosts(posts);
            window.location.href = "posts.html";
        };
        reader.readAsDataURL(file);
    });
}

// Only add sample posts if there are none in localStorage
if (!localStorage.getItem('posts') || JSON.parse(localStorage.getItem('posts')).length === 0) {
    const samplePosts = [
        {
            id: "sample-pupcup-photograph",
            image: 'images/pupcup.jpg',
            location: 'Starbucks (Cabin John Shopping Village)',
            date: '2025-04-17',
            description: 'Amazing experience! Upon asking employees, we received a free pup-cup!',
            likes: 3
        },
        {
            id: "sample-lost-dog",
            image: 'https://place-puppy.com/300x200',
            location: 'Hyde Park',
            date: '2025-05-01',
            description: 'Lost small brown poodle near the fountain. Please contact me if you have any info!',
            likes: 1
        },
        {
            id: "sample-dog-walking",
            image: 'https://place-puppy.com/301x200',
            location: 'Main Entrance',
            date: '2025-05-03',
            description: 'Dog walking group meets every Saturday at 9am. All breeds welcome!',
            likes: 2
        },
        {
            id: "sample-vet-recommendation",
            image: 'https://place-puppy.com/302x200',
            location: 'Downtown Vet Clinic',
            date: '2025-05-05',
            description: 'Looking for a good vet in the area. Any suggestions?',
            likes: 0
        },
        // Add more sample posts below
        {
            id: "sample-free-toys",
            image: 'https://place-puppy.com/303x200',
            location: 'Community Center',
            date: '2025-05-10',
            description: 'Giving away gently used dog toys. Message me if interested!',
            likes: 4
        },
        {
            id: "sample-dog-sitter",
            image: 'https://place-puppy.com/304x200',
            location: 'Northside Park',
            date: '2025-05-12',
            description: 'Experienced dog sitter available on weekends. References upon request.',
            likes: 2
        },
        {
            id: "sample-playdate",
            image: 'https://place-puppy.com/305x200',
            location: 'Dog Park',
            date: '2025-05-15',
            description: 'Anyone interested in a puppy playdate this Sunday afternoon?',
            likes: 5
        },
        {
            id: "sample-training-tips",
            image: 'https://place-puppy.com/306x200',
            location: 'Online',
            date: '2025-05-18',
            description: 'Sharing some tips that helped my dog stop barking at the doorbell!',
            likes: 3
        }
    ];
    localStorage.setItem('posts', JSON.stringify(samplePosts));
}

const userData = JSON.parse(localStorage.getItem('userData')) || {};
const username = userData.username || "Anonymous";

