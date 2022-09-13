const elementById = (id) => {
  const getId = document.getElementById(id);  // It was not returned
  return getId;
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
};

const showArtists = (data) => {
  const artistContainer = elementById("artists");   // "artists" spelling was mistake 
  data?.artists?.forEach(artist => {
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `
    <div class="image-container">
      <div class="image-container-inner">
        <img src="${artist?.strArtistThumb}" alt="" />
      </div>
    </div>
    <div class="info-container">
      <h1>${artist?.strArtist}</h1>
      <p>Country: ${artist?.strCountry}</p>
      <p>Style: ${artist?.strGenre}</p>
    </div>
    <button class="album-button">
      <i class="fa-solid fa-compact-disc"></i>
      <p onclick="fetchAlbums('${artist?.idArtist}')" class="button-title">Albums</p>
    </button>`
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())            // json was like JSON
    .then((data) => showAlbum(data));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
};

const showAlbum = (data) => {
  const albumContainer = elementById("albums");
  albumContainer.innerHTML = ''
  data?.album?.forEach(item => {                  // data calling mistake
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img src="${item?.strAlbumThumb}" alt="" />
        </div>
        <div class="album-name">
          <h3>${item?.strAlbum}</h3>
        </div>
      `;                                          // item was called by different name

    albumContainer.appendChild(div);
  });
};
