window.onload = () => {
	let stage = 1;
	let userInput = [];
	let gameCount = [0, 0];
	let order = createRandomArray(stage);
	const game = document.getElementById('game');
	const msg = document.getElementById('msg');
	const win = document.getElementById('win');
	const lose = document.getElementById('lose');
	const totalGames = document.getElementById('total');
	const difficult = document.getElementById('difficult');
	const up = document.getElementById('down');
	const down = document.getElementById('up');

	up.addEventListener('click', () => {
		if (stage === 5) {
			return;
		}
		stage += 1;
		difficult.textContent = stage;
		order = createRandomArray(stage);
		createBoxes(stage);
		document.getElementById('cover').style.display = 'flex';
		msg.innerHTML = '';
		game.textContent = '시작하기';
		game.style.color = 'white';
		// for test
		document.getElementById('testBox').textContent = order.map(el => el + 1).join('-');
	});
	down.addEventListener('click', () => {
		if (stage === 1) {
			return;
		}
		stage -= 1;
		difficult.textContent = stage;
		order = createRandomArray(stage);
		createBoxes(stage);
		document.getElementById('cover').style.display = 'flex';
		msg.innerHTML = '';
		game.textContent = '시작하기';
		game.style.color = 'white';
		// for test
		document.getElementById('testBox').textContent = order.map(el => el + 1).join('-');
	});
	game.addEventListener('click', () => {
		order = createRandomArray(stage);
		createBoxes(stage);
		show(order);
		console.log(order);
		// for test
		document.getElementById('testBox').textContent = order.map(el => el + 1).join('-');
	});

	function show(order) {
		document.getElementById('cover').style.display = 'none';
		document.getElementById('innerCover').style.display = 'block';
		for (let i = 0; i < order.length; i++) {
			setTimeout(() => {
				document.getElementById(order[i]).classList.add('on');
				if (i) {
					document.getElementById(order[i - 1]).classList.remove('on');
					if (i === order.length - 1) {
						setTimeout(() => {
							document.getElementById(order[i]).classList.remove('on');
							document.getElementById('innerCover').style.display = 'none';
						}, 500);
					}
				}
			}, i * 500 + 1000);
		}
	}

	function createRandomArray(stage) {
		const N = Math.pow(stage + 2, 2);
		const arr = new Array(N).fill(0).map((el, idx) => idx);
		const result = [];
		for (let i = 0; i < N; i++) {
			const ran = Math.floor(Math.random() * (N - i));
			result.push(arr.splice(ran, 1)[0]);
		}
		return result;
	}

	function createBoxes(stage) {
		const N = stage + 2;
		const con = document.getElementById('container');
		con.innerHTML = '';
		for (let i = 0; i < N; i++) {
			const row = document.createElement('div');
			row.style.height = `${Math.floor(100 / N)}%`;
			row.classList.add('row');
			for (let j = 0; j < N; j++) {
				const div = document.createElement('div');
				div.style.width = `${Math.floor(100 / N)}%`;
				div.style.margin = `0 ${9 - N}px`;
				div.id = N * i + j;
				div.classList.add('box');
				div.addEventListener('click', () => {
					div.classList.add('clicked');
					userInput.push(N * i + j);
					if (checkFail()) {
						cover.style.display = 'flex';
						game.textContent = '다시하기';
						game.style.color = 'red';
						msg.textContent = '실패 ...';
						gameCount[1]++;
						totalGames.textContent = gameCount[0] + gameCount[1];
						lose.textContent = gameCount[1];
						userInput = [];
					} else {
						if (userInput.length === order.length) {
							cover.style.display = 'flex';
							game.textContent = '다시하기';
							game.style.color = 'blue';
							msg.textContent = '성공 !!!';
							gameCount[0]++;
							totalGames.textContent = gameCount[0] + gameCount[1];
							win.textContent = gameCount[0];
							userInput = [];
						}
					}
				});
				row.appendChild(div);
			}
			con.appendChild(row);
		}
	}

	function checkFail() {
		if (userInput[userInput.length - 1] !== order[userInput.length - 1]) {
			return true;
		} else {
			return false;
		}
	}
};
