# Oring - The open source WebRing

## What is a webring?

  A webring (or web ring) is a collection of websites linked together in a circular structure, and usually organized around a specific theme, often educational or social. They were popular in the 1990s and early 2000s, particularly among amateur websites.

  To be a part of the webring, each site has a common navigation bar. It contains links to the previous and next site. By selecting next (or previous) repeatedly, the user will eventually reach the site they started at. This is the origin of the term webring. The select-through route around the ring is usually supplemented by a central site with links to all member sites; this prevents the ring from breaking completely if a member site goes offline. The advantage of a webring is that if the user is interested in the topic on one website, they can quickly connect to another website on the same topic. Webrings usually have a moderator who decides which pages to include in the webring. After approval, webmasters add their pages to the ring by 'linking in' to the ring; this requires adding the necessary HTML or JavaScript widget to their site.

*This explaination was borrowed from [Wikipedia](https://en.wikipedia.org/wiki/Webring)*

![](https://docs.graycot.dev/uploads/3a175640-0dcd-4483-ba47-4aaa5b8f863f.png)

*This graphic was borrowed from [WebringWorld](http://www.webringworld.org/)*

## What is Oring?
  
  Oring is an open source template that anyone can use to create their own webring! Simply follow the instructions on this page and you will have your own unique webring! 
  
  ### Oring offers two separate WebRing architectures.
  
  1. The JavaScript webring.
      - JavaScript Widget
      - JavaScript Redirect
  3. The HTML webring.
      - HTML Widget
      - HTML Redirect

  Yes, Oring is actually made of two independent webrings! You may choose to use **ONLY the JavaScript webring, ONLY the HTML webring, or BOTH webrings together** (both is the recommended method!)
  
  *Some HTML and CSS knowledge is required in order to change the JavaScript widget's appearance. Alternatively, if you are not comfortable with changing the default HTML or CSS of the JavaScript widget, you can use skip this method and only use the the HTML webring*

**NOTE:** The Ring Master has complete control over the code that is served to visitors of the Member Sites. If the Member Site does not want to run JavaScript remote code on their visitors, they may utilize the HTML webring. **INFORM MEMBER SITES OF THIS POTENTIAL DANGER**.
 
Both the JavaScript and HTML webrings run JavaScript under the hood. The most important difference from a security standpoint are:

1. The JavaScript webring runs JavaScript on the Member's Site.
2. The HTML webring runs JavaScript on the Ring Master's Site.

One could rewrite the html-redirect in PHP or server-side JS to completely eliminate client-side JS, but that requires server-side computation and complicates the setup. The beauty of running JS on the Visitor's browser is that you can easily host the static js-redirect.js and html-redirect.js files for free nearly anywhere, even on [Neocities](https://neocities.org/). Plus, membersites can self-host the webring code on their own sites with a little bit of copying / pasting and tweaking of URLS.

Additionally, The JavaScript webring implements a dynamic widget that can include data such as the names of the next and previous sites. The JS widget can be standardized by the Ring Master to create a consist JS widget appearance across all Member Sites.

The HTML webring is static and does not contain dynamic data. The styling and structure of the HTML widget is ENTIRELY up to the Member Site.

### In a nutshell:

1. The JavaScript webring puts more control in the hands of the Ring Master.
2. The HTML webring puts more control in the hands of the Member Site.

## JavaScript Widget:
 
 Membersites will insert this code into the HTML of the webpage they want the JavaScript widget located.

 ```html
<!-- Replace "RINGMASTER.COM" with the URL of the Ring Master's website -->
<!-- Replace "ring0000" a the value unique to your webring.-->
 <div id="ring0000"></div><script src="https://RINGMASTER.COM/Oring/js-widget.js" type="module"></script>
 ```
 
 When a visitor loads a page on a membersite with this script included, it will automatically download and run the JavaScript Redirect script hosted on the RingMaster's web server / website. 

  The script will look at a list of member websites and find the index of the site it is currently running on. The script will then find the previous site in the list, the next site in the list, and a random site in the list. Once the calculations are done, it will insert a snippet of HTML code into the webpage at the location of "ring0000" (You will rename this so it is a value unique to your webring). The script will also insert a snippet of CSS code to style the HTML and make it look nice.
  
## JavaScript Redirect:


```js
/* Oring js-redirect v3.0 Copyleft 🄯 ALL WRONGS RESERVED 🄯 Gray (G@graycot.dev)(https://graystea.neocities.org/)(https://graycot.dev/).

Oring is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License (GPLv3+) as published by
the Free Software Foundation. (http://www.gnu.org/licenses/)*/

// get webring member list
fetch("https://RINGMASTER.COM/Oring/sites.json")
.then(response => {
   return response.json();
})
.then(data => webring(data));

function webring(data) {

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
  // use the indices calculated above to find the corresponding site name in the member list
  let previousSiteName = data.webringSites[previousIndex].siteName;
  let randomSiteName = data.webringSites[randomIndex].siteName;
  let nextSiteName = data.webringSites[nextIndex].siteName;
  // get webring info from JSON data.
  let webringName = data.webringInfo[0].webringName;
  let webringHome = data.webringInfo[0].webringHome;
  let webringMemberList = data.webringInfo[0].webringMemberList;
  // This is for debugging and building your own HTML widget using the JS variables
  console.log(`previousIndex: ${previousIndex}`);
  console.log(`thisIndex: ${thisIndex}`);
  console.log(`nextIndex: ${nextIndex}`);
  console.log(`randomIndex: ${randomIndex}`);
  console.log(`previousSiteURL: ${previousSiteURL}`);
  console.log(`thisSiteURL: ${thisSiteURL}`);
  console.log(`nextSiteURL: ${nextSiteURL}`);
  console.log(`randomSiteURL: ${randomSiteURL}`);
  console.log(`previousSiteName: ${previousSiteName}`);
  console.log(`thisSiteName: ${thisSiteName}`);
  console.log(`nextSiteName: ${nextSiteName}`);
  console.log(`randomSiteName: ${randomSiteName}`);
  console.log(`webringName: ${webringName}`)
  console.log(`webringHome: ${webringHome}`)
  console.log(`webringMemberList: ${webringMemberList}`)

/*---------------------------------------------------------------- */
           /*               HTML                  */
/*---------------------------------------------------------------- */

/* REPLACE ALL INSTANCES OF "ring0000" WITH THE SAME NAME AND NUMBER 
UNIQUE TO YOUR WEBRING Example: AquaRing3827*/


/* REPLACE "ring000" HERE AND IN THE HTML WITH THE SAME NAME AND NUMBER UNIQUE TO YOUR WEBRING Example: ring3827  */

// Inserts webring widget
  let tag = document.getElementById('ring0000');
  tag.insertAdjacentHTML('afterbegin', ` 
  
  <div id="ring0000">
    <div class="left">
      <p> </p>
      <a href = ${previousSiteURL}> ${previousSiteName} </a>
      <a href = ${previousSiteURL}> <<< </a>
    </div>
    <div class="middle">
      <a href = ${webringHome}>${webringName}</a>
      <a href = ${webringMemberList}> ..... </a>
      <a href = ${randomSiteURL}> ??? </a>
    </div>
    <div class="right">
      <p> </p>
      <a href = ${nextSiteURL}> ${nextSiteName} </a>
      <a href = ${nextSiteURL}> >>> </a>
    </div>
  </div>

  `);
// the 2 instances of <p> </p> contain an invisible unicode character. This is only for the example widget formatting.

/*---------------------------------------------------------------- */
           /*               CSS                  */
/*---------------------------------------------------------------- */


  const styles = `
  
  #ring0000{
    display: inline-flex; 
    width: max-content;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid white;
    border-radius: 10px;
    color: white;
    text-align: center;
  }
  #ring0000 a, #ring0000 p {
    display: block;
  }
  #ring0000 .middle{
    padding: 0 1rem;
  }

  `
  // appends the CSS to the head of the HTML document
  const styleSheet = document.createElement("style")
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)

};
```

