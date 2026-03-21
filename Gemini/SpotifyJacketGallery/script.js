async function getAccessToken(clientId, clientSecret) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        alert('認証に失敗しました。IDとSecretを確認してください。');
        return null;
    }
    const data = await response.json();
    return data.access_token;
}

async function searchArtist() {
    const clientId = document.getElementById('clientId').value;
    const clientSecret = document.getElementById('clientSecret').value;
    const artistName = document.getElementById('artistName').value;
    const gallery = document.getElementById('gallery');

    if (!clientId || !clientSecret || !artistName) {
        alert('すべて入力してください！');
        return;
    }

    gallery.innerHTML = '検索中...';

    const token = await getAccessToken(clientId, clientSecret);
    if (!token) return;

    // アーティストを検索してアルバムを取得
    // アーティストを検索してアルバムを20件取得
    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=album&limit=20`;

    const searchResponse = await fetch(url, {
        method: 'GET',
        headers: { 
            'Authorization': 'Bearer ' + token 
        }
    });
    
    const data = await searchResponse.json();
    gallery.innerHTML = ''; // クリア

    data.albums.items.forEach(album => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${album.images[0].url}" alt="${album.name}">
            <p>${album.name}</p>
        `;
        gallery.appendChild(card);
    });
}