# Oring - Create your own WebRing

## What is a webring?

  A webring (or web ring) is a collection of websites linked together in a circular structure, and usually organized around a specific theme, often educational or social. They were popular in the 1990s and early 2000s, particularly among amateur websites.

  To be a part of the webring, each site has a common navigation bar. It contains links to the previous and next site. By selecting next (or previous) repeatedly, the user will eventually reach the site they started at. This is the origin of the term webring. The select-through route around the ring is usually supplemented by a central site with links to all member sites; this prevents the ring from breaking completely if a member site goes offline. The advantage of a webring is that if the user is interested in the topic on one website, they can quickly connect to another website on the same topic. Webrings usually have a moderator who decides which pages to include in the webring. After approval, webmasters add their pages to the ring by 'linking in' to the ring; this requires adding the necessary HTML or JavaScript widget to their site.

*This explaination was borrowed from [Wikipedia](https://en.wikipedia.org/wiki/Webring)*

![](https://docs.graycot.dev/uploads/3a175640-0dcd-4483-ba47-4aaa5b8f863f.png)

*This graphic was borrowed from [WebringWorld](http://www.webringworld.org/)*

## What is Oring?

  Oring is an open source template that anyone can use to create their own webring! Simply follow the instructions on this page and you will have your own unique webring!

1. The HTML webring runs JavaScript on the Ring Master's Site.

The HTML webring is static and does not contain dynamic data. The styling and structure of the HTML widget is ENTIRELY up to the Member Site.

## HTML Widget

   Membersites will insert this code into the HTML of the webpage they want the HTML widget located.

  ```html
<!-- Replace "RINGMASTER.COM" with the URL of the Ring Master's website -->
    <div>
      <a href="https://RINGMASTER.COM/Oring/html-redirect.html?action=prev"> < </a>
      <a href="https://RINGMASTER.COM/Oring/html-redirect.html?action=list"> ... </a>
      <a href="https://RINGMASTER.COM/Oring/html-redirect.html?action=home"> MYWEBRING </a>
      <a href="https://RINGMASTER.COM/Oring/html-redirect.html?action=rand"> ? </a>
      <a href="https://RINGMASTER.COM/Oring/html-redirect.html?action=next"> > </a>
    </div>
  ```

  When a visitor on a member site clicks one of these links, they will be directed to a webpage that the RingMaster (you) control. The page you control will run the <a href="#webring">webring.js</a> script.

  The script will look at a list of member websites and find the index of the member site that the visitor was on. The script will then find the previous site in the list, the next site in the list, and a random site in the list. Once the calculations are done, it will read the the link after `?action=` to determine how and where to redirect the visitor.

## webring

`webring.js`

```js
/* Oring v4.0. Copyleft 🄯 ALL WRONGS RESERVED 🄯 Gray (g@graycot.dev) (https://graycot.dev/).

Oring is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License (GPLv3+) as published by
the Free Software Foundation. (http://www.gnu.org/licenses/)*/

// get webring data
fetch("./webring.json")
.then(response => {
   return response.json();
})
.then(data => webring(data));

// get sites list
fetch("./sites.json")
.then(response => {
   return response.json();
})
.then(data => sites(data));

function webring(data) {
  // get webring data webring.json
  let webringName = data.webringInfo[0].webringName;
  let webringHome = data.webringInfo[0].webringHome;
  let webringMemberList = data.webringInfo[0].webringMemberList;
}

function sites(data) {

  // get URL of this member site
  let thisSiteURL = window.location.href;
  //init to avoid weird errors
  let thisIndex;
  let i;
  let thisSiteName
  //find this site in member list
  for (i = 0; i < data.webringSites.length; i++) {
    if (thisSiteURL.startsWith(data.webringSites[i].siteURL)) {
      thisIndex = i;
      thisSiteName = data.webringSites[thisIndex].siteName;
      break;
    }
  }
  //if this site is not in member list, set index to last member of list
  if (thisIndex == undefined) {
  thisIndex = data.webringSites.length-1;
  thisSiteName = 'unknown'
  }
  // find index of site before and after this site. Also compute a random index.
  let previousIndex = (thisIndex-1 < 0) ? data.webringSites.length-1 : thisIndex-1;
  let randomIndex = Math.floor(Math.random() * (data.webringSites.length));
  let nextIndex = (thisIndex+1 >= data.webringSites.length) ? 0 : thisIndex+1;
  // use the indices calculated above to find the corresponding site URL in the member list
  let previousSiteURL = data.webringSites[previousIndex].siteURL;
  let randomSiteURL = data.webringSites[randomIndex].siteURL;
  let nextSiteURL = data.webringSites[nextIndex].siteURL;

  // Detects whether user clicked the Previous, List, Home, Next, Random, or other link:
  const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
  });
  let value = params.action;

  // If the site that the user just came from is not part of the webring, this sets the Previous and Next button to Random.
  if (thisIndex == null) {
    previousIndex = randomIndex;
    nextIndex = randomIndex;
  }

  // Previous, List, Home, Next, Random, or other actions
  if (value == 'prev') {
      window.location.href = previousSiteURL;
  } else if (value == 'next') {
      window.location.href = nextSiteURL;
  } else if (value == 'list') {
      window.location.href = webringMemberList;
  } else if (value == 'home') {
      window.location.href = webringHome;
  } else if (value == 'rand') {
      window.location.href = randomSiteURL;
  } else {
      window.location.href = randomSiteURL; //In-case of value == null
  }

};
```

## Data

`webring.json`

```json
{
    "webringInfo": [
      {"webringName": "Example Ring", "webringHome": "https://example.com/home", "webringMemberList": "https://example.com/home#list"}
    ]
  }
```

`sites.json`

```json

{
  "webringInfo": [
    {"webringName": "Example Ring", "webringHome": "https://example.com/home", "webringMemberList": "https://example.com/home#list"}
  ],
  "webringSites": [
    { "siteOwner": "Red", "siteName": "Radium's rotation", "siteURL": "https://example.com/1", "siteTags": "Red, roeus", "siteShortDescription": "111", "siteLongDescription": "1111111"},
    { "siteOwner": "Blue", "siteName": "Bird's bounties", "siteURL": "https://example.com/2", "siteTags": "Blue, bacon", "siteShortDescription": "222", "siteLongDescription": "2222222"},
    { "siteOwner": "Green", "siteName": "Greg's grains", "siteURL": "https://example.com/3", "siteTags": "Green, Grass", "siteShortDescription": "333", "siteLongDescription": "3333333"}

  ]
}
```

The JSON is fairly self-explanatory. Edit the values to suit your webring. **Note, after every Member Site entry, there MUST be a comma EXCEPT for the last Member Site entry in-which there MUST NOT have a comma.** *is that convoluted? Yes. Thank JSON for that.*

## Member list

You can generate a list of the webring members by inserting this HTML fragment: `<div id="member-list"><script async src="member-list.js"></script></div>`  into a webpage. You can modify `member-list.js` to display any data contained within the `webring.json` and `sites.json` files.

---
Self notes:

//TODO Oct 19 2022 - Clean up documentation, Create diagram of relationship between Ring Mater, Member Site, and Visitor. Upload Oring folder containing all of the required code to allow RingMasters to drag and drop the necessary files onto their server.
//TODO Oct 19 2022 - Add Iframe browsing capability from a Ring Master's page to allow for an alternative way for visitors to interact with member sites. Bonus: automatically repair ring structure if a member site goes offline.
