
        function start() {
        }
/*
const textarea = document.getElementsByName('example');
const placeholderDiv = document.getElementsByName('placeholderDiv');

textarea.on('keyup change', function () {
 // textareaの文字を数える
 let letterLength = textarea.val().length;
  if (letterLength !== 0) {
   placeholderDiv.addClass('none');
  } else {
   placeholderDiv.removeClass('none');
  }
});
*/

		function p1clc() {
			var foo = document.getElementById("foo").value;
			if (foo == 0) {
				document.getElementById("foo").value = document.getElementsByName('example')[0].value;
				document.getElementsByName('example')[0].value = '';
			}
		}
		function p1clr() {
			document.getElementsByName('example')[0].value = "";
//			var foo = document.getElementById("foo").value;
//			if (foo != 0) {
//				document.getElementsByName('example')[0].value = document.getElementById("foo").value;
//				document.getElementById("foo").value = 0;
//			}
		}
		function p1exe() {
			//document.getElementsByName('example')[0].value = 111;
			//alert('1回目');
			//document.getElementById("area1").innerText = "変更しました";
			//alert('2回目');

			var foo = document.getElementById("foo").value;
			document.getElementById('p1').style.display = "none";
			document.getElementById('p2').style.display = "";
			document.getElementById('p3').style.display = "none";
			mainExe();
		}
		function p1sample() {
			document.getElementsByName('example')[0].value = "佐藤,2774\n鈴木,2551\n高橋,1848\n田中,1999\n伊藤,2300\n渡辺,2109\n山本,2467\n中村,2110\n小林,1970\n加藤,2656\n吉田,2094\n山田,2418\n佐々木,2227\n山口,2174\n松本,2442\n井上,2053\n木村,2033\n林,2500\n斎藤,2362\n清水,2385\n";
		}
		function p2bak() {
			document.getElementById('p1').style.display = "";
			document.getElementById('p2').style.display = "none";
			document.getElementById('p2').style.display = "none";
		}
		function p2exe() {
			document.getElementById('p1').style.display = "none";
			document.getElementById('p2').style.display = "none";
			document.getElementById('p3').style.display = "";
			calcExe();
		}
		function p3bak() {
			document.getElementById('p1').style.display = "none";
			document.getElementById('p2').style.display = "";
			document.getElementById('p3').style.display = "none";
		}
		function p3copy() {
			// クリップボードにコピー
			navigator.clipboard.writeText("コピーしたテキスト");
		}
		
		//=====================================================================

		// パワーの合計を求める関数
		const sum = (array) => {
		  let total = 0;
		  for (let item of array) {
		    total += Number(item.power);
		  }
		  return total;
		};

		// パワーの平均を求める関数
		const average = (array) => {
		  return sum(array) / Object.keys(array).length;
		};

		// パワーの差の絶対値を求める関数
		const difference = (a, b) => {
		  return Math.abs(a - b);
		};

		// チームを分ける関数
		const divide = (array) => {
		  // チームの人数
		  const teamSize = 4;
		  // チームの数
		  const teamNum = Object.keys(array).length / teamSize;
		  // チームの配列
		  const teams = [];
		  // パワーの平均の配列
		  const averages = [];
		  // パワーの平均の差の最小値
		  let minDiff = Infinity;
		  // パワーの平均の差の最小値を持つチームのインデックス
		  let minIndex = -1;

		  // チームをランダムに分ける
		  for (let i = 0; i < teamNum; i++) {
		    // チームを作る
		    let team = [];
		    // チームに人を追加する
		    for (let j = 0; j < teamSize; j++) {
		      // データからランダムに要素を選ぶ
		      let index = Math.floor(Math.random() * Object.keys(array).length);
		      // 選んだ要素をチームに追加する
		      //team.push(array.slice(index));
		      team.push(array[index]);
		      // データから選んだ要素を削除する
		      array.splice(index, 1);
		    }
		    // チームをチームの配列に追加する
		    teams.push(team);
		    // チームのパワーの平均を求める
		    let avg = average(team);
		    // パワーの平均をパワーの平均の配列に追加する
		    averages.push(avg);
		  }

		  // パワーの平均の差の最小値を持つチームを最初に表示する
		  let firstTeam = teams.splice(minIndex, 1)[0];
		  teams.unshift(firstTeam);

		  // チームの配列を返す
		  return teams;
		};

		// ターブルに行を追加する
		const tableInsert = (tbl,arg1,arg2,arg3,arg4) => {

			// 行追加＋１セル追加
			let newRow = tbl.insertRow(-1);
			let newCell = newRow.insertCell();
			let newText = document.createTextNode(arg1);
			newCell.appendChild(newText);

			// ３セル追加
			newCell = newRow.insertCell();
			newText = document.createTextNode(arg2);
			newCell.appendChild(newText);
			newCell = newRow.insertCell();
			newText = document.createTextNode(arg3);
			newCell.appendChild(newText);
			newCell = newRow.insertCell();
			newText = document.createTextNode(arg4);
			newCell.appendChild(newText);
		}

		function mainExe() {
			
			const iniStr = document.getElementsByName('example')[0].value;
			const newStr = iniStr.replaceAll('\t', ',');
			const arrayy = newStr.split(/\r\n|\n|\r/);
			const result = arrayy.filter( s => (0 <= s.indexOf(",")) ^ false); // ^ は XOR 排他論

			// パワーの最小値
			let minPow = Infinity;
			// パワーの最大値
			let manPow = -Infinity;
			// パワーの合計
			let total = 0;

			for (let i = 0; i < result.length; i++) {
				//console.log(`${i + 1}:${result[i]}`);
				let pow = result[i].split(',');
				if (pow[1] < minPow) {
					minPow = pow[1];
				}
				if (pow[1] > manPow) {
					manPow = pow[1];
				}
				total += Number(pow[1]);
			}
//			console.log(`対象人数　：${result.length}人`);
//			console.log(`チーム数：${Math.round(result.length/4)}`);
//			console.log(`最大パワー：${manPow}`);
//			console.log(`平均パワー：${Math.round(total/result.length)}`);
//			console.log(`最小パワー：${minPow}`);

			document.getElementById("ninzu").innerHTML = `対象人数　：${result.length}人`;
			document.getElementById("teams").innerHTML = `チーム数：${Math.round(result.length/4)}`;
			document.getElementById("taisg").innerHTML = `対象外メンバー：なし`;
			document.getElementById("maxpw").innerHTML = `最大パワー：${manPow}`;
			document.getElementById("avgpw").innerHTML = `平均パワー：${Math.round(total/result.length)}`;
			document.getElementById("mixpw").innerHTML = `最小パワー：${minPow}`;
			
		}

		function calcExe() {
		
			const trycnt = document.getElementById("trycnt").value;
			const allow = document.getElementById("allow").value;
			
			const iniStr = document.getElementsByName('example')[0].value;
			const newStr = iniStr.replaceAll('\t', ',');
			const arrayy = newStr.split(/\r\n|\n|\r/);
			const result = arrayy.filter( s => (0 <= s.indexOf(",")) ^ false); // ^ は XOR 排他論

//			// カンマ区切り配列を連想配列に変換
//			let data = {};
//			let data = [{ name: result[0].split(',')[0], power: result[0].split(',')[1] }];
//			let data = new Array();
//			for (let i = 1; i < result.length; i++) {
//			for (let i = 0; i < result.length; i++) {
//				let pow = result[i].split(',');
//				data.push({ name: result[i].split(',')[0], power: result[i].split(',')[1] });
//				data[pow[0]] = pow[1];
//			}
			
			//
			const teamSu = Math.round(result.length/4);
			
			let calcCnt = 0;
			for (let i = 0; i < trycnt; i++) {

				// カンマ区切り配列を連想配列に変換
				let data = [{ name: result[0].split(',')[0], power: result[0].split(',')[1] }];
				for (let i = 1; i < result.length; i++) {
					data.push({ name: result[i].split(',')[0], power: result[i].split(',')[1] });
				}

				// チームを分ける
				let teams = divide(data);

				// チーム差を確認する
				let minPow = Infinity;
				let manPow = -Infinity;
				for (let j = 0; j < teams.length; j++) {
					let avgg = average(teams[j]);
					if (avgg < minPow) {
						minPow = avgg;
					}
					if (avgg > manPow) {
						manPow = avgg;
					}
				}
				if (manPow - minPow > allow) {
					continue;
				}

				if (calcCnt == 0) {

					// tableのHTML要素を取得
					const oneset = document.getElementById("oneset");
					const tbldiv = oneset.children[1];
					const tbldi2 = tbldiv.children[0];
					let settbl = tbldi2.children[0];

					// 最大値と最小値を設定
					let mixPow = Infinity;
					let maxPow = -Infinity;

					let ltCnt = 0;
					let rtCnt = 1;
					let loutr = 0;
					let routr = 0;
					// 4行分テーブル書き換え
					for (let i = 0; i < 10; i++) {
						for (let j = 0; j < 4; j++) {

							if (i == 0 || i == 5) {
								loutr = 0;
								routr = 0;
								if (j == 0 && i == 5) {
									ltCnt = ltCnt + 2;
									rtCnt = rtCnt + 2;
								}
								
								//ヘッダ行
								if (j == 0) {
									settbl.rows[i].cells[j].innerHTML = `チーム${( '00' + (ltCnt + 1)).slice( -2 )}`;
								} else if (j == 1) {
									let avgg = Math.round(average(teams[ltCnt]));
									if (avgg < mixPow) {
										mixPow = avgg;
									}
									if (avgg > maxPow) {
										maxPow = avgg;
									}
									settbl.rows[i].cells[j].innerHTML = `平均：${avgg}`;
								} else if (j == 2) {
									settbl.rows[i].cells[j].innerHTML = `チーム${( '00' + (rtCnt + 1)).slice( -2 )}`;
								} else if (j == 3) {
									let avgg = Math.round(average(teams[rtCnt]));
									if (avgg < mixPow) {
										mixPow = avgg;
									}
									if (avgg > maxPow) {
										maxPow = avgg;
									}
									settbl.rows[i].cells[j].innerHTML = `平均：${avgg}`;
								}
							} else {
								//明細行

								if (j == 0) {
									settbl.rows[i].cells[j].innerHTML = `${teams[ltCnt][loutr].name}`;
								} else if (j == 1) {
									settbl.rows[i].cells[j].innerHTML = `${teams[ltCnt][loutr++].power}`;
								} else if (j == 2) {
									settbl.rows[i].cells[j].innerHTML = `${teams[rtCnt][routr].name}`;
								} else if (j == 3) {
									settbl.rows[i].cells[j].innerHTML = `${teams[rtCnt][routr++].power}`;
								}
							}
						}
					}

					loutr = 0;
					//5チーム専用
					tableInsert(settbl,"チーム05",`平均：${Math.round(average(teams[4]))}`,"","");
					tableInsert(settbl,`${teams[4][loutr].name}`,`${teams[4][loutr++].power}`,"","");
					tableInsert(settbl,`${teams[4][loutr].name}`,`${teams[4][loutr++].power}`,"","");
					tableInsert(settbl,`${teams[4][loutr].name}`,`${teams[4][loutr++].power}`,"","");
					tableInsert(settbl,`${teams[4][loutr].name}`,`${teams[4][loutr++].power}`,"","");
					
					// 子要素を指定しname属性の値を変更
					const newelement_name = oneset.children[0];
					const newelement_powd = newelement_name.children[0];
					newelement_powd.innerText = `パターン${( '00' + (calcCnt+1)).slice( -2 )}、最大${maxPow}、最小${mixPow}、差分${maxPow-mixPow}`;

					calcCnt++;
				} else {
				
					// 複製するHTML要素を取得
					const element = document.getElementById("oneset");

					// 要素を複製
					const newelement = element.cloneNode(true);
					const newelement_tabd = newelement.children[1];
					const settbl = newelement_tabd.children[0];

					// 最大値と最小値を設定
					let mixPow = Infinity;
					let maxPow = -Infinity;

					let ltCnt = 0;
					let rtCnt = 1;
					let loutr = 0;
					let routr = 0;
					// テーブル書き換え
					for (let i = 0; i < 15; i++) {
						for (let j = 0; j < 4; j++) {

							if (i == 0 || i == 5 || i == 10) {
								loutr = 0;
								routr = 0;
								if (j == 0 && (i == 5 || i == 10)) {
									ltCnt = ltCnt + 2;
									rtCnt = rtCnt + 2;
								}
								
								// 6チーム目が存在しないのでスキップ
								if (i == 10 && j >= 2) {
									settbl.rows[i].cells[j].innerHTML = "";
									continue;
								}
								
								//ヘッダ行
								if (j == 0) {
									settbl.rows[i].cells[j].innerHTML = `チーム${( '00' + (ltCnt + 1)).slice( -2 )}`;
								} else if (j == 1) {
									let avgg = Math.round(average(teams[ltCnt]));
									if (avgg < mixPow) {
										mixPow = avgg;
									}
									if (avgg > maxPow) {
										maxPow = avgg;
									}
									settbl.rows[i].cells[j].innerHTML = `平均：${avgg}`;
								} else if (j == 2) {
									settbl.rows[i].cells[j].innerHTML = `チーム${( '00' + (rtCnt + 1)).slice( -2 )}`;
								} else if (j == 3) {
									let avgg = Math.round(average(teams[rtCnt]));
									if (avgg < mixPow) {
										mixPow = avgg;
									}
									if (avgg > maxPow) {
										maxPow = avgg;
									}
									settbl.rows[i].cells[j].innerHTML = `平均：${avgg}`;
								}
							} else {
								//明細行

								// 6チーム目が存在しないのでスキップ
								if (i > 10 && j >= 2) {
									settbl.rows[i].cells[j].innerHTML = "";
									continue;
								}

								if (j == 0) {
									settbl.rows[i].cells[j].innerHTML = `${teams[ltCnt][loutr].name}`;
								} else if (j == 1) {
									settbl.rows[i].cells[j].innerHTML = `${teams[ltCnt][loutr++].power}`;
								} else if (j == 2) {
									settbl.rows[i].cells[j].innerHTML = `${teams[rtCnt][routr].name}`;
								} else if (j == 3) {
									settbl.rows[i].cells[j].innerHTML = `${teams[rtCnt][routr++].power}`;
								}
							}

						}
					}

					// 子要素を指定しname属性の値を変更
					const newelement_name = newelement.children[0];
					const newelement_powd = newelement_name.children[0];
					newelement_powd.innerText = `パターン${( '00' + (calcCnt+1)).slice( -2 )}、最大${maxPow}、最小${mixPow}、差分${maxPow-mixPow}`;

					//親要素を取得し 複製した要素を追加
					const parent = document.getElementById("loopout");
					parent.appendChild(newelement);
					calcCnt++;
				}

			}

			document.getElementById("result1").innerHTML = `許容差：${allow}、試行数：${trycnt}`;
			document.getElementById("result2").innerHTML = `成立数：${calcCnt-1}`;
//			document.getElementById("result2").innerHTML = `成立数：${calcCnt-1}、成立率：${new Intl.NumberFormat('ja', { style: 'percent', maximumSignificantDigits: 5}).format((calcCnt-1)/trycnt*100)}%`;
//			document.getElementById("result2").innerHTML = `成立数：${calcCnt-1}、成立率：${Math.round((calcCnt-1)/trycnt*100)}%`;
			
//			// 複製するHTML要素を取得
//			const element = document.getElementById("oneset");

//			// 要素を複製
//			const newelement = element.cloneNode(true);

//			// 子要素を指定しname属性の値を変更
//			const newelement_name = newelement.children[0];
//			const newelement_powd = newelement_name.children[0];
//			newelement_powd.innerText = 'パターン02、最大2218、最小1199、差分500';
//			newelement_name.innerText = 'パターン02、最大2218、最小1199、差分500';

//			const newelement_tabd = newelement.children[1];
//			const newelement_tabl = newelement_tabd.children[0];

//			// テーブル書き換え
//			for (let i = 0; i < 10; i++) {
//				for (let j = 0; j < 4; j++) {
//					newelement_tabl.rows[i].cells[j].innerHTML = `i=${i},j=${j}`;
//				}
//			}
			
//			// 行追加＋１セル追加
//			let newRow = newelement_tabl.insertRow(-1); //引数-1 : 表の一番最後に1行追加
//			let newCell = newRow.insertCell();
//			let newText = document.createTextNode('山田');
//			newCell.appendChild(newText);

//			// ３セル追加
//			newCell = newRow.insertCell();
//			newText = document.createTextNode(18);
//			newCell.appendChild(newText);
//			newCell = newRow.insertCell();
//			newText = document.createTextNode(18);
//			newCell.appendChild(newText);
//			newCell = newRow.insertCell();
//			newText = document.createTextNode(18);
//			newCell.appendChild(newText);

//			//親要素を取得し 複製した要素を追加
//			const parent = document.getElementById("loopout");
//			parent.appendChild(newelement);


// table要素を取得
//var tableElem = document.getElementById('sample-table');
// tbody要素にtr要素（行）を最後に追加
//var trElem = tableElem.tBodies[0].insertRow(-1);\
// td要素を追加
//var cellElem = trElem.insertCell(0);
// td要素にテキストを追加
//cellElem.appendChild(document.createTextNode('セル'));

			
			//一番上までスクロール
			scrollTo(0, 0);
			scrollTo(0, 0);
			scrollTo(0, 0);
			scrollTo(0, 0);
			scrollTo(0, 0);
			scrollTo(0, 0);
			scrollTo(0, 0);
			scrollTo(0, 0);
			scrollTo(0, 0);
//			window.scroll({
//				top: 0,
//				behavior: "smooth",
//			});
		}

