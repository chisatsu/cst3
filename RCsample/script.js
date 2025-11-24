document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider');
    const sliderValues = document.querySelectorAll('.slider-value');
    const whoSelect = document.getElementById('who');
    const toWhoSelect = document.getElementById('toWho');
    const updateButton = document.getElementById('updateButton');
    const refreshButton = document.getElementById('refreshButton');
    const graphButton = document.getElementById('graphButton');
    const resultTableButton = document.getElementById('resultTableButton');
    const topButton = document.getElementById('topButton');
    const resultTableBody = document.querySelector('#resultTable tbody');
    const messageArea = document.getElementById('messageArea'); // 追加

    // Chart.jsのデフォルト設定を調整
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    Chart.defaults.font.size = 12;
    Chart.defaults.color = '#333';

    // 8つの質問のラベルを新しい順序に更新 (7つ目の質問も修正)
    const labels = [
        "前向き", "開放的", "論理重視", "主導型",
        "計画派", "傾聴型", "プロセス重視", "自己管理型"
    ];

    // Chart.jsで使う色のパレット (複数データセット用)
    const chartColors = [
        'rgba(52, 152, 219, 1)',  // 青
        'rgba(230, 126, 34, 1)', // オレンジ
        'rgba(46, 204, 113, 1)', // 緑
        'rgba(155, 89, 182, 1)', // 紫
        'rgba(241, 196, 15, 1)', // 黄
        'rgba(231, 76, 60, 1)',  // 赤
        'rgba(52, 73, 94, 1)',   // 濃い青
        'rgba(149, 165, 166, 1)' // グレー
    ];

    const chartBackgroundColors = [
        'rgba(52, 152, 219, 0.2)',
        'rgba(230, 126, 34, 0.2)',
        'rgba(46, 204, 113, 0.2)',
        'rgba(155, 89, 182, 0.2)',
        'rgba(241, 196, 15, 0.2)',
        'rgba(231, 76, 60, 0.2)',
        'rgba(52, 73, 94, 0.2)',
        'rgba(149, 165, 166, 0.2)'
    ];


    // ==================== レーダーチャートの設定 ====================
    const radarCtx = document.getElementById('radarChart').getContext('2d');
    let radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [] // 初期は空
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: '評価レーダーチャート',
                    font: {
                        size: 18
                    },
                    color: '#2c3e50'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw;
                        }
                    }
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 13
                        },
                        color: '#555'
                    },
                    ticks: {
                        beginAtZero: false,
                        max: 100,
                        min: -100,
                        stepSize: 50,
                        display: true
                    }
                }
            }
        }
    });


    // ==================== 折れ線グラフの設定 ====================
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    let lineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [] // 初期は空
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: '評価折れ線グラフ',
                    font: {
                        size: 18
                    },
                    color: '#2c3e50'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#555',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    max: 100,
                    min: -100,
                    stepSize: 50,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        color: '#555',
                        font: {
                            size: 12
                        }
                    }
                }
            }
        }
    });


    // メッセージエリアを更新する関数
    const updateMessageArea = () => {
        const rowCount = resultTableBody.children.length;
        if (rowCount === 0) {
            messageArea.textContent = "自分自身を評価してください。";
        } else {
            messageArea.textContent = `${rowCount + 1}人目を評価してください。`;
        }
    };

    // スライダーの値が変更されたときに数値を更新する関数
    // チェックボックスが0件のときにグラフも更新するように変更
    const updateSliderValuesAndGraphIfNoSelection = () => {
        sliders.forEach((slider, index) => {
            sliderValues[index].textContent = slider.value;
        });
        const checkedCount = document.querySelectorAll('#resultTable tbody input[type="checkbox"]:checked').length;
        if (checkedCount === 0) {
            updateChartsBasedOnCheckboxes(); // スライダーの値をグラフに反映
        }
    };

    // 全てのスライダーにイベントリスナーを追加
    sliders.forEach(slider => {
        slider.addEventListener('input', updateSliderValuesAndGraphIfNoSelection);
    });

    // 「誰が」「誰に」が変更されたときにチャートのタイトルを更新する
    const updateChartTitles = () => {
        const who = whoSelect.value;
        const toWho = toWhoSelect.value;
        // グラフタイトルは選択されているデータセットによって動的に変更されるため、ここではデフォルトのタイトルを維持
        // 必要であれば、選択中のデータセットのラベルを結合してタイトルにすることも可能
    };

    whoSelect.addEventListener('change', updateChartTitles);
    toWhoSelect.addEventListener('change', updateChartTitles);

    // グラフを更新する関数（チェックボックスの状態に基づいて）
    const updateChartsBasedOnCheckboxes = () => {
        const checkedRows = document.querySelectorAll('#resultTable tbody input[type="checkbox"]:checked');
        const newRadarDatasets = [];
        const newLineDatasets = [];

        if (checkedRows.length === 0) {
            // チェックボックスが0件の場合、現在のスライダーの値をグラフに表示
            const currentValues = Array.from(sliders).map(slider => parseInt(slider.value));
            const who = whoSelect.value;
            const toWho = toWhoSelect.value;
            const label = `${who}が${toWho}を評価 (現在)`;

            newRadarDatasets.push({
                label: label,
                data: currentValues,
                backgroundColor: chartBackgroundColors[0],
                borderColor: chartColors[0],
                borderWidth: 2,
                pointBackgroundColor: chartColors[0],
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: chartColors[0]
            });

            newLineDatasets.push({
                label: label,
                data: currentValues,
                backgroundColor: chartBackgroundColors[0],
                borderColor: chartColors[0],
                borderWidth: 2,
                pointBackgroundColor: chartColors[0],
                pointBorderColor: '#fff',
                pointRadius: 5,
                pointHoverRadius: 7,
                fill: false
            });
        } else {
            // チェックボックスが1件以上の場合、チェックされたデータをグラフに表示
            checkedRows.forEach((checkbox, index) => {
                const row = checkbox.closest('tr');
                const cells = row.querySelectorAll('td');
                const who = cells[1].textContent; // 誰が
                const toWho = cells[2].textContent; // 誰に
                const values = Array.from(cells).slice(3, 11).map(cell => parseInt(cell.textContent)); // 8つの質問の数値

                const label = `${who}が${toWho}を評価 ${index + 1}`; // データセットのラベル

                newRadarDatasets.push({
                    label: label,
                    data: values,
                    backgroundColor: chartBackgroundColors[index % chartBackgroundColors.length],
                    borderColor: chartColors[index % chartColors.length],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[index % chartColors.length],
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: chartColors[index % chartColors.length]
                });

                newLineDatasets.push({
                    label: label,
                    data: values,
                    backgroundColor: chartBackgroundColors[index % chartBackgroundColors.length],
                    borderColor: chartColors[index % chartColors.length],
                    borderWidth: 2,
                    pointBackgroundColor: chartColors[index % chartColors.length],
                    pointBorderColor: '#fff',
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    fill: false
                });
            });
        }

        radarChart.data.datasets = newRadarDatasets;
        lineChart.data.datasets = newLineDatasets;
        radarChart.update();
        lineChart.update();
    };


    // 更新ボタンのイベントリスナー
    updateButton.addEventListener('click', () => {
        const who = whoSelect.value;
        const toWho = toWhoSelect.value;
        const currentValues = Array.from(sliders).map(slider => parseInt(slider.value));

        const newRow = resultTableBody.insertRow();
        const checkboxCell = newRow.insertCell();
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', updateChartsBasedOnCheckboxes); // チェックボックス変更でグラフ更新
        checkboxCell.appendChild(checkbox);

        newRow.insertCell().textContent = who;
        newRow.insertCell().textContent = toWho;
        currentValues.forEach(value => {
            newRow.insertCell().textContent = value;
        });

        const tableContainer = document.querySelector('.table-container');
        tableContainer.scrollTop = tableContainer.scrollHeight;

        updateChartsBasedOnCheckboxes(); // 更新時にもグラフを再描画
        updateMessageArea(); // メッセージエリア更新
    });

    // リフレッシュボタンのイベントリスナー
    refreshButton.addEventListener('click', () => {
        sliders.forEach(slider => {
            slider.value = 0; // すべてのスライダーの値を0に設定
        });
        updateSliderValuesAndGraphIfNoSelection(); // 数値表示とグラフを更新
        // チェックボックスもすべて未選択にする
        document.querySelectorAll('#resultTable tbody input[type="checkbox"]').forEach(cb => cb.checked = false);
        updateChartsBasedOnCheckboxes(); // グラフをクリア (何も選択されていない状態に)
    });

    // ======== ナビゲーションボタンのイベントリスナー ========
    graphButton.addEventListener('click', () => {
        document.getElementById('radarChartSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    resultTableButton.addEventListener('click', () => {
        document.getElementById('resultTableSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    topButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 初期表示時にチャートを更新し、タイトルを設定
    updateSliderValuesAndGraphIfNoSelection();
    updateChartTitles();
    updateMessageArea(); // 初期メッセージ表示
});