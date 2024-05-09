document.addEventListener("DOMContentLoaded", function () {
    const repoContainer = document.getElementById("repositories");
    const paginationContainer = document.getElementById("pagination");
    let currentPage = 1;

    // Function to fetch repositories from GitHub API
    async function fetchRepositories(page) {
        const perPage = 10; // Number of repositories per page
        const response = await fetch(`https://api.github.com/user/repos?page=${page}&per_page=${perPage}`, {
            headers: {
                Authorization: "Bearer YOUR_ACCESS_TOKEN" // Replace with your GitHub access token
            }
        });
        const data = await response.json();
        return data;
    }

    // Function to display repositories
    function displayRepositories(repositories) {
        repoContainer.innerHTML = ""; // Clear previous content

        repositories.forEach(repo => {
            const repoItem = document.createElement("div");
            repoItem.classList.add("repo-item");
            repoItem.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description ? repo.description : "No description"}</p>
                <a href="${repo.html_url}" target="_blank">View on GitHub</a>
            `;
            repoContainer.appendChild(repoItem);
        });
    }

    // Function to display pagination links
    function displayPagination(totalPages) {
        paginationContainer.innerHTML = ""; // Clear previous content

        for (let i = 1; i <= totalPages; i++) {
            const pageLink = document.createElement("a");
            pageLink.href = "#";
            pageLink.textContent = i;
            pageLink.addEventListener("click", function () {
                currentPage = i;
                fetchAndDisplay();
            });

            if (i === currentPage) {
                pageLink.classList.add("active");
            }

            paginationContainer.appendChild(pageLink);
        }
    }

    // Function to fetch repositories and update UI
    async function fetchAndDisplay() {
        const repositories = await fetchRepositories(currentPage);
        const totalPages = Math.ceil(repositories.length / 10); // Assuming 10 repositories per page
        displayRepositories(repositories);
        displayPagination(totalPages);
    }

    // Initial fetch and display
    fetchAndDisplay();
});