/**
 * This file is part of Adguard Browser Extension (https://github.com/AdguardTeam/AdguardBrowserExtension).
 *
 * Adguard Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Adguard Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Adguard Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */

/* global safari */

/**
 * Extension global preferences.
 * (!) Firefox has it's own implementation
 */
adguard.prefs = (function (adguard) {

    var Prefs = {

        platform: typeof safari === 'undefined' ? "chromium" : "webkit",

        get browser() {
            return adguard.lazyGet(Prefs, 'browser', function () {
                var browser;
                var userAgent = navigator.userAgent;
                if (userAgent.toLowerCase().indexOf("yabrowser") >= 0) {
                    browser = "YaBrowser";
                } else if (userAgent.toLowerCase().indexOf("edge") >= 0) {
                    browser = "Edge";
                } else if (userAgent.toLowerCase().indexOf("opera") >= 0 || userAgent.toLowerCase().indexOf("opr") >= 0) {
                    browser = "Opera";
                } else if (userAgent.indexOf("Safari") >= 0 && userAgent.indexOf('Chrome') < 0) {
                    browser = "Safari";
                } else {
                    browser = "Chrome";
                }
                return browser;
            });
        },

        get safariVersion() {
            return adguard.lazyGet(Prefs, 'safariVersion', function () {
                if (this.browser === 'Safari') {
                    var i = navigator.userAgent.indexOf("Version/");
                    if (i < 0) {
                        return null;
                    }
                    return parseInt(navigator.userAgent.substring(i + 8));
                }
                return null;
            });
        },

        get chromeVersion() {
            return adguard.lazyGet(Prefs, 'chromeVersion', function () {
                if (this.browser == "Chrome") {
                    var i = navigator.userAgent.indexOf("Chrome/");
                    if (i < 0) {
                        return null;
                    }
                    return parseInt(navigator.userAgent.substring(i + 7));
                }
            });
        },

        get hitPrefix() {
            return adguard.lazyGet(Prefs, 'hitPrefix', function () {
                var appId = adguard.app.getId();
                var scheme = adguard.app.getUrlScheme();
                return scheme + '://' + appId;
            });
        },

        /**
         * Makes sense in case of FF add-on only
         */
        speedupStartup: function () {
            return false;
        },
        /**
         * Makes sense in case of FF add-on only
         */
        useGlobalStyleSheet: false,

        get ICONS() {
            return adguard.lazyGet(Prefs, 'ICONS', function () {
                return {
                    ICON_BLUE: {
                        '19': adguard.getURL('icons/blue-19.png'),
                        '38': adguard.getURL('icons/blue-38.png')
                    },
                    ICON_GREEN: {
                        '19': adguard.getURL('icons/green-19.png'),
                        '38': adguard.getURL('icons/green-38.png')
                    },
                    ICON_GRAY: {
                        '19': adguard.getURL('icons/gray-19.png'),
                        '38': adguard.getURL('icons/gray-38.png')
                    }
                };
            });
        }
    };

    return Prefs;

})(adguard);
