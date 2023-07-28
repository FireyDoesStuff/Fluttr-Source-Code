// if your cookies don't work don't edit this just clear ur cookies



// Array of randomized texts
    const bodyClass = document.body.classList;

var texts = ["yo yo yo wassup what's goin on my fine flutterer???", "i see you are about to type...", "anonymous developer was here", "what's up? is it a direction? i honestly forgot", "use [img 'https://neocities.org/img/cat.png'] to do images..."];
var key = 'fleek';
var element = document.getElementById("tweetInput");
var randomIndex = Math.floor(Math.random() * texts.length);
element.placeholder = texts[randomIndex];

const button = document.getElementById("themeButton");
const logo = document.getElementById("logoimg");
const body = document.body;
button.addEventListener("click", function(event) {
  if (event.target.matches("#blacktext")) {
    event.target.classList.toggle("dark-mode");
  }
});
button.addEventListener("click", function() {
  body.classList.toggle("dark-mode");
  logo.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    button.textContent = "Light Mode";
  } else {
    button.textContent = "Dark Mode";
  }
  document.querySelectorAll("#blacktext").forEach(element => {
    element.classList.toggle("dark-mode");
  });
  document.querySelectorAll("#tweetInput").forEach(element => {
    element.classList.toggle("dark-mode");
  });
});

// Function to encode cookies
function encodeCookies(cookies) {
  const encodedCookies = btoa(JSON.stringify(cookies));
  return encodedCookies;
}

// Function to decode cookies
function decodeCookies(encodedCookies) {
  const cookies = JSON.parse(atob(encodedCookies));
  return cookies;
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

for (var i = 0; i < cookies.length; i++) {
  var cookie = cookies[i];
  var eqPos = cookie.indexOf("=");
  var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
}
function blurElements() {
const elements = document.querySelectorAll('body > *:not(.popup)');
elements.forEach((element) => {
  element.style.filter = 'blur(5px)';
});

const popupChildren = document.querySelectorAll('.popup > *');
popupChildren.forEach((element) => {
  element.style.filter = 'none';
});
}
function unblurElements() {
  const elements = document.querySelectorAll('body > *');
  elements.forEach((element) => {
    element.style.filter = 'none';
  });
}
function showResetPopup() {
  blurElements();
  document.getElementById("resetPopup").style.display = "block";
}

function hideResetPopup() {
  unblurElements();
  document.getElementById("resetPopup").style.display = "none";
}

function resetFleeks() {
  deleteAllCookies();
  location.reload();
}

// Function to read tweets from cookies
function readTweets() {
  const tweetsCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('tweets='));
  if (tweetsCookie) {
    const encodedTweets = tweetsCookie.split('=')[1];
    const tweets = decodeCookies(encodedTweets);
    return tweets;
  }
  return [];
}
// formatted date
function getFormattedDate() {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const date = new Date();
  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
}
function decodeMSToFormattedDate(milliseconds) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  const date = new Date(milliseconds);
  const formattedDate = date.toLocaleString('en-US', options);

  return formattedDate;
}


// Function to set tweets in cookies
function setTweets(tweets) {
  const encodedTweets = encodeCookies(tweets);
  document.cookie = `tweets=${encodedTweets}; expires=Sun, 31 Dec 2099 23:59:59 UTC; path=/`;
}

// Function to add a new tweet
function tweet() {
  const tweetInput = document.getElementById("tweetInput");
  let tweetText = tweetInput.value.trim();

  if (tweetText === "") return;

  const tweets = readTweets();
  const currentDate = Date.now();

  // Check if the tweet includes the [media 'url'] format
const mediaRegex = /\[img\s+'(.+?)'\]/;
  let mediaUrlMatch = tweetText.match(mediaRegex, "");
   let mediaUrl = "";

  // If media URL is found, extract it from the tweet
  if (mediaUrlMatch) {
    mediaUrl = mediaUrlMatch[1];
    // Remove the media tag from the tweet text
    tweetText = tweetText.replace(mediaRegex, "").trim();
  }
  const newTweet = { text: tweetText, date: currentDate, media: mediaUrl };
  tweets.push(newTweet);
  setTweets(tweets);

  tweetInput.value = "";

  const tweetList = document.getElementById("tweetList");

  const tweetItem = document.createElement("div");
  tweetItem.className = "tweet";

    const tweetTextElement = document.createElement("p");
    tweetTextElement.innerText = newTweet.text;
    tweetTextElement.id = 'blacktext';
    if (bodyClass.contains("dark-mode")) {
  tweetTextElement.classList.toggle("dark-mode");
} else {
}
    tweetItem.appendChild(tweetTextElement);


  const tweetDateElement = document.createElement("p");
  tweetDateElement.innerText = decodeMSToFormattedDate(newTweet.date);
  tweetDateElement.classList.add("gray-text");
  tweetItem.prepend(tweetDateElement);

  // If media URL is available, add an image element to the tweet
  if (mediaUrl !== "") {
    const mediaElement = document.createElement("img");
    mediaElement.src = mediaUrl;
    tweetItem.appendChild(mediaElement);
  }

  tweetList.prepend(tweetItem);
}


// Function to load saved tweets from cookies on page load
window.onload = function () {
  const tweets = readTweets();
  const tweetList = document.getElementById("tweetList");
  tweets.reverse();

  tweets.forEach(tweet => {
    const tweetItem = document.createElement("div");
    tweetItem.className = "tweet";

    const tweetTextElement = document.createElement("p");
    tweetTextElement.innerText = tweet.text;
    tweetTextElement.id = 'blacktext';

if (bodyClass.contains("dark-mode")) {
  tweetTextElement.classList.toggle("dark-mode");
} else {
}
    tweetItem.appendChild(tweetTextElement);

    const tweetDateElement = document.createElement("p");
    tweetDateElement.innerText = decodeMSToFormattedDate(tweet.date);
    tweetDateElement.classList.add("gray-text");
    tweetItem.prepend(tweetDateElement);

    // Check if the tweet has a media URL
    if (tweet.media) {
      const mediaElement = document.createElement("img");
      mediaElement.src = tweet.media;
      tweetItem.appendChild(mediaElement);
    }

    tweetList.appendChild(tweetItem);
  });
};