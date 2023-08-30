const searchInput = document.getElementById('subject');
const searchButton = document.getElementById('searchBtn');
const dataContainer = document.getElementById('dataContainer');
document.addEventListener("keydown", eheckKey, false);

// 버튼클릭
searchButton.addEventListener('click', () => {
  const searchText = searchInput.value;
  if (searchText) {
    fetchData(searchText);
  }
});

// 엔터키
function eheckKey(e) {
  const searchText = searchInput.value;
	if (e.keyCode === 13) {
		fetchData(searchText)
	}
}

// 서버 통신 (fetch 사용)
async function fetchData(searchText) {
  try {
    const response = await fetch(`/api/getData?search=${searchText}`);
    const data = await response.json();
    dataContainer.innerHTML = `<h1> ${data.result}</h1>`;
  } catch (error) {
    console.error('Error:', error);
  }
}
