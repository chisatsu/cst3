document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('ticker-container');
    const loader = document.getElementById('loader');
    const numberOfTickers = 100; // ティッカーの数を100に変更

    // 取得するGoogle NewsのRSSフィードのURLリスト
    const rssFeeds = [
        'https://news.google.com/rss?hl=ja&gl=JP&ceid=JP:ja', // 主要ニュース
        'https://news.google.com/rss/headlines/section/topic/WORLD?hl=ja&gl=JP&ceid=JP:ja', // 国際
        'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=ja&gl=JP&ceid=JP:ja', // ビジネス
        'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=ja&gl=JP&ceid=JP:ja', // テクノロジー
        'https://news.google.com/rss/headlines/section/topic/SPORTS?hl=ja&gl=JP&ceid=JP:ja' // スポーツ
    ];

    // RSSフィードを取得してニュースのタイトルとリンクを抽出する関数
    async function fetchNewsFromFeed(feedUrl) {
        // CORS制限を回避するためにプロキシを経由
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        try {
            const response = await fetch(proxyUrl + encodeURIComponent(feedUrl));
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const xmlString = data.contents;

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlString, "application/xml");
            
            const items = xmlDoc.querySelectorAll("item");
            const newsList = [];
            items.forEach(item => {
                newsList.push({
                    title: item.querySelector("title").textContent,
                    link: item.querySelector("link").textContent
                });
            });
            return newsList;
        } catch (error) {
            console.error('RSSフィードの取得に失敗しました:', error);
            return []; // エラーが発生した場合は空の配列を返す
        }
    }

    // 全てのフィードからニュースを取得し、一つの配列にまとめる
    async function getAllNews() {
        const allNewsPromises = rssFeeds.map(feed => fetchNewsFromFeed(feed));
        const newsResults = await Promise.all(allNewsPromises);
        return newsResults.flat(); // [['news1'], ['news2']] -> ['news1', 'news2']
    }

    // --- メイン処理 ---
    const allNews = await getAllNews();

    // ニュースが1件も取得できなかった場合の処理
    if (allNews.length === 0) {
        loader.textContent = 'ニュースの取得に失敗しました。時間をおいて再読み込みしてください。';
        return;
    }

    // 読み込み中メッセージを非表示に
    loader.style.display = 'none';

    // 100個のティッカーを生成
    for (let i = 0; i < numberOfTickers; i++) {
        // 取得したニュースの中からランダムに一つ選ぶ
        const randomNews = allNews[Math.floor(Math.random() * allNews.length)];

        // 1. リンク要素(a)を作成
        const tickerLink = document.createElement('a');
        tickerLink.className = 'ticker-link';
        tickerLink.href = randomNews.link;
        tickerLink.target = '_blank'; // 新しいタブで開く
        tickerLink.rel = 'noopener noreferrer'; // セキュリティ対策

        // 2. ティッカーの外側のラッパー(div)を作成
        const tickerWrap = document.createElement('div');
        tickerWrap.className = 'ticker-wrap';

        // 3. 流れるテキスト(div)を作成
        const tickerItem = document.createElement('div');
        tickerItem.className = 'ticker-item';
        tickerItem.textContent = randomNews.title;
        
        // 4. アニメーションの速度をランダムに設定
        const duration = Math.random() * 20 + 15; // 15秒から35秒の間
        tickerItem.style.animationDuration = `${duration}s`;

        // 5. 作成した要素を組み立ててHTMLに追加
        tickerWrap.appendChild(tickerItem);
        tickerLink.appendChild(tickerWrap);
        container.appendChild(tickerLink);
    }
});