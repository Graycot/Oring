fetch("sites.json") // Import data from sites.json
.then((response) => {
  return response.json();
})
.then((data) => main(data));

function main(data) {
  console.log(data.webringSites[1].siteURL);
  const tag = document.getElementById('member-list');
  const regex = /^https:\/\/|\/$/g;
  let list = "";
  let i;
  for (i = 0; i < data.webringSites.length; i++) {list += `<li><a target="_blank" href='${data.webringSites[i].siteURL}'>${data.webringSites[i].siteURL.replace(regex, "")}</a></li>`;}
  tag.insertAdjacentHTML('afterbegin', `<h2 id="list">Member Count: ${i}</h2> <ol>${list}</ol>`);
}