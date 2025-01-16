# GitPeek

**GitPeek** is a simple and interactive web application that allows users to input a GitHub username and fetch detailed profile information using the GitHub API. It's an intuitive and minimalistic way to explore public data about GitHub users.

---

## Live Demo

Check out the live version of the project here:  
[**GitPeek**](https://subhajitdolai.github.io/GitPeek/)

---

## Features

- Fetches and displays detailed GitHub profile information, including:
  - Profile picture
  - Name
  - Bio
  - Location
  - Blog/Website
  - Public repositories count
  - Followers and following count
- Displays a card for each public repository with:
  - Repository name (clickable link to the repo)
  - Description
  - Primary programming language with color-coded badges
  - Star count
  - Fork count
  - Last updated date
- User-friendly and responsive interface.
- Input validation to prevent spaces in the username field.
- Error handling to display meaningful messages for invalid usernames or API failures.

---

## Screenshots

![GitPeek Screenshot](/Screenshot.png)  
*Example of the user interface displaying profile data.*

---

## Upcoming Features

- Display pinned repositories with their details.
- Most-used programming languages represented as a pie chart.
- Links to connected social accounts like Twitter or LinkedIn (if available).
- Enhanced repository cards with additional metadata.

---

## Technologies Used

- **HTML**: For structuring the application.
- **CSS**: For styling and responsive design.
- **JavaScript**: For fetching and dynamically displaying data using the GitHub REST API.

---

## Installation and Usage

1. Clone the repository:
   ```bash
   git clone https://github.com/subhajitdolai/GitPeek.git
   ```

2. Navigate to the project directory:
   ```bash
   cd GitPeek
   ```

3. Open the `index.html` file in your preferred browser or host it on a live server for the best experience.

---

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with your changes. Try to implement the above features mentioned.

---

## Acknowledgements

- GitHub API Documentation: [GitHub REST API](https://docs.github.com/en/rest)

---