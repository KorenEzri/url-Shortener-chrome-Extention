document.addEventListener(
  "DOMContentLoaded",
  function () {
    console.log(document.body);
    const shortenUpButton = document.getElementById("shortenUp");

    shortenUpButton.addEventListener(
      "click",
      function () {
        let tab;
        chrome.tabs.query(
          {
            active: true, // Select active tabs
            lastFocusedWindow: true, // In the current window
          },
          function (arrayOfTabs) {
            tab = arrayOfTabs[0];
            const url = tab.url;
            console.log(url);
          }
        );

        $.ajax({
          url: "http://localhost:8000/api/short_links/",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: form,
          success: function (resp) {
            console.log(resp);
            console.log(resp.short_link);
          },
          error: function (req, status, err) {
            console.log("something went wrong", status, err);
          },
        });
      },
      false
    );
  },
  false
);
