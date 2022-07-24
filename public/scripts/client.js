/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (userKey) {
  const timeSince = timeago.format(userKey.created_at);
  const safeHTML = escape(userKey.content.text);
  let $tweet = $(`
    <article>
      <header>
        <span class="user"><img class="user" src="${userKey.user.avatars}" alt="Face Logo Image"/>
        <p class="name-handle">${userKey.user.name}</p></span>
        <p class="at-handle">${userKey.user.handle}</p>
     </header>
        <p class="text-handle">${safeHTML}</p>
      <footer>
        <span>${timeSince}</span>
        <span class ="buttons">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>`);
  return $tweet;
};

const renderTweets = function (users) {
  // // Another way to loop through the object using map and applying each of the data to prepend
  // users.map((userTweet) => {
  //   $("#tweets-container").prepend(createTweetElement(userTweet));
  // });

  for (let userTweet of users) {
    $("#tweets-container").prepend(createTweetElement(userTweet));
  }
};

const loadTweet = function () {
  // Can be written in the short hand in the future refactor by using the shorthand method and using then and catch. Also separate it in an another function
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json",
    success: (data) => {
      console.log("This request succeeded and here's the data: ", data);
      $("#tweets-container").empty();
      renderTweets(data);
    },
    error: (error) => {
      console.log("This request failed and the was the error: ", error);
    },
  });
};

$(document).ready(function () {
  $("form").on("submit", function (event) {
    event.preventDefault();

    // Creating a tweet data variable
    const tweetData = $(this).serialize();

    const textLengthCheck = $(this).children("#tweet-text").val().length;

    if (textLengthCheck > 140) {
      alert("Character length has exceeded");
    } else if (!textLengthCheck) {
      alert("There are no characters placed");
      //Learned this => 'textLengthCheck.preventDefault()' in youtube when researching for keypress/down/up events
      textLengthCheck.preventDefault();
    } else {
      // Can be written in the short hand in the future refactor by using the shorthand method and using then and catch. Also separate it in an another function.
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: tweetData,
        success: (data) => {
          console.log("This request succeeded and here's the data: ", data);
          loadTweet();
        },
        error: (error) => {
          console.log("This request failed and the was the error: ", error);
        },
      });
    }
  });
});
