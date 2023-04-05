export function APICall(setStateObj) {
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
    query ($id: Int, $year: Int, $season: MediaSeason) {
      Page (page: 1, perPage: 20) {
        media (id: $id, type: ANIME, status: RELEASING, season: $season, seasonYear: $year, format: TV) {
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
          averageScore
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

  function handleData(data) {
    console.log(data)
    setStateObj((prevState) => ({
      ...prevState,
      anime: data,
    }));
  }
  
  fetch(url, options).then(handleResponse).then(handleData);
}
