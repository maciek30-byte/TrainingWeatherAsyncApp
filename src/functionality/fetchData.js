export const fetchData = (url, options = {}) => {
  const {
    start = () => console.log("start"),
    catchError = (error) => console.warn("error occured", error),
    end = () => console.log("end"),
  } = options;
  start();
  return fetch(url)
    .then((response) => {
      if (response.status < 200 || response.status > 299) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json())
    .catch(catchError)
    .finally(end);
};

/*
1.) wywolujemy start callback
2 funcja zwraca nam promise z fetcha ktora jest przerabiana na jsona (odpowiedz)
3. catch callback uruchamia gdy pojawi sie blad
4 i finaly pojawia sie niezaleznie czy blad sie pojawil czy nie



 */
