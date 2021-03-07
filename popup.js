document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  // const base_request_url = "https://korenezri-jsondb.herokuapp.com";
  const main_request_url = "https://Url-Shortener-Task.korenezri.repl.co";
  // FUNCTION: CREATE ELEMENTS
  const createElements = (type, attributes, ...children) => {
    const element = document.createElement(type);
    for (key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
    children.forEach((child) => {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
    return element;
  };
  const deleteElements = async (wrapper, ...elements) => {
    let nodeLists = [];
    elements.forEach((element) => {
      nodeList = wrapper.getElementsByTagName(`${element}`);
      nodeLists.push(nodeList);
    });
    nodeLists.forEach((nodeList) => {
      while (nodeList[0]) nodeList[0].parentNode.removeChild(nodeList[0]);
    });
  };
  // FUNCTION: SEND REQUEST TO SHORTEN A URL
  const shortenURLrequest = (longUrl) => {
    data = { longUrl };
    fetch(`${main_request_url}/api/shorturl/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((initialResponse) => {
      initialResponse.json().then((shortenedUrlObj) => {
        let urlPresentor = createElements(
          "div",
          {
            id: "url-presentor",
          },
          createElements(
            "a",
            { href: shortenedUrlObj.long, class: "link", target: "_blank" },
            shortenedUrlObj.short
          )
        );
        mainWrapper.appendChild(urlPresentor);
        const visitHomeSite = createElements(
          "a",
          {
            class: "home-site",
            href: "https://Url-Shortener-Task.korenezri.repl.co",
            target: "_blank",
          },
          "Visit Home :)"
        );
        mainWrapper.appendChild(visitHomeSite);
        tag = true;
      });
    });
  };

  // RENDER HTML
  // CREATE AND RENDER THE SHORTEN URL BUTTON INSIDE A DIV INSIDE A "MAINWRAPPER" DIV
  const shortenUpButton = createElements(
    "button",
    { type: "button", id: "shorten-url", class: "vital" },
    "Double Click to shorten!"
  );
  const mainWrapper = createElements(
    "div",
    { id: "main-wrapper", class: "vital" },
    createElements("div", { id: "button-div", class: "vital" }, shortenUpButton)
  );
  body.appendChild(mainWrapper);

  //EVENT LISTENER ON BUTTON
  const button = document.querySelector("#shorten-url");
  let tab;
  let tag = false;
  button.addEventListener("click", () => {
    if (tag === true) {
      console.log("asd");
      return;
    }
    chrome.tabs.query(
      {
        active: true,
        lastFocusedWindow: true,
      },
      function (tabArray) {
        tab = tabArray[0];
      }
    );

    if (tab) {
      shortenURLrequest(tab.url);
    }
  });
});
