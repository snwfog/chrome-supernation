console.log("hello from content.js");
console.log('new from content');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('runtime.onMessage', arguments);
  sendResponse({ cruel: 'world content' });
});
