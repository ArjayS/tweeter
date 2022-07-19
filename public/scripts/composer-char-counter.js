$(document).ready(function () {
  // --- our code goes here ---
  // console.log("Hello World");
  // $(".new-tweet").blur(function () {
  //   console.log("Hi");
  // });
  // console.log("#tweet-");
  $("#tweet-text").on("input", function () {
    const tweetLimit = 140;
    const sentenceLength = $(this).val().length;

    // Traversing the DOM: this = #tweet-text, sibling of it is another div with #tweet-container and within it is where we want to go which is the children with ".counter"
    const counter = $(this).siblings("#tweet-container").children(".counter");

    const remainingCharacters = tweetLimit - sentenceLength;
    counter.val(remainingCharacters);

    if (remainingCharacters < 0) {
      $(".counter").addClass("counterLimit");
    } else {
      $(".counter").removeClass("counterLimit");
    }
  });
});
