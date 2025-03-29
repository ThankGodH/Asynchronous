// Simulated API calls with Promises
function fetchUserProfile() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let success = Math.random() > 0.2;
        if (success) {
            resolve({ id: userId, name: "John Doe" });
        } else {
            reject("Failed to fetch user profile.");
        }
    }, 1000);
  });
}

function fetchUserPosts(userId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let success = Math.random() > 0.2;
        if (success) {
            resolve([{ id: 1, userId, title: "Post 1" }, { id: 2, title: "Post 2" }]);
        } else {
            reject("Failed to fetch posts.");
        }
    }, 1500);
    });
}

function fetchComments(postId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let success = Math.random() > 0.2;
        if (success) {
            resolve([{ id: 1, postId, text: "Nice post!" }, { id: 2, postId, text: "Great read!" }]);
        } else {
            reject("Failed to fetch comments.");
        }
     }, 2000);
    });
  }

// Sequential Fetching using async/await
async function getUserContentSequential() {
    try {
        console.log("Fetching user profile...");
        const user = await fetchUserProfile();
        console.log("User profile retrieved:", user);
        
        console.log("Fetching user posts...");
        const posts = await fetchUserPosts(user.id);
        console.log("Posts retrieved:", posts);
        
        for (const post of posts) {
            console.log(`Fetching comments for Post ID ${post.id}...`);
            post.comments = await fetchComments(post.id);
            console.log(`Comments retrieved for Post ID ${post.id}:`, post.comments);
        }
        
        console.log("Final Data:", { user, posts });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Parallel Fetching using Promise.all
async function getUserContentParallel() {
    try {
        console.log("Fetching all data in parallel...");
        const [user, posts] = await Promise.all([fetchUserProfile(), fetchUserPosts(1)]);
        
        const commentsPromises = posts.map(post => fetchComments(post.id));
        const comments = await Promise.all(commentsPromises);
        
        posts.forEach((post, index) => {
            post.comments = comments[index];
        });
        
        console.log("Final Data:", { user, posts });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Function to simulate delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Sequential execution with delays
async function executeTasks() {
    console.log('Task 1: Start');
    await delay(1000);
    console.log('Task 1: End');

    console.log('Task 2: Start');
    await delay(2000);
    console.log('Task 2: End');
}

// Run the functions sequentially and in parallel
getUserContentSequential().then(() => getUserContentParallel());
executeTasks();
