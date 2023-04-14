export async function APICall(setStateObj) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let currentSeason = '';
  const month = currentDate.getMonth();

  switch (month) {
    case 12:
    case 1:
    case 2:
      currentSeason = 'WINTER';
      break;
    case 3:
    case 4:
    case 5:
      currentSeason = 'SPRING';
      break;
    case 6:
    case 7:
    case 8:
      currentSeason = 'SUMMER';
      break;
    case 9:
    case 10:
    case 11:
      currentSeason = 'FALL';
      break;
    default:
      currentSeason = 'WINTER';
  }

  const query = `
    query ($id: Int, $year: Int, $season: MediaSeason, $page: Int) {
      Page (page: $page, perPage: 20) {
        media (id: $id, type: ANIME, season: $season, seasonYear: $year, format: TV) {
          id
          idMal
          title {
            romaji
            english
            native
          }
          status
          coverImage {
            extraLarge
          }
          description
          averageScore
          popularity
          airingSchedule {
            nodes {
              airingAt
            }
          }
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

  const variables = {
    year: currentYear,
    season: currentSeason,
    page: 1,
  };

  const url = 'https://graphql.anilist.co';

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json.errors[0].message);
    });
  }

  async function handleData(data) {
    const ani = data.data.Page.media;
    setStateObj(prevState => ({
      ...prevState,
      anime: [
        ...(prevState.anime),
        ...ani
      ]
    }));

    if (data.data.Page.pageInfo.hasNextPage) {
      const nextPage = data.data.Page.pageInfo.currentPage + 1;
      const nextVariables = { ...variables, page: nextPage };
      const nextOptions = { ...options, body: JSON.stringify({ query: query, variables: nextVariables }) };
      await fetch(url, nextOptions).then(handleResponse).then(handleData);
    } else {
      setStateObj(prevState => ({
        ...prevState,
        finished_fetching_anime: true
      }));
    }
  }

  await fetch(url, options).then(handleResponse).then(handleData);

  // Page will load only after all callbacks are finished
}
