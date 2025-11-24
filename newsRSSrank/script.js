document.addEventListener('DOMContentLoaded', () => {
    const siteListElement = document.getElementById('site-list');
    const selectedSiteFeedSection = document.getElementById('selected-site-feed');
    const selectedSiteNameElement = document.getElementById('selected-site-name');
    const rssArticlesElement = document.getElementById('rss-articles');

    // プロキシサーバーのエンドポイントURL
    // ローカルで実行している場合は http://localhost:3000
    // デプロイした場合はそのサーバーのURL
    const PROXY_SERVER_URL = 'http://localhost:3000'; 

    // RSS提供サイトのデータ (100サイト分の情報をここに格納)
    const rssSites = [
        { id: 1, name: "Yahoo!ニュース トピックス", description: "国内・海外の速報ニュースまとめ", rssUrl: "https://news.yahoo.co.jp/rss/topics/top-picks.xml" },
        { id: 2, name: "ITmedia NEWS", description: "IT業界の最新ニュースと動向", rssUrl: "https://www.itmedia.co.jp/news/rss/index.xml" },
        { id: 3, name: "NHKニュース Web (主要)", description: "NHKの主要ニュース", rssUrl: "https://www.nhk.or.jp/rss/news/easy.xml" },
        { id: 4, name: "ねとらぼ", description: "インターネットの旬な話題とトレンド", rssUrl: "https://www.itmedia.co.jp/rss/2.0/netlab.xml" },
        { id: 5, name: "IGN Japan", description: "ゲーム、映画、アニメ、コミックの最新情報", rssUrl: "https://jp.ign.com/feed.xml" },
        { id: 6, name: "GIGAZINE", description: "様々なジャンルの記事を網羅", rssUrl: "https://gigazine.net/news/rss_2.0/" },
        { id: 7, name: "Engadget 日本版", description: "テクノロジー製品のレビューとニュース", rssUrl: "https://japanese.engadget.com/rss.xml" },
        { id: 8, name: "Fashionsnap.com", description: "ファッション業界のニュースとコレクション", rssUrl: "https://www.fashionsnap.com/news.xml" },
        { id: 9, name: "KAI-YOU.net", description: "ポップカルチャーの最先端を追う", rssUrl: "https://kai-you.net/feed/rss" },
        { id: 10, name: "日経BP (IT・デジタルトレンド)", description: "ビジネスとテクノロジーの専門情報", rssUrl: "https://bpcgi.nikkeibp.co.jp/rss/itpro.rss" },
        // ここにさらに90サイト分の情報を追加します。
        // ご自身で確認できたRSSフィードURLを追加してください。
    ];

    // RSS提供サイトのリストを表示
    function displayRssSites() {
        siteListElement.innerHTML = '';
        rssSites.forEach(site => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${site.name}</h3>
                <p>${site.description}</p>
            `;
            listItem.dataset.rssUrl = site.rssUrl;
            listItem.dataset.siteName = site.name;
            listItem.addEventListener('click', () => fetchAndDisplayRssFeed(site.rssUrl, site.name));
            siteListElement.appendChild(listItem);
        });
    }

    // 選択されたサイトのRSSフィードをプロキシ経由で取得して表示
    async function fetchAndDisplayRssFeed(rssUrl, siteName) {
        selectedSiteNameElement.textContent = siteName;
        selectedSiteFeedSection.style.display = 'block';
        rssArticlesElement.innerHTML = '<p>読み込み中...</p>'; // ローディング表示

        try {
            // 自前のプロキシサーバーのエンドポイントを呼び出す
            const proxyApiUrl = `${PROXY_SERVER_URL}/api/rss?url=${encodeURIComponent(rssUrl)}`;
            const response = await fetch(proxyApiUrl);

            if (!response.ok) {
                // プロキシサーバーからのエラーレスポンスを処理
                const errorData = await response.json(); // プロキシがJSONでエラーを返すと想定
                throw new Error(`プロキシサーバーエラー: ${response.status} ${response.statusText} - ${errorData.details || '不明なエラー'}`);
            }

            const rssData = await response.json();
            const articles = rssData.items;

            if (!articles || articles.length === 0) {
                rssArticlesElement.innerHTML = '<p>記事が見つかりませんでした。</p>';
                return;
            }

            rssArticlesElement.innerHTML = '';
            articles.forEach(article => {
                const articleElement = document.createElement('div');
                articleElement.classList.add('rss-article');

                articleElement.innerHTML = `
                    <h3><a href="${article.link}" target="_blank">${article.title || 'タイトルなし'}</a></h3>
                    <p>${article.description ? article.description.substring(0, 200) + '...' : '説明なし'}</p>
                    <p><small>公開日: ${article.pubDate ? new Date(article.pubDate).toLocaleDateString() : '不明'}</small></p>
                `;
                rssArticlesElement.appendChild(articleElement);
            });

        } catch (error) {
            console.error("RSSフィードの取得またはパースに失敗しました:", error);
            let errorMessage = `RSSフィードの読み込み中にエラーが発生しました。`;
            errorMessage += `原因: ${error.message}`;
            rssArticlesElement.innerHTML = `<p style="color: red;">${errorMessage}</p>`;
        }
    }

    // 初期表示
    displayRssSites();
});