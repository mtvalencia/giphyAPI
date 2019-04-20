var topics = ["Dog", "Fan", "Baby", "Drake"];

    function displayGifInfo() {

        var name = $(this).attr("data-name");
        console.log(name);
  
        // Constructing a URL to search Giphy for the name of the person who said the quote
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "Dancing " + name + "&api_key=PV1NFafC5Ald0v1mpARWmUctNlGwZpy2&limit=10";
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        })
          // After the data comes back from the API
          .then(function(response) {

            var results = response.data;
            console.log(response.data);

            for (var i = 0; i < results.length; i++) {


              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                var gifDiv = $("<div>");
                gifDiv.addClass("card");

                var rating = results[i].rating;
  
                var gifDiv2 = $("<div>");
                gifDiv2.addClass("card-body");
                var p = $("<p>").text("Rating: " + rating);
                p.addClass("card-text");


                var nameImage = $("<img>");
                
                nameImage.attr("src", results[i].images.fixed_height_still.url);
                nameImage.addClass("card-img-top");
                nameImage.addClass("gif");

                var x = gifDiv2.append(p);
                var y = gifDiv.append(nameImage);
                var z = $(y).append(x);
  
                $(".card-deck").prepend(z);

              }
            }
          });
      }



            $("#addDancer").on("click", function(event) {

            event.preventDefault();


            var dancer = $("#dancerInput").val().trim();

            topics.push(dancer);
            console.log(topics);

            makeButtons();
      });


            function makeButtons() {

                $("#addingButtons").empty();
        

                for (var i = 0; i < topics.length; i++) {
        

                  var a = $("<button>");
                  a.addClass("gif-btn");

                  a.attr("data-name", topics[i]);

                  a.text(topics[i]);

                  $("#addingButtons").append(a);
                } 
                }

                $(document).on("click", ".gif-btn", displayGifInfo);

            makeButtons();

            $('body').on('click', '.gif', function() {
              var src = $(this).attr("src");
            if($(this).hasClass('playing')){

               $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
               $(this).removeClass('playing');
            } else {

              $(this).addClass('playing');
              $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
            }
          });