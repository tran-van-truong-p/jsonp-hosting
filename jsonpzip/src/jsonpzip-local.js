/* ================================================================ *
    JsonZip
    Copyright (c) 2006-2008 Kawasaki Yusuke <u-suke [at] kawa.net>

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
* ================================================================ */

new function () {
	var me = 'jsonpzip-local.js';
	var script = [
		 '../src/jsonpzip-main.js'
		,'../src/jsonpzip-init.js'
	];
	var findbase = function ( src ) {
	    var list = document.getElementsByTagName( 'script' );
		for( var i=list.length-1; i>=0; i-- ) {
		    var pos = list[i].src.indexOf(src);
			if ( pos < 0 ) continue;
			var base = list[i].src.substr( 0, pos );
			return base;
		}
	}
	var load = function ( src ) {
        var script = document.createElement( 'script' );
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        script.src = src;
        document.lastChild.appendChild( script );
    };
	var init = function () {
		var base = findbase( me );
		if ( typeof(JsonpZip) == 'undefined' ) JsonpZip = {};
		JsonpZip.JSONP_BASE = base+'../jsonp/';
		for( var i=0; i<script.length; i++ ) {
			var src = script[i];
			if ( ! src.match( /^(https?:\/)?\// ) ) {
				src = base + src;
			}
			load( src );
		}
	};
	if ( window.jQuery && jQuery.fn && jQuery.fn.ready ) {
		jQuery.fn.ready( init );
	} else {
		setTimeout( init, 0 );
	}
};
