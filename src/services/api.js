export function APICall(setStateObj) {
  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  const query = `
    query ($id: Int) { # Define which variables will be used in the query (id)
      Page (page: 1, perPage: 3) {
        media (id: $id, type: ANIME, status: RELEASING, season: FALL, seasonYear: 2022, format: TV) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
          id
          title {
            romaji
            english
            native
          }
          status
          coverImage {
            extraLarge
          }
          averageScore
        }
        
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
      }
    }
`;

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    setStateObj((prevState) => ({
      ...prevState,
      anime: data,
    }));
  }
  fetch(url, options).then(handleResponse).then(handleData);
}
