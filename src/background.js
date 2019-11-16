console.log('hello from background.js');
console.log(chrome.windows);

var screenW = 800;
var screenH = 600;

// Grab the screen size
chrome.system.display.getInfo(function(info) {
  info       = info[0];
  var bounds = info.bounds;
  if (!!bounds) {
    if (bounds.width > 0 && bounds.height > 0) {
      screenW = 0.66 * bounds.width;
      screenH = bounds.height;
    }
  }

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('runtime.onMessage', arguments);
    let advertiser = request.advertiser;

    chrome.windows.create({
      url:             `http://localhost:3005/admin/switch_user?user_id=${advertiser.id}&account_id=${advertiser.id}`,
      type:            "normal",
      setSelfAsOpener: true,
      incognito:       true,
      width:           parseInt(screenW),
      height:          parseInt(screenH),
    });
    sendResponse({ cruel: 'world background' });
  });
});

