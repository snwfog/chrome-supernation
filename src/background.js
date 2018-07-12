console.log('hello from background.js');
console.log(chrome.windows);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('runtime.onMessage', arguments);
  chrome.windows.create({
    url:       'http://google.com',
    incognito: true,
    width:     800,
    height:    600
  });
  sendResponse({ cruel: 'world background' });
});

