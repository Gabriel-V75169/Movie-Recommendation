async function getAPI() {
const url = 'https://streaming-availability.p.rapidapi.com/v2/genres';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a005c14e69msh0a4e62b61b8ee65p1f3f21jsn12df62b5ea9c',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
}

getAPI();