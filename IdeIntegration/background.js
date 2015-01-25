main();

function Map(savekey) {
    this.vals = {};
    this.savekey = savekey;
    //get vals from localstorage using provided savekey
    if (localStorage.getItem(this.savekey) !== null) {
        this.vals = JSON.parse(localStorage.getItem(this.savekey));
    }
}

Map.prototype.put = function(key, val) {
    this.vals[key] = val;
    // load entire map to storage on each change
    localStorage.setItem(this.savekey, JSON.stringify(this.vals));
}
Map.prototype.get = function(key) {
    if (this.vals[key] === undefined) {
        return null;
    }
    return this.vals[key];
}
Map.prototype.removeByVal = function(val) {
    var vals = this.vals;

    for (key in this.vals) {
        if (this.vals[key] == val) {
            this.vals[key] = null;
        }
    }
    //store entire map to localstorage
    localStorage.setItem(this.savekey, JSON.stringify(this.vals));
}

var map = new Map('map'); //provide a savekey to save and retrieve from storage
function main() {

        var t, t2, url;
        var curr = new Map();
        var lock = 0;
        chrome.tabs.onUpdated.addListener(function callback(tabid, info, tab) {

            if (info.status === "loading" && tab.url.indexOf("hackerrank.com") != -1) {
                //inject the chamcha script
                console.log("inject");
                chrome.tabs.executeScript(tabid, {
                    file: "inject_hackerrank.js",
                    allFrames: true
                }, null);

            }
        });

        chrome.tabs.onUpdated.addListener(function callback(tabid, info, tab) {
            //chrome.storage.local.get('val',function(ret){map=JSON.parse(ret.val)}) //load the map
            if (info.status == "loading")
                return;
            console.log(info.status);
            if (tab.url.indexOf("codechef.com") != -1) {
                //inject the chamcha script
                console.log("inject");
                chrome.tabs.executeScript(tabid, {
                    file: "inject_codechef.js"
                }, null);

            }


            try {
                if (tab.url.indexOf("hc1407066179862.com") === -1)
                    return;

                var ct, id;
                ct = ""; //gup(tab.url,'ct');
                id = gup(tab.url, 'id');


                //clear the fake tab
                //tabExists(tabid,function(){chrome.tabs.remove(tabid,null)},null);
                chrome.tabs.remove(tabid, null);

                //do all the injection stuff
                start(id, ct);
            } catch (e) {
                console.log(e);
            }
        });

        function start(nid, ct) //id from netbeans 
            {
                ct = getContentFromClipboard();
                //console.log("here is data :"+ct);
                chrome.tabs.query({
                    url: "*://*.hackerearth.com/*"
                }, function callback(tabs) {
                    chrome.tabs.query({
                        url: "*://*.codechef.com/*"
                    }, function callback(tabs1) {
                        chrome.tabs.query({
                            url: "*://*.hackerrank.com/*"
                        }, function callback(tabs2) {
                            //add tabs1 to tabs
                            for (var i = 0; i < tabs1.length; i++) {
                                tabs.push(tabs1[i]);
                            }

                            //add tabs2 to tabs
                            for (var i = 0; i < tabs2.length; i++) {
                                tabs.push(tabs2[i]);
                            }

                            if (tabs.length <= 0) {
                                alert("no hackerearth.com/hackerrank.com/codechef.com tab open. open a tab, load the code editor and then try again");
                                return;
                            }
                            var tabid = getID(nid, tabs);
                            console.log("got this id :" + tabid)

                            //first one is called if tab exists , second one called on tab not exists
                            tabExists(tabid, function() { //tab exists
                                    chrome.tabs.sendMessage(tabid, ct, null); //send message common to hackerearth and codechef and hackerrank
                                    map.put(nid, tabid); //store id in cache
                                    chrome.tabs.update(tabid, {
                                        active: true
                                    }, null); //make tab come into focus
                                    console.log("sent to tab");
                                },
                                function() { //tab not exist
                                    map.removeByVal(tabid); //remove the non existent id(chrome tab id, not netbeans ID , as removeBy) from cache   
                                    console.log("removed as tab does not exist");
                                    start(nid, ct);
                                }
                            );
                        });
                    });
                    //if(lock==1) return;
                    //lock=1;

                });

            }

        //give tabiD and call back onExists if tab with id tabId exists and onNotExists
        function tabExists(tabId, onExists, onNotExists) {
            chrome.windows.getAll({
                populate: true
            }, function(windows) {
                for (var i = 0, window; window = windows[i]; i++) {
                    for (var j = 0, tab; tab = window.tabs[j]; j++) {
                        if (tab.id == tabId) {
                            onExists && onExists(tab);
                            return;
                        }
                    }
                }
                onNotExists && onNotExists();
            });
        }


        //gets the ID of tab to inject either from cache or from user input NOT the index of tabs array
        function getID(nid, tabs) {
            var tabid = map.get(nid);
            //console.log(tabid);
            //console.log(map.vals);
            if (tabid !== null) {
                return tabid;
            }

            //or select which tab you want to enter it to	
            var st = "Enter which hackerearth.com/codechef.com tab you wish to insert the code.from 1-" + tabs.length + ". ex: 1";
            for (var i = 0; i < tabs.length; i++) {
                st += "\n" + (i + 1) + ":" + tabs[i].title;
            }
            var idx = 1 * window.prompt(st, "1");
            idx--;
            //store in cache
            map.put(nid, tabs[idx].id);

            return tabs[idx].id;
        }

        function gup(url, name) {

            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            if (results == null)
                return "";
            else
                return results[1];
        }

        function getContentFromClipboard() {
            var result = '';
            var sandbox = document.getElementById('sandbox');
            sandbox.value = '';
            sandbox.select();
            if (document.execCommand('paste')) {
                result = sandbox.value;
                console.log('got value from sandbox: ' + result);
            }
            sandbox.value = '';
            return result;
        }

    }
    /*
    chrome.webRequest.onBeforeRequest.addListener(
            function(details) { 
    		alert("blocked");
    		return {cancel: true}; },
            {urls: ["*://www.hc1407066179862.com/*"]},
            ["blocking"]);
    		*/
