// document.getElementById('urlForm').addEventListener('submit', function (event) {
//     event.preventDefault();
//     const longUrl = document.getElementById('inputUrl').value;
//     fetch('/shortUrl', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ longUrl }),
//     })
//       .then(response => response.json())
//       .then(data => {
//         const shortUrl = data.shortUrl;
//         console.log(shortUrl);
//         document.getElementById('shortUrlResult').innerText = `Short URL: ${shortUrl}`;
//       })
//       .catch(error => console.error('Error:', error));
//   });