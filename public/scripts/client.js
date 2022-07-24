/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Escaping a script
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Creating a tweet element
const createTweetElement = function(userKey) {
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

//Rendering tweets
const renderTweets = function(users) {
  //Loop through each tweet
  users.map((userTweet) => {
    $("#tweets-container").prepend(createTweetElement(userTweet));
  });
};

//Load each tweets with ajax get request
const loadTweet = function() {
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json",
  })
    .then((data) => {
      console.log("This request succeeded and here's the data: ", data);
      $("#tweets-container").empty();
      renderTweets(data);
    })
    .catch((error) => {
      console.log("This request failed and the was the error: ", error);
    });
};

//Document ready shorthand form
$(() => {
  $("form").on("submit", function(event) {
    //Prevent the default on form submission
    event.preventDefault();

    // Creating a tweet data variable
    const tweetData = $(this).serialize();

    //Variable for traversing the DOM to check the text length
    const textLengthCheck = $(this).children("#tweet-text").val().length;

    //Conditional check if text is more than 140 characters or empty characters are in the input
    if (textLengthCheck > 140) {
      $(".textLimitError")
        .text("⛔ Character length has exceeded ⛔")
        .slideDown();
    } else if (!textLengthCheck) {
      $(".noTextError")
        .text("⛔ There are no characters placed ⛔")
        .slideDown();
    } else {
      $(".textLimitError").slideUp();
      $(".noTextError").slideUp();

      //Create the data in the ajax post request

      $.post("/tweets", tweetData)
        .then((tweetData) => {
          console.log(
            "This request succeeded and here's the data: ",
            tweetData
          );
          loadTweet();
        })
        .catch((error) => {
          console.log("This request failed and the was the error: ", error);
        });
    }
  });
});
