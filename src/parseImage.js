async function fetchImage(keyword) {
  const result = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=7JeQSxL2ARGvNwWQiwhuyQjVYzDFzqW9&s=
    ${keyword}?weirdness=0`,
    { mode: 'cors' },
  );

  return result.json();
}

async function parseImage(keyword) {
  const data = await fetchImage(keyword);
  return data.data.images.original.url;
}
export default parseImage;

// 7JeQSxL2ARGvNwWQiwhuyQjVYzDFzqW9
