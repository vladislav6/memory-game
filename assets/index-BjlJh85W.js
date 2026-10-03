//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/js/common/functions.js
function createMyElement(element, classElement = "", idElement = "", textElement = "") {
	const myElement = document.createElement(element);
	if (textElement) myElement.textContent = textElement;
	if (classElement) myElement.className = classElement;
	if (idElement) myElement.id = idElement;
	return myElement;
}
function cleanDOM(parent) {
	while (parent.firstChild) parent.firstChild.remove();
}
function addClassAllElements(arrayElements, classElement) {
	return arrayElements.forEach((element) => element.classList.add(...classElement));
}
function removeClassAllElements(arrayElements, classElement) {
	return arrayElements.forEach((element) => element.classList.remove(...classElement));
}
//#endregion
//#region src/js/data/game-state.js
var gameState = {
	moves: 0,
	pairs: 0,
	selectedCards: "",
	flipedcards: [],
	leaderboardData: [],
	makeStep() {
		this.moves += 1;
	},
	makePair() {
		this.pairs += 1;
	},
	checkPairsCards(card) {
		return this.selectedCards === card;
	},
	setResultToTable(data) {
		this.leaderboardData.push(data);
	},
	getResultToTable() {
		return this.leaderboardData;
	}
};
//#endregion
//#region src/js/game/modal-window.js
var body = document.body;
var closeModal = (e) => {
	if (e.target.closest(".close-btn") || !e.target.closest(".modal")) {
		body.removeChild(e.currentTarget);
		body.classList.remove("no-scroll");
	}
};
document.addEventListener("keydown", (e) => {
	const overlay = document.querySelector(".overlay");
	if (e.key === "Escape" && overlay) {
		body.removeChild(overlay);
		body.classList.remove("no-scroll");
	}
});
function modalWindow(content) {
	const overlay = createMyElement("div", "overlay");
	const modal = createMyElement("div", "modal");
	const title = createMyElement("p", "title-modal", "", content.title);
	const result = content.content;
	const btnBlock = createMyElement("div", "btn-block");
	const closeBtn = createMyElement("button", "btn close-btn", "", "Close");
	if (content.isVictoryModal) {
		const newGameBtn = createMyElement("button", "btn new-game-btn", "", "New game");
		btnBlock.append(newGameBtn);
		newGameBtn.addEventListener("click", newGame);
	}
	btnBlock.append(closeBtn);
	modal.append(title, result, btnBlock);
	overlay.append(modal);
	body.append(overlay);
	body.classList.add("no-scroll");
	overlay.addEventListener("click", closeModal);
}
//#endregion
//#region src/js/game/victory.js
function victoryModal(moves) {
	modalWindow({
		title: "All pairs found!",
		content: createMyElement("p", "result", "", `Result: ${moves} moves`),
		isVictoryModal: true
	});
}
//#endregion
//#region src/js/data/local-storage.js
function setDataToLS(moves) {
	const date = /* @__PURE__ */ new Date();
	const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
	gameState.setResultToTable({
		moves,
		formattedDate
	});
	const sorted = gameState.getResultToTable().sort((a, b) => a.moves - b.moves || a.formattedDate - b.formattedDate);
	if (sorted.length > 10) sorted.length = 10;
	localStorage.setItem("memoryGameLeaderboardData", JSON.stringify(sorted));
}
//#endregion
//#region src/js/game/controller.js
var timeoutID = 0;
function controller(cards, card, cardId) {
	const movesCount = document.querySelector(".moves-count");
	const pairsCount = document.querySelector(".pairs-count");
	gameState.flipedcards.push(card);
	if (gameState.checkPairsCards(cardId)) {
		gameState.makePair();
		gameState.makeStep();
		addClassAllElements(gameState.flipedcards, ["fliped"]);
		gameState.selectedCards = "";
		gameState.flipedcards.length = 0;
	}
	if (gameState.flipedcards.length >= 2) {
		gameState.makeStep();
		addClassAllElements([...cards.children], ["disable"]);
		timeoutID = setTimeout(() => {
			removeClassAllElements([...cards.children], ["active", "disable"]);
			gameState.selectedCards = "";
			gameState.flipedcards.length = 0;
		}, 1e3);
	}
	gameState.selectedCards = cardId;
	movesCount.textContent = `${gameState.moves}`;
	pairsCount.textContent = `${gameState.pairs}`;
	if (gameState.pairs === 8) {
		victoryModal(gameState.moves);
		setDataToLS(gameState.moves);
	}
}
//#endregion
//#region src/js/game/new-game.js
function newGame() {
	const data = JSON.parse(localStorage.getItem("memoryGameLeaderboardData"));
	gameState.moves = 0;
	gameState.pairs = 0;
	gameState.selectedCards = "";
	gameState.flipedcards.length = 0;
	gameState.leaderboardData = data ? data : [];
	renderGame();
	document.body.classList.remove("no-scroll");
	clearTimeout(timeoutID);
}
//#endregion
//#region src/js/game/leaderboard.js
function leaderboard() {
	const data = gameState.getResultToTable();
	const table = createMyElement("table", "leaderboard");
	const fragment = document.createDocumentFragment();
	if (data.length !== 0) {
		const trHead = createMyElement("tr");
		const thPosition = createMyElement("th", "", "", "Position");
		const thMoves = createMyElement("th", "", "", "Moves");
		const thDate = createMyElement("th", "", "", "Date");
		trHead.append(thPosition, thMoves, thDate);
		fragment.append(trHead);
		data.forEach((game, id) => {
			const tr = createMyElement("tr");
			const tdPosition = createMyElement("td", "", "", `${id + 1}`);
			const tdMoves = createMyElement("td", "", "", `${game.moves}`);
			const tdDate = createMyElement("td", "", "", `${game.formattedDate}`);
			tr.append(tdPosition, tdMoves, tdDate);
			fragment.append(tr);
		});
	} else {
		const result = createMyElement("p", "result", "", "No data");
		fragment.append(result);
	}
	table.append(fragment);
	modalWindow({
		title: "Leaderboard",
		content: table,
		isVictoryModal: false
	});
}
//#endregion
//#region src/js/sections/header.js
function createHeader() {
	const header = createMyElement("header");
	const moves = createMyElement("div", "moves", "", " moves");
	const movesCount = createMyElement("span", "moves-count", "", "0");
	const pairs = createMyElement("div", "pairs", "", " out of 8 pairs");
	const pairsCount = createMyElement("span", "pairs-count", "", "0");
	const newGameBtn = createMyElement("button", "btn new-game-btn", "", "New Game");
	const leaderboardBtn = createMyElement("button", "btn leaderboard-btn", "", "Leaderboard");
	newGameBtn?.addEventListener("click", newGame);
	leaderboardBtn?.addEventListener("click", leaderboard);
	moves.prepend(movesCount);
	pairs.prepend(pairsCount);
	header.append(newGameBtn, moves, pairs, leaderboardBtn);
	return header;
}
//#endregion
//#region src/assets/cards/backside.jpg
var backside_default = new URL("backside-g6JY6qhz.jpg", import.meta.url).href;
//#endregion
//#region src/assets/cards/audi.png
var audi_default = new URL("audi-CcND0UUs.png", import.meta.url).href;
//#endregion
//#region src/assets/cards/bmw.png
var bmw_default = new URL("bmw-DiJkOe-G.png", import.meta.url).href;
//#endregion
//#region src/assets/cards/ford.png
var ford_default = new URL("ford-Bk3Fclxk.png", import.meta.url).href;
//#endregion
//#region src/assets/cards/landrover.png
var landrover_default = new URL("landrover-B5N7Xb1B.png", import.meta.url).href;
//#endregion
//#region src/assets/cards/mersedes.png
var mersedes_default = new URL("mersedes-CBOb-JKL.png", import.meta.url).href;
//#endregion
//#region src/assets/cards/porsche.png
var porsche_default = new URL("porsche-E_U7y0Au.png", import.meta.url).href;
//#endregion
//#region src/assets/cards/toyota.png
var toyota_default = new URL("toyota-CiUu-4aV.png", import.meta.url).href;
//#endregion
//#region src/assets/cards/vw.png
var vw_default = new URL("vw-CEGRVPZa.png", import.meta.url).href;
//#endregion
//#region src/js/data/cards.js
var backOfCards = {
	id: 0,
	img: backside_default
};
var cards = [
	{
		id: 1,
		img: audi_default
	},
	{
		id: 2,
		img: bmw_default
	},
	{
		id: 3,
		img: ford_default
	},
	{
		id: 4,
		img: landrover_default
	},
	{
		id: 5,
		img: mersedes_default
	},
	{
		id: 6,
		img: porsche_default
	},
	{
		id: 7,
		img: toyota_default
	},
	{
		id: 8,
		img: vw_default
	}
];
//#endregion
//#region src/js/game/flip-card.js
function flipCard(e) {
	if (e.target.closest(".flip-card")) {
		const cards = e.currentTarget;
		const card = e.target.closest(".flip-card");
		const cardId = card.dataset.cardId;
		card.classList.toggle("active");
		if (card.classList.contains("active")) controller(cards, card, cardId);
		else gameState.selectedCards = "";
	}
}
//#endregion
//#region src/js/game/shuffle.js
function shuffle(array) {
	let m = array.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}
