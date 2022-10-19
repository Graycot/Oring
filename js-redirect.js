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