## HTML Widget:

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
  
  When a visitor on a member site clicks one of these links, they will be directed to a webpage that the RingMaster (you) control. The page you control will run the <a href="#HTMLRedirect">HTML Redirect</a> script.
  
  The script will look at a list of member websites and find the index of the member site that the visitor was on. The script will then find the previous site in the list, the next site in the list, and a random site in the list. Once the calculations are done, it will read the the link after `?action=` to determine how and where to redirect the visitor.
  




  
<h2 id="HTMLRedirect">HTML Redirect</h2>

```js
/* Oring html-redirect v3.0 Copyleft 🄯 ALL WRONGS RESERVED 🄯 Gray (G@graycot.dev)(https://graystea.neocities.org/)(https://graycot.dev/).

Oring is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License (GPLv3+) as published by
the Free Software Foundation. (http://www.gnu.org/licenses/)*/

// get webring member list
fetch("./sites.json")
.then(response => {
   return response.json();
})
.then(data => webring(data));

function webring(data) {

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
  // get webring info from JSON data.
  let webringName = data.webringInfo[0].webringName;
  let webringHome = data.webringInfo[0].webringHome;
  let webringMemberList = data.webringInfo[0].webringMemberList;

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
//TODO Oct 19 2022 - Include <noscript></noscript> in html-redirect which asks the Visitor to turn on JS (and explains why) or offer a link to manually navigate the WebRing via a github page
//TODO Oct 19 2022 - Clean up documentation, Create diagram of relationship between Ring Mater, Member Site, and Visitor. Upload Oring folder containing all of the required code to allow RingMasters to drag and drop the necessary files onto their server.
//TODO Oct 19 2022 - Add Iframe browsing capability from a Ring Master's page to allow for an alternative way for visitors to interact with member sites. Bonus: automatically repair ring structure if a member site goes offline.