//#endregion
//#region src/js/sections/cards-block.js
function createCardsBlock() {
	const cardsBlock = createMyElement("section", "cards");
	const fragment = document.createDocumentFragment();
	shuffle([...cards, ...cards]).forEach((card) => {
		const cardElement = createMyElement("div", "flip-card");
		cardElement.dataset.cardId = card.id;
		const cardInner = createMyElement("div", "flip-card-inner");
		const cardInnerBack = createMyElement("div", "flip-card-back");
		const cardInnerFront = createMyElement("div", "flip-card-front");
		const cardImageBack = createMyElement("img");
		cardImageBack.src = backOfCards.img;
		cardImageBack.alt = "";
		const cardImageFfont = createMyElement("img");
		cardImageFfont.src = card.img;
		cardImageFfont.alt = "";
		cardInnerBack.append(cardImageBack);
		cardInnerFront.append(cardImageFfont);
		cardInner.append(cardInnerBack, cardInnerFront);
		cardElement.append(cardInner);
		fragment.append(cardElement);
	});
	cardsBlock?.addEventListener("click", flipCard);
	cardsBlock.append(fragment);
	return cardsBlock;
}
//#endregion
//#region src/js/sections/main.js
function createMain() {
	const main = createMyElement("main");
	const cardsBlock = createCardsBlock();
	main.append(cardsBlock);
	return main;
}
//#endregion
//#region src/js/sections/render.js
function renderGame() {
	const body = document.body;
	const main = createMain();
	const header = createHeader();
	cleanDOM(body);
	body.append(header, main);
}
//#endregion
//#region src/js/index.js
window.addEventListener("DOMContentLoaded", newGame);
//#endregion

//# sourceMappingURL=index-BjlJh85W.js.map