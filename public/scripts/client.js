/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const loadTweet = function () {
  // Can be written in the short hand in the future refactor by using the shorthand method and using then and catch. Also separate it in an another function
  $.ajax({
    type: "GET",
    url: "/tweets",
    dataType: "json",
    success: (data) => {
      console.log("This request succeeded and here's the data: ", data);
      $("#tweetContainer").empty();

      const timeSince = Math.floor(Date.now() / 1000);

      const createNewTweet = (data) => {
        const $tweet = $(` 
    <article>
      <header>
        <span class="user"><img class="user" src="${data.user.avatars}" alt="Face Logo Image">
        <p>${data.user.name}</p></span>
        <p class="handle">${data.user.handle}</p>
     </header>
        <p>${data.content.text}</p>
    
      <footer>
        <span> 5 days ago</span>
        <span class ="buttons"> 
          <i class="fas fa-flag"></i> 
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>`);

        return $tweet;
      };

      // data.map((tweet) => {
      //   $("#tweetContainer").prepend(createNewTweet(tweet));
      // });

      for (let tweet of data) {
        $("#tweetContainer").prepend(createNewTweet(tweet));
      }
    },
    error: (error) => {
      console.log("This request failed and the was the error: ", error);
    },
  });
};

$(() => {
  $("form").on("submit", function (event) {
    event.preventDefault();

    // Creating a tweet data variable
    const tweetData = $(this).serialize();

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
  });
});
