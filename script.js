// function to fetch api for user data in JSON format
async function getGithubUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();
        return userData;
        
    } catch (error) {
        console.log("Error: ", error);
        
    }
}

// function to display the user data using DOM Manipulation
function displayUserData(userData) {
    const avatar = document.getElementById('avatar');
    const name = document.getElementById('name');
    const bio = document.getElementById('bio');
    const location = document.getElementById('location');
    const blog = document.getElementById('blog');
    const repos = document.getElementById('repos');
    const followers = document.getElementById('followers');
    const following = document.getElementById('following');

    // checks to show profile card or error message(edge cases covered)
    if (userData.message === 'Not Found') {
        document.getElementById('error').style.display = 'block'
        document.getElementById('profile').style.display = 'none'
    } else {
        document.getElementById('profile').style.display = 'block'
        document.getElementById('error').style.display = 'none'
    }

    // No checks required for these variables
    name.innerText = userData.name;
    avatar.src = userData.avatar_url;
    repos.innerText = userData.public_repos;
    followers.innerText = userData.followers;
    following.innerText = userData.following;

    // check if bio is empty
    if(userData.bio === null) {
        bio.innerText = 'Bio: Empty';
    } else {
        bio.innerText = userData.bio;
    }

    // check if location is not specified
    if (userData.location === null) {
        location.innerText = 'Location: Not Specified';
    } else {
        location.innerText = `Location: ${userData.location}`;
    }

    // check if blog is empty
    if (userData.blog === '') {
        blog.innerText = 'Blog: Empty';
    } else {
        blog.innerHTML = `Blog: <a href="${userData.blog}" target="_blank">${userData.blog}</a>`;
    }
}

// function to handle seach
async function handleSearch() {
    const username = document.querySelector('#username');
    // check for empty username
    if (!username.value.trim()) {
        document.getElementById('error').textContent = 'Please enter a username';
        document.getElementById('error').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
        return;
    }
    
    const userData = await getGithubUserData(username.value);
    displayUserData(userData);
    searchInput.value = "";
}

const searchButton = document.querySelector('#searchBtn');
const searchInput = document.querySelector('#username');

// button click search
searchButton.addEventListener('click', handleSearch);
// input text and click Enter
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
})