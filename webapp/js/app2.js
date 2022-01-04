const game = () => {
  let pScore = 0;
  let cScore = 0;
  const startgame = () => {
    const storeBtn = document.querySelector(".button1");
    const groupBtn = document.querySelector(".button2");
    const introScreen = document.querySelector(".intro");
    const storeScreen = document.querySelector(".store");
    const playBtn = document.querySelector(".storebtn");
    const match = document.querySelector(".match");
    const groupScreen = document.querySelector(".group");
    groupBtn.addEventListener("click", () => {
      introScreen.classList.remove("fadeIn");
      introScreen.classList.add("fadeOut");
      groupScreen.classList.add("fadeIn");
    });
    storeBtn.addEventListener("click", () => {
      introScreen.classList.remove("fadeIn");
      introScreen.classList.add("fadeOut");
      storeScreen.classList.add("fadeIn");
    });
    playBtn.addEventListener("click", () => {
      if (storeScreen.classList.contains("fadeIn")) {
        storeScreen.classList.remove("fadeIn");
      }
      storeScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };
  //play match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".play-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");
    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
    //computer Options
    const computerOptions = ["rock", "paper", "scissors"];
    const match = document.querySelector(".match");
    const introScreen = document.querySelector(".intro");
    options.forEach((option) => {
      option.addEventListener("click", function () {
        console.log(this);
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        setTimeout(() => {
          //here we compare hands
          compareHands(this.textContent, computerChoice);
          //update score
          updateScore();
          //update img
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);

        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";

        setTimeout(() => {
          match.classList.remove("fadeIn");
          match.classList.add("fadeOut");
        }, 4500);
        setTimeout(() => {
          introScreen.classList.add("fadeIn");
        }, 5000);
      });
    });
  };
  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    //playerScore.textContent = pScore;
    //computerScore.textContent = cScore;
  };
  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");
    const bonus = document.getElementById("storetext").value;
    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie You get bonus " + bonus * 0.05;
      return;
    }
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins You get bonus " + bonus * 0.1;
        pScore++;
        return;
      } else {
        winner.textContent = "U suck You get bonus " + bonus * 0.03;
        cScore++;
        return;
      }
    }
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "U suck You get bonus " + bonus * 0.03;
        cScore++;
        return;
      } else {
        winner.textContent = "Player Wins You get bonus " + bonus * 0.1;
        pScore++;

        return;
      }
    }
    if (playerChoice === "scissors") {
      if (computerChoice === "paper") {
        winner.textContent = "Player Wins You get bonus " + bonus * 0.1;
        pScore++;
        return;
      } else {
        winner.textContent = "U suck You get bonus " + bonus * 0.03;
        cScore++;
        return;
      }
    }
  };
  //call inner function
  startgame();
  playMatch();
};
game();
