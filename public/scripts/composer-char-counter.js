//Document ready shorthand form
$(() => {
  $("#tweet-text").on("input", function () {
    const tweetLimit = 140;
    const sentenceLength = $(this).val().length;

    // Traversing the DOM
    const counter = $(this).siblings("#tweetDisplay").children(".counter");

    const remainingCharacters = tweetLimit - sentenceLength;
    counter.val(remainingCharacters);

    //Character limit check
    if (remainingCharacters < 0) {
      $(".counter").addClass("counterLimit");
    } else {
      $(".counter").removeClass("counterLimit");
    }
  });
});
