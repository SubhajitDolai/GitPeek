// Function to fetch request(github API) for user data in JSON format
async function getGithubUserData(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const userData = await response.json();
        return userData;
        
    } catch (error) {
        console.log("Error: ", error);
        
    }
}

// Function to fetch request(github API) for user's repos. data in JSON format
async function getGithubUserRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const userRepos = await response.json();
        return userRepos;

    } catch (error) {
        console.log('Error: ', error);
        
    }
}

// Function to display the user data using DOM Manipulation
function displayUserData(userData) {
    // checks to show profile card or error message(edge cases covered)
    if (userData.message === 'Not Found') {
        document.getElementById('error').textContent = 'User not found!';
        document.getElementById('error').style.display = 'block'
        document.getElementById('profile').style.display = 'none'
        document.getElementById('repos-section').style.display = 'none';
        document.getElementById('repos-grid').innerHTML = '';
        return;
    } else {
        document.getElementById('error').style.display = 'none'
        document.getElementById('profile').style.display = 'block'
        document.getElementById('repos-section').style.display = 'none';
        document.getElementById('repos-grid').innerHTML = '';
    }

    // variables
    const avatar = document.getElementById('avatar');
    const name = document.getElementById('name');
    const bio = document.getElementById('bio');
    const location = document.getElementById('location');
    const blog = document.getElementById('blog');
    const repos = document.getElementById('repos');
    const followers = document.getElementById('followers');
    const following = document.getElementById('following');

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
        blog.innerText = 'Website: Empty';
    } else {
        blog.innerHTML = `Website: <a href="${userData.blog}" target="_blank">${userData.blog}</a>`;
    }
}

// Function to display the user's repos data using DOM Manipulation
function displayUserRepos(userRepos) {
    // handling edge cases with checks
    if (userRepos.message === 'Not Found') {
        return;
    } else {
        document.getElementById('repos-section').style.display = 'block';
    }

    for (const repo of userRepos) {
        // variables
        const repoName = repo.name;
        let description = repo.description;
        let language = repo.language;
        const starCnt = repo.stargazers_count;
        const forkCnt = repo.forks_count;
        const repoURL = repo.html_url;
        const lastUpdated = repo.pushed_at;

        // formating the "lastUpdated" date string to my preference
        const date = new Date(lastUpdated).toDateString();

        // checks for null value
        if(language === null){
            language = 'Unknown';
        }
        if (description === null) {
            description = 'No description available';
        }

        // colors for every famous language to be displayed in dot
        let languageColor = '';
        if (language === 'JavaScript') {
            languageColor = '#f1e05a'; // Yellow
        } else if (language === 'Python') {
            languageColor = '#306998'; // Blue
        } else if (language === 'Java') {
            languageColor = '#b07219'; // Brown
        } else if (language === 'Ruby') {
            languageColor = '#701516'; // Red
        } else if (language === 'PHP') {
            languageColor = '#4f5d95'; // Purple
        } else if (language === 'C++') {
            languageColor = '#f34b7d'; // Pinkish
        } else if (language === 'C#') {
            languageColor = '#178600'; // Green
        } else if (language === 'TypeScript') {
            languageColor = '#3178c6'; // Blue
        } else if (language === 'Go') {
            languageColor = '#00ADD8'; // Blue
        } else if (language === 'Swift') {
            languageColor = '#ff914d'; // Orange
        } else if (language === 'Kotlin') {
            languageColor = '#F18E33'; // Orange
        } else if (language === 'Rust') {
            languageColor = '#000000'; // Black
        } else if (language === 'Dart') {
            languageColor = '#00B0B9'; // Cyan
        } else if (language === 'Lua') {
            languageColor = '#000080'; // Navy
        } else if (language === 'Shell') {
            languageColor = '#89e051'; // Green
        } else if (language === 'SQL') {
            languageColor = '#e38c00'; // Yellow
        } else {
            languageColor = '#ccc'; // Default color for unknown languages
        }

        // append(+=) repo cards after each itteration (I was changing the innerHTML(=) every itteration so it displayed only last card😂)
        document.getElementById('repos-grid')
        .innerHTML += 
        `
            <div class="repo-card">
                <a href="${repoURL}" class="repo-name">${repoName}</a>
                <p class="repo-description">${description}</p>
                <div class="repo-stats">
                    <div class="repo-stat">
                        <span class="repo-language-dot" style="background: ${languageColor};"></span>
                        <span>${language}</span>
                    </div>
                    <div class="repo-stat">
                        <span>⭐</span>
                        <span>${starCnt}</span>
                    </div>
                    <div class="repo-stat">
                        <span>🔄</span>
                        <span>${forkCnt}</span>
                    </div>
                    <div class="repo-stat">
                        Updated on ${date}
                    </div>
                </div>
            </div>
        `
    }
}

// Function to handle seach
async function handleSearch() {
    const username = document.querySelector('#username');
    // check for empty username
    if (!username.value.trim()) {
        document.getElementById('error').textContent = 'Please enter a username';
        document.getElementById('error').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('repos-section').style.display = 'none';
        return;
    }
    
    // User-data
    const userData = await getGithubUserData(username.value);
    displayUserData(userData);

    // User's repos data
    const userRepos = await getGithubUserRepos(username.value);
    displayUserRepos(userRepos);

    // clear input-box after data is displayed
    searchInput.value = "";
}

// -----------------------global-------------------------
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