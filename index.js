const resultsContainer = document.getElementById("results");
const detailsContainer = document.getElementById("details");
let apiUrl = "https://api.github.com";
$(document).ready(function () {
  $("a").on("click", function (event) {
    searchRepositories()
  });
  $("#results ul").on("click", function (event) {
    if (event.target.localName === "a") {
      const link = event.target;
      showCommits(link);
    }
  });
});

function searchRepositories () {
  const term = $("#searchTerms").val();
  $.get(apiUrl + "/search/repositories", {q: term}, function (data) {
    fillRepositories(data["items"]);
  });
}

function fillRepositories (items) {
  items.forEach(item => {
    const li = $("<li>");
    const a = $("<a>", {
      text: item["name"],
      "data-repository": item["name"],
      "data-owner": item["owner"]["login"],
      href: "#"
    }).appendTo(li);
    li.appendTo("#results ul");
  });
}

function showCommits (link) {
  if (typeof link === undefined) {
    return;
  }
  const url = `${apiUrl}/repos/${link.dataset["owner"]}/${link.dataset["repository"]}/commits`;
  $.get(url, function (data) {
    fillCommits(data);
  });
}

function fillCommits (commits) {
  commits.forEach(commit => {
    const li = $("<li>");
    li.text(`${commit["sha"]} - ${commit["commit"]["committer"]["name"]} - ${commit["author"]["login"]}`);
    li.appendTo("#details ul");
  });
}

function displayError() {
  $("#errors").text("error: I'm sorry, there's been an error. Please try again.");
}
