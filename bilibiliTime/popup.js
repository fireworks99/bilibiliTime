// author: https://github.com/fireworks99/

let btn = document.getElementById('query');

// When the button is clicked, inject setPageBackgroundColor into current page
btn.addEventListener("click", async () => {

  let input = parseInt(document.getElementById('input').value);

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.storage.sync.set({input}, function() {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: main,
    });
  });


});

document.onkeydown = function(event) {
  var e = event || window.event || arguments.callee.caller.arguments[0]; 
  if(e && e.keyCode == 13){ 
    btn.click();
  }
}


// The body of this function will be executed as a content script inside the
// current page
function main() {

  chrome.storage.sync.get(['input'], function(result) {
    let input = result.input;
    
    let sum = 0, now = 0;
    let parts = document.getElementsByClassName("part");

    for(let i = 0; i < parts.length; ++i) {
      let tem = calTime(parts[i].parentNode.nextElementSibling.innerText)
      sum += tem;
      if(i + 1 < input) { now += tem; }
    }
    let rest = sum - now;
    alert("总共：" + secondToTime(sum) + "\n" + "已看：" + secondToTime(now) + "\n" + "剩余：" + secondToTime(rest));
  });

    
  

  function calTime(str) {
    let second = 0;
    let arr = str.split(":");
    for(let i = arr.length - 1, j = 1; i >=0; --i, j *= 60) {
        second += parseInt(arr[i]) * j;
    }
    return second;
  }

  function secondToTime(num) {
    let str = "";

    let tem = Math.floor(num / 3600);

    if(tem < 10)
        str += "0";
  
    str += tem;
    num %= 3600;
    str += ":";
  
    tem = Math.floor(num / 60);

    if(tem < 10)
        str += "0";

    str += tem;
    num %= 60;
    str += ":";
  
    if(num < 10)
        str += "0";

    str += num;

    return str;
  }
}


