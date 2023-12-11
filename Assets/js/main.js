document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.Form');
    const numberOfJokesInput = document.getElementById('numberofJokes');
    const responseContainer = document.getElementById('responseContainer');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        callAPI();
    });
    function callAPI() {
        const limit = numberOfJokesInput.value;
        const apiUrl = `https://api.api-ninjas.com/v1/dadjokes?limit=${limit}`;

        fetch(apiUrl, {
            method: 'GET',
            headers: {
                'X-Api-Key': '5Yq0D64dJq1g32P0xRsHQ5NyikCCoVo9dLS0lwlf',
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(data => {
                // this is the condition if my array is empty
                if (data.length === 0) {
                    responseContainer.innerHTML = '<p>No jokes found.</p>';
                } else {
                    // Extract information from the JSON response and display jokes
                    const jokes = data;
                    responseContainer.innerHTML = '<h2>Jokes:</h2>';
                    responseContainer.innerHTML += jokes.map(joke => `<p>${joke.joke}</p>`).join('');
                }
            })
            .catch(error => {
                console.log('Error during API call:', error.message);
                responseContainer.innerHTML = '<p>Error fetching jokes. Please try again later.</p>';
            });
    }
});