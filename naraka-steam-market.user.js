// ==UserScript==
// @name         Naraka Steam Market
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       NEKO
// @match        https://steamcommunity.com/market/listings/1203220/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @require     https://code.jquery.com/jquery-3.6.4.slim.js
// @updateURL    https://raw.githubusercontent.com/kon3ko/naraka-steam-market/master/naraka-steam-market.user.js
// @downloadURL  https://raw.githubusercontent.com/kon3ko/naraka-steam-market/master/naraka-steam-market.user.js
// @supportURL   https://github.com/kon3ko/naraka-steam-market/issues
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.changed = 0;
    jQuery.noConflict();
    (function( $$ ) {
        jQuery( document ).ready(function() {
            const displayModify = function(){
                const keyChange = Object.keys(window.g_rgAssets[1203220][2])[0];
                if(keyChange !== window.changed){
                    window.changed = keyChange;
                }else{
                    return;
                }

                const rows = jQuery("#searchResultsRows>div");
                $$.each(rows, (index, row) => {
                    const href = $$(".market_listing_buy_button>a", row).attr('href')
                    if(href){
                        const regex = /[0-9]\d+/g;
                        const ids = href.match(regex);
                        const value = window.g_rgAssets[1203220][2][ids[2]].descriptions[1].value;

                        $$(row).append($$("<div>",{style:'padding:0 0 5px 5px;'}).html(value));
                        if(value.includes("ไม่ใช่เซิร์ฟเวอร์จีน") || value.includes("Non-CN") || value.includes("Server ngoài TQ")){
                            $$(row).css('border','solid 2px rgb(116 156 72)');
                        }
                    }
                })
            }

            const targetNode = document.getElementById("searchResultsRows");
            const config = { attributes: true, childList: true, subtree: true };

            const callback = (mutationList, observer) => {
                for (const mutation of mutationList) {
                    if (mutation.type === "childList") {
                        displayModify();
                    }
                }
            };

            const observer = new MutationObserver(callback);
            observer.observe(targetNode, config);

            displayModify();
        });
    })(jQuery);
})();
