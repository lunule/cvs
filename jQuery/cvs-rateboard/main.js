/* ================================================================================================
# DataTables
================================================================================================ */

/*
 * This combined file was created by the DataTables downloader builder:
 *   https://datatables.net/download
 *
 * To rebuild or modify this file with the latest versions of the included
 * software please visit:
 *   https://datatables.net/download/#dt/dt-1.10.20/r-2.2.3
 *
 * Included libraries:
 *  DataTables 1.10.20, Responsive 2.2.3
 */

/*!
   Copyright 2008-2019 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 DataTables 1.10.20
 ©2008-2019 SpryMedia Ltd - datatables.net/license
*/
var $jscomp=$jscomp||{};$jscomp.scope={},$jscomp.findInternal=function(t,e,n){t instanceof String&&(t=String(t));for(var a=t.length,r=0;r<a;r++){var o=t[r];if(e.call(n,o,r,t))return{i:r,v:o}}return{i:-1,v:void 0}},$jscomp.ASSUME_ES5=!1,$jscomp.ASSUME_NO_NATIVE_MAP=!1,$jscomp.ASSUME_NO_NATIVE_SET=!1,$jscomp.SIMPLE_FROUND_POLYFILL=!1,$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(t,e,n){t!=Array.prototype&&t!=Object.prototype&&(t[e]=n.value)},$jscomp.getGlobal=function(t){return"undefined"!=typeof window&&window===t?t:"undefined"!=typeof global&&null!=global?global:t},$jscomp.global=$jscomp.getGlobal(this),$jscomp.polyfill=function(t,e,n,a){if(e){for(n=$jscomp.global,t=t.split("."),a=0;a<t.length-1;a++){var r=t[a];r in n||(n[r]={}),n=n[r]}(e=e(a=n[t=t[t.length-1]]))!=a&&null!=e&&$jscomp.defineProperty(n,t,{configurable:!0,writable:!0,value:e})}},$jscomp.polyfill("Array.prototype.find",function(t){return t||function(t,e){return $jscomp.findInternal(this,t,e).v}},"es6","es3"),function(n){"function"==typeof define&&define.amd?define(["jquery"],function(t){return n(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,e=e||("undefined"!=typeof window?require("jquery"):require("jquery")(t)),n(e,t,t.document)}:n(jQuery,window,document)}(function(R,m,y,P){function i(n){var a,r,o={};R.each(n,function(t,e){(a=t.match(/^([^A-Z]+?)([A-Z])/))&&-1!=="a aa ai ao as b fn i m o s ".indexOf(a[1]+" ")&&(r=t.replace(a[0],a[2].toLowerCase()),o[r]=t,"o"===a[1]&&i(n[t]))}),n._hungarianMap=o}function S(n,a,r){var o;n._hungarianMap||i(n),R.each(a,function(t,e){(o=n._hungarianMap[t])===P||!r&&a[o]!==P||("o"===o.charAt(0)?(a[o]||(a[o]={}),R.extend(!0,a[o],a[t]),S(n[o],a[o],r)):a[o]=a[t])})}function D(t){var e=Kt.defaults.oLanguage,n=e.sDecimal;if(n&&Bt(n),t){var a=t.sZeroRecords;!t.sEmptyTable&&a&&"No data available in table"===e.sEmptyTable&&Rt(t,t,"sZeroRecords","sEmptyTable"),!t.sLoadingRecords&&a&&"Loading..."===e.sLoadingRecords&&Rt(t,t,"sZeroRecords","sLoadingRecords"),t.sInfoThousands&&(t.sThousands=t.sInfoThousands),(t=t.sDecimal)&&n!==t&&Bt(t)}}function _(t){if(le(t,"ordering","bSort"),le(t,"orderMulti","bSortMulti"),le(t,"orderClasses","bSortClasses"),le(t,"orderCellsTop","bSortCellsTop"),le(t,"order","aaSorting"),le(t,"orderFixed","aaSortingFixed"),le(t,"paging","bPaginate"),le(t,"pagingType","sPaginationType"),le(t,"pageLength","iDisplayLength"),le(t,"searching","bFilter"),"boolean"==typeof t.sScrollX&&(t.sScrollX=t.sScrollX?"100%":""),"boolean"==typeof t.scrollX&&(t.scrollX=t.scrollX?"100%":""),t=t.aoSearchCols)for(var e=0,n=t.length;e<n;e++)t[e]&&S(Kt.models.oSearch,t[e])}function w(t){le(t,"orderable","bSortable"),le(t,"orderData","aDataSort"),le(t,"orderSequence","asSorting"),le(t,"orderDataType","sortDataType");var e=t.aDataSort;"number"!=typeof e||R.isArray(e)||(t.aDataSort=[e])}function T(t){if(!Kt.__browser){var e={};Kt.__browser=e;var n=R("<div/>").css({position:"fixed",top:0,left:-1*R(m).scrollLeft(),height:1,width:1,overflow:"hidden"}).append(R("<div/>").css({position:"absolute",top:1,left:1,width:100,overflow:"scroll"}).append(R("<div/>").css({width:"100%",height:10}))).appendTo("body"),a=n.children(),r=a.children();e.barWidth=a[0].offsetWidth-a[0].clientWidth,e.bScrollOversize=100===r[0].offsetWidth&&100!==a[0].clientWidth,e.bScrollbarLeft=1!==Math.round(r.offset().left),e.bBounding=!!n[0].getBoundingClientRect().width,n.remove()}R.extend(t.oBrowser,Kt.__browser),t.oScroll.iBarWidth=Kt.__browser.barWidth}function n(t,e,n,a,r,o){var i=!1;if(n!==P){var s=n;i=!0}for(;a!==r;)t.hasOwnProperty(a)&&(s=i?e(s,t[a],a,t):t[a],i=!0,a+=o);return s}function C(t,e){var n=Kt.defaults.column,a=t.aoColumns.length;n=R.extend({},Kt.models.oColumn,n,{nTh:e||y.createElement("th"),sTitle:n.sTitle?n.sTitle:e?e.innerHTML:"",aDataSort:n.aDataSort?n.aDataSort:[a],mData:n.mData?n.mData:a,idx:a}),t.aoColumns.push(n),(n=t.aoPreSearchCols)[a]=R.extend({},Kt.models.oSearch,n[a]),x(t,a,R(e).data())}function x(t,e,n){e=t.aoColumns[e];var a=t.oClasses,r=R(e.nTh);if(!e.sWidthOrig){e.sWidthOrig=r.attr("width")||null;var o=(r.attr("style")||"").match(/width:\s*(\d+[pxem%]+)/);o&&(e.sWidthOrig=o[1])}n!==P&&null!==n&&(w(n),S(Kt.defaults.column,n,!0),n.mDataProp===P||n.mData||(n.mData=n.mDataProp),n.sType&&(e._sManualType=n.sType),n.className&&!n.sClass&&(n.sClass=n.className),n.sClass&&r.addClass(n.sClass),R.extend(e,n),Rt(e,n,"sWidth","sWidthOrig"),n.iDataSort!==P&&(e.aDataSort=[n.iDataSort]),Rt(e,n,"aDataSort"));var i=e.mData,s=H(i),l=e.mRender?H(e.mRender):null;n=function(t){return"string"==typeof t&&-1!==t.indexOf("@")},e._bAttrSrc=R.isPlainObject(i)&&(n(i.sort)||n(i.type)||n(i.filter)),e._setter=null,e.fnGetData=function(t,e,n){var a=s(t,e,P,n);return l&&e?l(a,e,t,n):a},e.fnSetData=function(t,e,n){return p(i)(t,e,n)},"number"!=typeof i&&(t._rowReadObject=!0),t.oFeatures.bSort||(e.bSortable=!1,r.addClass(a.sSortableNone)),t=-1!==R.inArray("asc",e.asSorting),n=-1!==R.inArray("desc",e.asSorting),e.bSortable&&(t||n)?t&&!n?(e.sSortingClass=a.sSortableAsc,e.sSortingClassJUI=a.sSortJUIAscAllowed):!t&&n?(e.sSortingClass=a.sSortableDesc,e.sSortingClassJUI=a.sSortJUIDescAllowed):(e.sSortingClass=a.sSortable,e.sSortingClassJUI=a.sSortJUI):(e.sSortingClass=a.sSortableNone,e.sSortingClassJUI="")}function k(t){if(!1!==t.oFeatures.bAutoWidth){var e=t.aoColumns;bt(t);for(var n=0,a=e.length;n<a;n++)e[n].nTh.style.width=e[n].sWidth}""===(e=t.oScroll).sY&&""===e.sX||pt(t),Ht(t,null,"column-sizing",[t])}function N(t,e){return"number"==typeof(t=I(t,"bVisible"))[e]?t[e]:null}function u(t,e){return t=I(t,"bVisible"),-1!==(e=R.inArray(e,t))?e:null}function v(t){var n=0;return R.each(t.aoColumns,function(t,e){e.bVisible&&"none"!==R(e.nTh).css("display")&&n++}),n}function I(t,n){var a=[];return R.map(t.aoColumns,function(t,e){t[n]&&a.push(e)}),a}function s(t){var e,n,a,r=t.aoColumns,o=t.aoData,i=Kt.ext.type.detect,s=0;for(e=r.length;s<e;s++){var l=r[s],u=[];if(!l.sType&&l._sManualType)l.sType=l._sManualType;else if(!l.sType){var c=0;for(n=i.length;c<n;c++){var d=0;for(a=o.length;d<a;d++){u[d]===P&&(u[d]=L(t,d,s,"type"));var f=i[c](u[d],t);if(!f&&c!==i.length-1)break;if("html"===f)break}if(f){l.sType=f;break}}l.sType||(l.sType="string")}}}function A(t,e,n,a){var r,o,i,s=t.aoColumns;if(e)for(r=e.length-1;0<=r;r--){var l=e[r],u=l.targets!==P?l.targets:l.aTargets;R.isArray(u)||(u=[u]);var c=0;for(o=u.length;c<o;c++)if("number"==typeof u[c]&&0<=u[c]){for(;s.length<=u[c];)C(t);a(u[c],l)}else if("number"==typeof u[c]&&u[c]<0)a(s.length+u[c],l);else if("string"==typeof u[c]){var d=0;for(i=s.length;d<i;d++)"_all"!=u[c]&&!R(s[d].nTh).hasClass(u[c])||a(d,l)}}if(n)for(r=0,t=n.length;r<t;r++)a(r,n[r])}function F(t,e,n,a){var r=t.aoData.length,o=R.extend(!0,{},Kt.models.oRow,{src:n?"dom":"data",idx:r});o._aData=e,t.aoData.push(o);for(var i=t.aoColumns,s=0,l=i.length;s<l;s++)i[s].sType=null;return t.aiDisplayMaster.push(r),(e=t.rowIdFn(e))!==P&&(t.aIds[e]=o),!n&&t.oFeatures.bDeferRender||b(t,r,n,a),r}function j(n,t){var a;return t instanceof R||(t=R(t)),t.map(function(t,e){return a=f(n,e),F(n,a.data,e,a.cells)})}function L(t,e,n,a){var r=t.iDraw,o=t.aoColumns[n],i=t.aoData[e]._aData,s=o.sDefaultContent,l=o.fnGetData(i,a,{settings:t,row:e,col:n});if(l===P)return t.iDrawError!=r&&null===s&&(Lt(t,0,"Requested unknown parameter "+("function"==typeof o.mData?"{function}":"'"+o.mData+"'")+" for row "+e+", column "+n,4),t.iDrawError=r),s;if(l!==i&&null!==l||null===s||a===P){if("function"==typeof l)return l.call(i)}else l=s;return null===l&&"display"==a?"":l}function a(t,e,n,a){t.aoColumns[n].fnSetData(t.aoData[e]._aData,a,{settings:t,row:e,col:n})}function c(t){return R.map(t.match(/(\\.|[^\.])+/g)||[""],function(t){return t.replace(/\\\./g,".")})}function H(r){if(R.isPlainObject(r)){var o={};return R.each(r,function(t,e){e&&(o[t]=H(e))}),function(t,e,n,a){var r=o[e]||o._;return r!==P?r(t,e,n,a):t}}if(null===r)return function(t){return t};if("function"==typeof r)return function(t,e,n,a){return r(t,e,n,a)};if("string"!=typeof r||-1===r.indexOf(".")&&-1===r.indexOf("[")&&-1===r.indexOf("("))return function(t,e){return t[r]};var s=function(t,e,n){if(""!==n)for(var a=c(n),r=0,o=a.length;r<o;r++){n=a[r].match(ue);var i=a[r].match(ce);if(n){if(a[r]=a[r].replace(ue,""),""!==a[r]&&(t=t[a[r]]),i=[],a.splice(0,r+1),a=a.join("."),R.isArray(t))for(r=0,o=t.length;r<o;r++)i.push(s(t[r],e,a));t=""===(t=n[0].substring(1,n[0].length-1))?i:i.join(t);break}if(i)a[r]=a[r].replace(ce,""),t=t[a[r]]();else{if(null===t||t[a[r]]===P)return P;t=t[a[r]]}}return t};return function(t,e){return s(t,e,r)}}function p(a){if(R.isPlainObject(a))return p(a._);if(null===a)return function(){};if("function"==typeof a)return function(t,e,n){a(t,"set",e,n)};if("string"!=typeof a||-1===a.indexOf(".")&&-1===a.indexOf("[")&&-1===a.indexOf("("))return function(t,e){t[a]=e};var l=function(t,e,n){for(var a,r,o=(n=c(n))[n.length-1],i=0,s=n.length-1;i<s;i++){if(a=n[i].match(ue),r=n[i].match(ce),a){if(n[i]=n[i].replace(ue,""),t[n[i]]=[],(o=n.slice()).splice(0,i+1),a=o.join("."),R.isArray(e))for(r=0,s=e.length;r<s;r++)l(o={},e[r],a),t[n[i]].push(o);else t[n[i]]=e;return}r&&(n[i]=n[i].replace(ce,""),t=t[n[i]](e)),null!==t[n[i]]&&t[n[i]]!==P||(t[n[i]]={}),t=t[n[i]]}o.match(ce)?t[o.replace(ce,"")](e):t[o.replace(ue,"")]=e};return function(t,e){return l(t,e,a)}}function g(t){return ie(t.aoData,"_aData")}function l(t){t.aoData.length=0,t.aiDisplayMaster.length=0,t.aiDisplay.length=0,t.aIds={}}function d(t,e,n){for(var a=-1,r=0,o=t.length;r<o;r++)t[r]==e?a=r:t[r]>e&&t[r]--;-1!=a&&n===P&&t.splice(a,1)}function r(n,a,t,e){var r,o=n.aoData[a],i=function(t,e){for(;t.childNodes.length;)t.removeChild(t.firstChild);t.innerHTML=L(n,a,e,"display")};if("dom"!==t&&(t&&"auto"!==t||"dom"!==o.src)){var s=o.anCells;if(s)if(e!==P)i(s[e],e);else for(t=0,r=s.length;t<r;t++)i(s[t],t)}else o._aData=f(n,o,e,e===P?P:o._aData).data;if(o._aSortData=null,o._aFilterData=null,i=n.aoColumns,e!==P)i[e].sType=null;else{for(t=0,r=i.length;t<r;t++)i[t].sType=null;h(n,o)}}function f(t,e,n,a){var r,o,i=[],s=e.firstChild,l=0,u=t.aoColumns,c=t._rowReadObject;a=a!==P?a:c?{}:[];function d(t,e){if("string"==typeof t){var n=t.indexOf("@");-1!==n&&(n=t.substring(n+1),p(t)(a,e.getAttribute(n)))}}function f(t){n!==P&&n!==l||(r=u[l],o=R.trim(t.innerHTML),r&&r._bAttrSrc?(p(r.mData._)(a,o),d(r.mData.sort,t),d(r.mData.type,t),d(r.mData.filter,t)):c?(r._setter||(r._setter=p(r.mData)),r._setter(a,o)):a[l]=o),l++}if(s)for(;s;){var h=s.nodeName.toUpperCase();"TD"!=h&&"TH"!=h||(f(s),i.push(s)),s=s.nextSibling}else for(s=0,h=(i=e.anCells).length;s<h;s++)f(i[s]);return(e=e.firstChild?e:e.nTr)&&(e=e.getAttribute("id"))&&p(t.rowId)(a,e),{data:a,cells:i}}function b(t,e,n,a){var r,o,i=t.aoData[e],s=i._aData,l=[];if(null===i.nTr){var u=n||y.createElement("tr");i.nTr=u,i.anCells=l,u._DT_RowIndex=e,h(t,i);var c=0;for(r=t.aoColumns.length;c<r;c++){var d=t.aoColumns[c],f=(o=!n)?y.createElement(d.sCellType):a[c];f._DT_CellIndex={row:e,column:c},l.push(f),!o&&(n&&!d.mRender&&d.mData===c||R.isPlainObject(d.mData)&&d.mData._===c+".display")||(f.innerHTML=L(t,e,c,"display")),d.sClass&&(f.className+=" "+d.sClass),d.bVisible&&!n?u.appendChild(f):!d.bVisible&&n&&f.parentNode.removeChild(f),d.fnCreatedCell&&d.fnCreatedCell.call(t.oInstance,f,L(t,e,c),s,e,c)}Ht(t,"aoRowCreatedCallback",null,[u,s,e,l])}i.nTr.setAttribute("role","row")}function h(t,e){var n=e.nTr,a=e._aData;n&&((t=t.rowIdFn(a))&&(n.id=t),a.DT_RowClass&&(t=a.DT_RowClass.split(" "),e.__rowc=e.__rowc?se(e.__rowc.concat(t)):t,R(n).removeClass(e.__rowc.join(" ")).addClass(a.DT_RowClass)),a.DT_RowAttr&&R(n).attr(a.DT_RowAttr),a.DT_RowData&&R(n).data(a.DT_RowData))}function O(t){var e,n,a=t.nTHead,r=t.nTFoot,o=0===R("th, td",a).length,i=t.oClasses,s=t.aoColumns;o&&(n=R("<tr/>").appendTo(a));var l=0;for(e=s.length;l<e;l++){var u=s[l],c=R(u.nTh).addClass(u.sClass);o&&c.appendTo(n),t.oFeatures.bSort&&(c.addClass(u.sSortingClass),!1!==u.bSortable&&(c.attr("tabindex",t.iTabIndex).attr("aria-controls",t.sTableId),Ct(t,u.nTh,l))),u.sTitle!=c[0].innerHTML&&c.html(u.sTitle),Mt(t,"header")(t,c,u,i)}if(o&&U(t.aoHeader,a),R(a).find(">tr").attr("role","row"),R(a).find(">tr>th, >tr>td").addClass(i.sHeaderTH),R(r).find(">tr>th, >tr>td").addClass(i.sFooterTH),null!==r)for(l=0,e=(t=t.aoFooter[0]).length;l<e;l++)(u=s[l]).nTf=t[l].cell,u.sClass&&R(u.nTf).addClass(u.sClass)}function M(t,e,n){var a,r,o=[],i=[],s=t.aoColumns.length;if(e){n===P&&(n=!1);var l=0;for(a=e.length;l<a;l++){for(o[l]=e[l].slice(),o[l].nTr=e[l].nTr,r=s-1;0<=r;r--)t.aoColumns[r].bVisible||n||o[l].splice(r,1);i.push([])}for(l=0,a=o.length;l<a;l++){if(t=o[l].nTr)for(;r=t.firstChild;)t.removeChild(r);for(r=0,e=o[l].length;r<e;r++){var u=s=1;if(i[l][r]===P){for(t.appendChild(o[l][r].cell),i[l][r]=1;o[l+s]!==P&&o[l][r].cell==o[l+s][r].cell;)i[l+s][r]=1,s++;for(;o[l][r+u]!==P&&o[l][r].cell==o[l][r+u].cell;){for(n=0;n<s;n++)i[l+n][r+u]=1;u++}R(o[l][r].cell).attr("rowspan",s).attr("colspan",u)}}}}}function W(t){var e=Ht(t,"aoPreDrawCallback","preDraw",[t]);if(-1!==R.inArray(!1,e))ft(t,!1);else{e=[];var n=0,a=t.asStripeClasses,r=a.length,o=t.oLanguage,i=t.iInitDisplayStart,s="ssp"==Wt(t),l=t.aiDisplay;t.bDrawing=!0,i!==P&&-1!==i&&(t._iDisplayStart=s?i:i>=t.fnRecordsDisplay()?0:i,t.iInitDisplayStart=-1),i=t._iDisplayStart;var u=t.fnDisplayEnd();if(t.bDeferLoading)t.bDeferLoading=!1,t.iDraw++,ft(t,!1);else if(s){if(!t.bDestroying&&!q(t))return}else t.iDraw++;if(0!==l.length)for(o=s?t.aoData.length:u,s=s?0:i;s<o;s++){var c=l[s],d=t.aoData[c];null===d.nTr&&b(t,c);var f=d.nTr;if(0!==r){var h=a[n%r];d._sRowStripe!=h&&(R(f).removeClass(d._sRowStripe).addClass(h),d._sRowStripe=h)}Ht(t,"aoRowCallback",null,[f,d._aData,n,s,c]),e.push(f),n++}else n=o.sZeroRecords,1==t.iDraw&&"ajax"==Wt(t)?n=o.sLoadingRecords:o.sEmptyTable&&0===t.fnRecordsTotal()&&(n=o.sEmptyTable),e[0]=R("<tr/>",{class:r?a[0]:""}).append(R("<td />",{valign:"top",colSpan:v(t),class:t.oClasses.sRowEmpty}).html(n))[0];Ht(t,"aoHeaderCallback","header",[R(t.nTHead).children("tr")[0],g(t),i,u,l]),Ht(t,"aoFooterCallback","footer",[R(t.nTFoot).children("tr")[0],g(t),i,u,l]),(a=R(t.nTBody)).children().detach(),a.append(R(e)),Ht(t,"aoDrawCallback","draw",[t]),t.bSorted=!1,t.bFiltered=!1,t.bDrawing=!1}}function E(t,e){var n=t.oFeatures,a=n.bFilter;n.bSort&&_t(t),a?J(t,t.oPreviousSearch):t.aiDisplay=t.aiDisplayMaster.slice(),!0!==e&&(t._iDisplayStart=0),t._drawHold=e,W(t),t._drawHold=!1}function B(t){var e=t.oClasses,n=R(t.nTable);n=R("<div/>").insertBefore(n);var a=t.oFeatures,r=R("<div/>",{id:t.sTableId+"_wrapper",class:e.sWrapper+(t.nTFoot?"":" "+e.sNoFooter)});t.nHolding=n[0],t.nTableWrapper=r[0],t.nTableReinsertBefore=t.nTable.nextSibling;for(var o,i,s,l,u,c,d=t.sDom.split(""),f=0;f<d.length;f++){if(o=null,"<"==(i=d[f])){if(s=R("<div/>")[0],"'"==(l=d[f+1])||'"'==l){for(u="",c=2;d[f+c]!=l;)u+=d[f+c],c++;"H"==u?u=e.sJUIHeader:"F"==u&&(u=e.sJUIFooter),-1!=u.indexOf(".")?(l=u.split("."),s.id=l[0].substr(1,l[0].length-1),s.className=l[1]):"#"==u.charAt(0)?s.id=u.substr(1,u.length-1):s.className=u,f+=c}r.append(s),r=R(s)}else if(">"==i)r=r.parent();else if("l"==i&&a.bPaginate&&a.bLengthChange)o=lt(t);else if("f"==i&&a.bFilter)o=z(t);else if("r"==i&&a.bProcessing)o=dt(t);else if("t"==i)o=ht(t);else if("i"==i&&a.bInfo)o=nt(t);else if("p"==i&&a.bPaginate)o=ut(t);else if(0!==Kt.ext.feature.length)for(c=0,l=(s=Kt.ext.feature).length;c<l;c++)if(i==s[c].cFeature){o=s[c].fnInit(t);break}o&&((s=t.aanFeatures)[i]||(s[i]=[]),s[i].push(o),r.append(o))}n.replaceWith(r),t.nHolding=null}function U(t,e){var n,a,r;e=R(e).children("tr"),t.splice(0,t.length);var o=0;for(r=e.length;o<r;o++)t.push([]);for(o=0,r=e.length;o<r;o++){var i=e[o];for(n=i.firstChild;n;){if("TD"==n.nodeName.toUpperCase()||"TH"==n.nodeName.toUpperCase()){var s=1*n.getAttribute("colspan"),l=1*n.getAttribute("rowspan");s=s&&0!==s&&1!==s?s:1,l=l&&0!==l&&1!==l?l:1;var u=0;for(a=t[o];a[u];)u++;var c=u,d=1===s;for(a=0;a<s;a++)for(u=0;u<l;u++)t[o+u][c+a]={cell:n,unique:d},t[o+u].nTr=i}n=n.nextSibling}}}function V(t,e,n){var a=[];n||(n=t.aoHeader,e&&U(n=[],e)),e=0;for(var r=n.length;e<r;e++)for(var o=0,i=n[e].length;o<i;o++)!n[e][o].unique||a[o]&&t.bSortCellsTop||(a[o]=n[e][o].cell);return a}function $(a,t,e){if(Ht(a,"aoServerParams","serverParams",[t]),t&&R.isArray(t)){var n={},r=/(.*?)\[\]$/;R.each(t,function(t,e){(t=e.name.match(r))?(t=t[0],n[t]||(n[t]=[]),n[t].push(e.value)):n[e.name]=e.value}),t=n}function o(t){Ht(a,null,"xhr",[a,t,a.jqXHR]),e(t)}var i=a.ajax,s=a.oInstance;if(R.isPlainObject(i)&&i.data){var l=i.data,u="function"==typeof l?l(t,a):l;t="function"==typeof l&&u?u:R.extend(!0,t,u),delete i.data}u={data:t,success:function(t){var e=t.error||t.sError;e&&Lt(a,0,e),a.json=t,o(t)},dataType:"json",cache:!1,type:a.sServerMethod,error:function(t,e,n){n=Ht(a,null,"xhr",[a,null,a.jqXHR]),-1===R.inArray(!0,n)&&("parsererror"==e?Lt(a,0,"Invalid JSON response",1):4===t.readyState&&Lt(a,0,"Ajax error",7)),ft(a,!1)}},a.oAjaxData=t,Ht(a,null,"preXhr",[a,t]),a.fnServerData?a.fnServerData.call(s,a.sAjaxSource,R.map(t,function(t,e){return{name:e,value:t}}),o,a):a.sAjaxSource||"string"==typeof i?a.jqXHR=R.ajax(R.extend(u,{url:i||a.sAjaxSource})):"function"==typeof i?a.jqXHR=i.call(s,t,o,a):(a.jqXHR=R.ajax(R.extend(u,i)),i.data=l)}function q(e){return!e.bAjaxDataGet||(e.iDraw++,ft(e,!0),$(e,t(e),function(t){o(e,t)}),!1)}function t(t){function n(t,e){s.push({name:t,value:e})}var e=t.aoColumns,a=e.length,r=t.oFeatures,o=t.oPreviousSearch,i=t.aoPreSearchCols,s=[],l=Dt(t),u=t._iDisplayStart,c=!1!==r.bPaginate?t._iDisplayLength:-1;n("sEcho",t.iDraw),n("iColumns",a),n("sColumns",ie(e,"sName").join(",")),n("iDisplayStart",u),n("iDisplayLength",c);var d={draw:t.iDraw,columns:[],order:[],start:u,length:c,search:{value:o.sSearch,regex:o.bRegex}};for(u=0;u<a;u++){var f=e[u],h=i[u];c="function"==typeof f.mData?"function":f.mData,d.columns.push({data:c,name:f.sName,searchable:f.bSearchable,orderable:f.bSortable,search:{value:h.sSearch,regex:h.bRegex}}),n("mDataProp_"+u,c),r.bFilter&&(n("sSearch_"+u,h.sSearch),n("bRegex_"+u,h.bRegex),n("bSearchable_"+u,f.bSearchable)),r.bSort&&n("bSortable_"+u,f.bSortable)}return r.bFilter&&(n("sSearch",o.sSearch),n("bRegex",o.bRegex)),r.bSort&&(R.each(l,function(t,e){d.order.push({column:e.col,dir:e.dir}),n("iSortCol_"+t,e.col),n("sSortDir_"+t,e.dir)}),n("iSortingCols",l.length)),null===(e=Kt.ext.legacy.ajax)?t.sAjaxSource?s:d:e?s:d}function o(t,n){var e=function(t,e){return n[t]!==P?n[t]:n[e]},a=X(t,n),r=e("sEcho","draw"),o=e("iTotalRecords","recordsTotal");if(e=e("iTotalDisplayRecords","recordsFiltered"),r){if(1*r<t.iDraw)return;t.iDraw=1*r}for(l(t),t._iRecordsTotal=parseInt(o,10),t._iRecordsDisplay=parseInt(e,10),r=0,o=a.length;r<o;r++)F(t,a[r]);t.aiDisplay=t.aiDisplayMaster.slice(),t.bAjaxDataGet=!1,W(t),t._bInitComplete||it(t,n),t.bAjaxDataGet=!0,ft(t,!1)}function X(t,e){return"data"===(t=R.isPlainObject(t.ajax)&&t.ajax.dataSrc!==P?t.ajax.dataSrc:t.sAjaxDataProp)?e.aaData||e[t]:""!==t?H(t)(e):e}function z(n){var t=n.oClasses,e=n.sTableId,a=n.oLanguage,r=n.oPreviousSearch,o=n.aanFeatures,i='<input type="search" class="'+t.sFilterInput+'"/>',s=a.sSearch;s=s.match(/_INPUT_/)?s.replace("_INPUT_",i):s+i,t=R("<div/>",{id:o.f?null:e+"_filter",class:t.sFilter}).append(R("<label/>").append(s)),o=function(){var t=this.value?this.value:"";t!=r.sSearch&&(J(n,{sSearch:t,bRegex:r.bRegex,bSmart:r.bSmart,bCaseInsensitive:r.bCaseInsensitive}),n._iDisplayStart=0,W(n))},i=null!==n.searchDelay?n.searchDelay:"ssp"===Wt(n)?400:0;var l=R("input",t).val(r.sSearch).attr("placeholder",a.sSearchPlaceholder).on("keyup.DT search.DT input.DT paste.DT cut.DT",i?ge(o,i):o).on("keypress.DT",function(t){if(13==t.keyCode)return!1}).attr("aria-controls",e);return R(n.nTable).on("search.dt.DT",function(t,e){if(n===e)try{l[0]!==y.activeElement&&l.val(r.sSearch)}catch(t){}}),t[0]}function J(t,e,n){function a(t){o.sSearch=t.sSearch,o.bRegex=t.bRegex,o.bSmart=t.bSmart,o.bCaseInsensitive=t.bCaseInsensitive}function r(t){return t.bEscapeRegex!==P?!t.bEscapeRegex:t.bRegex}var o=t.oPreviousSearch,i=t.aoPreSearchCols;if(s(t),"ssp"!=Wt(t)){for(Z(t,e.sSearch,n,r(e),e.bSmart,e.bCaseInsensitive),a(e),e=0;e<i.length;e++)Y(t,i[e].sSearch,e,r(i[e]),i[e].bSmart,i[e].bCaseInsensitive);G(t)}else a(e);t.bFiltered=!0,Ht(t,null,"search",[t])}function G(t){for(var e,n,a=Kt.ext.search,r=t.aiDisplay,o=0,i=a.length;o<i;o++){for(var s=[],l=0,u=r.length;l<u;l++)n=r[l],e=t.aoData[n],a[o](t,e._aFilterData,n,e._aData,l)&&s.push(n);r.length=0,R.merge(r,s)}}function Y(t,e,n,a,r,o){if(""!==e){var i=[],s=t.aiDisplay;for(a=Q(e,a,r,o),r=0;r<s.length;r++)e=t.aoData[s[r]]._aFilterData[n],a.test(e)&&i.push(s[r]);t.aiDisplay=i}}function Z(t,e,n,a,r,o){r=Q(e,a,r,o);var i=t.oPreviousSearch.sSearch,s=t.aiDisplayMaster;o=[],0!==Kt.ext.search.length&&(n=!0);var l=K(t);if(e.length<=0)t.aiDisplay=s.slice();else{for((l||n||a||i.length>e.length||0!==e.indexOf(i)||t.bSorted)&&(t.aiDisplay=s.slice()),e=t.aiDisplay,n=0;n<e.length;n++)r.test(t.aoData[e[n]]._sFilterRow)&&o.push(e[n]);t.aiDisplay=o}}function Q(t,e,n,a){return t=e?t:de(t),n&&(t="^(?=.*?"+R.map(t.match(/"[^"]+"|[^ ]+/g)||[""],function(t){if('"'===t.charAt(0)){var e=t.match(/^"(.*)"$/);t=e?e[1]:t}return t.replace('"',"")}).join(")(?=.*?")+").*$"),new RegExp(t,a?"i":"")}function K(t){var e,n,a=t.aoColumns,r=Kt.ext.type.search,o=!1,i=0;for(e=t.aoData.length;i<e;i++){var s=t.aoData[i];if(!s._aFilterData){var l=[],u=0;for(n=a.length;u<n;u++){if((o=a[u]).bSearchable){var c=L(t,i,u,"filter");r[o.sType]&&(c=r[o.sType](c)),null===c&&(c=""),"string"!=typeof c&&c.toString&&(c=c.toString())}else c="";c.indexOf&&-1!==c.indexOf("&")&&(fe.innerHTML=c,c=he?fe.textContent:fe.innerText),c.replace&&(c=c.replace(/[\r\n\u2028]/g,"")),l.push(c)}s._aFilterData=l,s._sFilterRow=l.join("  "),o=!0}}return o}function tt(t){return{search:t.sSearch,smart:t.bSmart,regex:t.bRegex,caseInsensitive:t.bCaseInsensitive}}function et(t){return{sSearch:t.search,bSmart:t.smart,bRegex:t.regex,bCaseInsensitive:t.caseInsensitive}}function nt(t){var e=t.sTableId,n=t.aanFeatures.i,a=R("<div/>",{class:t.oClasses.sInfo,id:n?null:e+"_info"});return n||(t.aoDrawCallback.push({fn:at,sName:"information"}),a.attr("role","status").attr("aria-live","polite"),R(t.nTable).attr("aria-describedby",e+"_info")),a[0]}function at(t){var e=t.aanFeatures.i;if(0!==e.length){var n=t.oLanguage,a=t._iDisplayStart+1,r=t.fnDisplayEnd(),o=t.fnRecordsTotal(),i=t.fnRecordsDisplay(),s=i?n.sInfo:n.sInfoEmpty;i!==o&&(s+=" "+n.sInfoFiltered),s=rt(t,s+=n.sInfoPostFix),null!==(n=n.fnInfoCallback)&&(s=n.call(t.oInstance,t,a,r,o,i,s)),R(e).html(s)}}function rt(t,e){var n=t.fnFormatNumber,a=t._iDisplayStart+1,r=t._iDisplayLength,o=t.fnRecordsDisplay(),i=-1===r;return e.replace(/_START_/g,n.call(t,a)).replace(/_END_/g,n.call(t,t.fnDisplayEnd())).replace(/_MAX_/g,n.call(t,t.fnRecordsTotal())).replace(/_TOTAL_/g,n.call(t,o)).replace(/_PAGE_/g,n.call(t,i?1:Math.ceil(a/r))).replace(/_PAGES_/g,n.call(t,i?1:Math.ceil(o/r)))}function ot(n){var a=n.iInitDisplayStart,t=n.aoColumns,e=n.oFeatures,r=n.bDeferLoading;if(n.bInitialised){B(n),O(n),M(n,n.aoHeader),M(n,n.aoFooter),ft(n,!0),e.bAutoWidth&&bt(n);var o=0;for(e=t.length;o<e;o++){var i=t[o];i.sWidth&&(i.nTh.style.width=St(i.sWidth))}Ht(n,null,"preInit",[n]),E(n),"ssp"==(t=Wt(n))&&!r||("ajax"==t?$(n,[],function(t){var e=X(n,t);for(o=0;o<e.length;o++)F(n,e[o]);n.iInitDisplayStart=a,E(n),ft(n,!1),it(n,t)}):(ft(n,!1),it(n)))}else setTimeout(function(){ot(n)},200)}function it(t,e){t._bInitComplete=!0,(e||t.oInit.aaData)&&k(t),Ht(t,null,"plugin-init",[t,e]),Ht(t,"aoInitComplete","init",[t,e])}function st(t,e){e=parseInt(e,10),t._iDisplayLength=e,Ot(t),Ht(t,null,"length",[t,e])}function lt(a){var t=a.oClasses,e=a.sTableId,n=a.aLengthMenu,r=R.isArray(n[0]),o=r?n[0]:n;n=r?n[1]:n,r=R("<select/>",{name:e+"_length","aria-controls":e,class:t.sLengthSelect});for(var i=0,s=o.length;i<s;i++)r[0][i]=new Option("number"==typeof n[i]?a.fnFormatNumber(n[i]):n[i],o[i]);var l=R("<div><label/></div>").addClass(t.sLength);return a.aanFeatures.l||(l[0].id=e+"_length"),l.children().append(a.oLanguage.sLengthMenu.replace("_MENU_",r[0].outerHTML)),R("select",l).val(a._iDisplayLength).on("change.DT",function(t){st(a,R(this).val()),W(a)}),R(a.nTable).on("length.dt.DT",function(t,e,n){a===e&&R("select",l).val(n)}),l[0]}function ut(t){function i(t){W(t)}var e=t.sPaginationType,s=Kt.ext.pager[e],l="function"==typeof s;e=R("<div/>").addClass(t.oClasses.sPaging+e)[0];var u=t.aanFeatures;return l||s.fnInit(t,e,i),u.p||(e.id=t.sTableId+"_paginate",t.aoDrawCallback.push({fn:function(t){if(l){var e,n=t._iDisplayStart,a=t._iDisplayLength,r=t.fnRecordsDisplay(),o=-1===a;for(n=o?0:Math.ceil(n/a),a=o?1:Math.ceil(r/a),r=s(n,a),o=0,e=u.p.length;o<e;o++)Mt(t,"pageButton")(t,u.p[o],o,r,n,a)}else s.fnUpdate(t,i)},sName:"pagination"})),e}function ct(t,e,n){var a=t._iDisplayStart,r=t._iDisplayLength,o=t.fnRecordsDisplay();return 0===o||-1===r?a=0:"number"==typeof e?o<(a=e*r)&&(a=0):"first"==e?a=0:"previous"==e?(a=0<=r?a-r:0)<0&&(a=0):"next"==e?a+r<o&&(a+=r):"last"==e?a=Math.floor((o-1)/r)*r:Lt(t,0,"Unknown paging action: "+e,5),e=t._iDisplayStart!==a,t._iDisplayStart=a,e&&(Ht(t,null,"page",[t]),n&&W(t)),e}function dt(t){return R("<div/>",{id:t.aanFeatures.r?null:t.sTableId+"_processing",class:t.oClasses.sProcessing}).html(t.oLanguage.sProcessing).insertBefore(t.nTable)[0]}function ft(t,e){t.oFeatures.bProcessing&&R(t.aanFeatures.r).css("display",e?"block":"none"),Ht(t,null,"processing",[t,e])}function ht(t){var e=R(t.nTable);e.attr("role","grid");var n=t.oScroll;if(""===n.sX&&""===n.sY)return t.nTable;var a=n.sX,r=n.sY,o=t.oClasses,i=e.children("caption"),s=i.length?i[0]._captionSide:null,l=R(e[0].cloneNode(!1)),u=R(e[0].cloneNode(!1)),c=e.children("tfoot");c.length||(c=null),l=R("<div/>",{class:o.sScrollWrapper}).append(R("<div/>",{class:o.sScrollHead}).css({overflow:"hidden",position:"relative",border:0,width:a?a?St(a):null:"100%"}).append(R("<div/>",{class:o.sScrollHeadInner}).css({"box-sizing":"content-box",width:n.sXInner||"100%"}).append(l.removeAttr("id").css("margin-left",0).append("top"===s?i:null).append(e.children("thead"))))).append(R("<div/>",{class:o.sScrollBody}).css({position:"relative",overflow:"auto",width:a?St(a):null}).append(e)),c&&l.append(R("<div/>",{class:o.sScrollFoot}).css({overflow:"hidden",border:0,width:a?a?St(a):null:"100%"}).append(R("<div/>",{class:o.sScrollFootInner}).append(u.removeAttr("id").css("margin-left",0).append("bottom"===s?i:null).append(e.children("tfoot")))));var d=(e=l.children())[0];o=e[1];var f=c?e[2]:null;return a&&R(o).on("scroll.DT",function(t){t=this.scrollLeft,d.scrollLeft=t,c&&(f.scrollLeft=t)}),R(o).css(r&&n.bCollapse?"max-height":"height",r),t.nScrollHead=d,t.nScrollBody=o,t.nScrollFoot=f,t.aoDrawCallback.push({fn:pt,sName:"scrolling"}),l[0]}function pt(n){var t=n.oScroll,e=t.sX,a=t.sXInner,r=t.sY;t=t.iBarWidth;var o=R(n.nScrollHead),i=o[0].style,s=o.children("div"),l=s[0].style,u=s.children("table");s=n.nScrollBody;function c(t){(t=t.style).paddingTop="0",t.paddingBottom="0",t.borderTopWidth="0",t.borderBottomWidth="0",t.height=0}var d,f=R(s),h=s.style,p=R(n.nScrollFoot).children("div"),g=p.children("table"),b=R(n.nTHead),m=R(n.nTable),v=m[0],y=v.style,S=n.nTFoot?R(n.nTFoot):null,D=n.oBrowser,_=D.bScrollOversize,w=ie(n.aoColumns,"nTh"),T=[],C=[],x=[],I=[],A=s.scrollHeight>s.clientHeight;if(n.scrollBarVis!==A&&n.scrollBarVis!==P)n.scrollBarVis=A,k(n);else{if(n.scrollBarVis=A,m.children("thead, tfoot").remove(),S){var F=S.clone().prependTo(m),j=S.find("tr");F=F.find("tr")}var L=b.clone().prependTo(m);b=b.find("tr"),A=L.find("tr"),L.find("th, td").removeAttr("tabindex"),e||(h.width="100%",o[0].style.width="100%"),R.each(V(n,L),function(t,e){d=N(n,t),e.style.width=n.aoColumns[d].sWidth}),S&&gt(function(t){t.style.width=""},F),o=m.outerWidth(),""===e?(y.width="100%",_&&(m.find("tbody").height()>s.offsetHeight||"scroll"==f.css("overflow-y"))&&(y.width=St(m.outerWidth()-t)),o=m.outerWidth()):""!==a&&(y.width=St(a),o=m.outerWidth()),gt(c,A),gt(function(t){x.push(t.innerHTML),T.push(St(R(t).css("width")))},A),gt(function(t,e){-1!==R.inArray(t,w)&&(t.style.width=T[e])},b),R(A).height(0),S&&(gt(c,F),gt(function(t){I.push(t.innerHTML),C.push(St(R(t).css("width")))},F),gt(function(t,e){t.style.width=C[e]},j),R(F).height(0)),gt(function(t,e){t.innerHTML='<div class="dataTables_sizing">'+x[e]+"</div>",t.childNodes[0].style.height="0",t.childNodes[0].style.overflow="hidden",t.style.width=T[e]},A),S&&gt(function(t,e){t.innerHTML='<div class="dataTables_sizing">'+I[e]+"</div>",t.childNodes[0].style.height="0",t.childNodes[0].style.overflow="hidden",t.style.width=C[e]},F),m.outerWidth()<o?(j=s.scrollHeight>s.offsetHeight||"scroll"==f.css("overflow-y")?o+t:o,_&&(s.scrollHeight>s.offsetHeight||"scroll"==f.css("overflow-y"))&&(y.width=St(j-t)),""!==e&&""===a||Lt(n,1,"Possible column misalignment",6)):j="100%",h.width=St(j),i.width=St(j),S&&(n.nScrollFoot.style.width=St(j)),!r&&_&&(h.height=St(v.offsetHeight+t)),e=m.outerWidth(),u[0].style.width=St(e),l.width=St(e),a=m.height()>s.clientHeight||"scroll"==f.css("overflow-y"),l[r="padding"+(D.bScrollbarLeft?"Left":"Right")]=a?t+"px":"0px",S&&(g[0].style.width=St(e),p[0].style.width=St(e),p[0].style[r]=a?t+"px":"0px"),m.children("colgroup").insertBefore(m.children("thead")),f.trigger("scroll"),!n.bSorted&&!n.bFiltered||n._drawHold||(s.scrollTop=0)}}function gt(t,e,n){for(var a,r,o=0,i=0,s=e.length;i<s;){for(a=e[i].firstChild,r=n?n[i].firstChild:null;a;)1===a.nodeType&&(n?t(a,r,o):t(a,o),o++),a=a.nextSibling,r=n?r.nextSibling:null;i++}}function bt(t){var e,n=t.nTable,a=t.aoColumns,r=t.oScroll,o=r.sY,i=r.sX,s=r.sXInner,l=a.length,u=I(t,"bVisible"),c=R("th",t.nTHead),d=n.getAttribute("width"),f=n.parentNode,h=!1,p=t.oBrowser;for(r=p.bScrollOversize,(e=n.style.width)&&-1!==e.indexOf("%")&&(d=e),e=0;e<u.length;e++){var g=a[u[e]];null!==g.sWidth&&(g.sWidth=mt(g.sWidthOrig,f),h=!0)}if(r||!h&&!i&&!o&&l==v(t)&&l==c.length)for(e=0;e<l;e++)null!==(u=N(t,e))&&(a[u].sWidth=St(c.eq(e).width()));else{(l=R(n).clone().css("visibility","hidden").removeAttr("id")).find("tbody tr").remove();var b=R("<tr/>").appendTo(l.find("tbody"));for(l.find("thead, tfoot").remove(),l.append(R(t.nTHead).clone()).append(R(t.nTFoot).clone()),l.find("tfoot th, tfoot td").css("width",""),c=V(t,l.find("thead")[0]),e=0;e<u.length;e++)g=a[u[e]],c[e].style.width=null!==g.sWidthOrig&&""!==g.sWidthOrig?St(g.sWidthOrig):"",g.sWidthOrig&&i&&R(c[e]).append(R("<div/>").css({width:g.sWidthOrig,margin:0,padding:0,border:0,height:1}));if(t.aoData.length)for(e=0;e<u.length;e++)g=a[h=u[e]],R(vt(t,h)).clone(!1).append(g.sContentPadding).appendTo(b);for(R("[name]",l).removeAttr("name"),g=R("<div/>").css(i||o?{position:"absolute",top:0,left:0,height:1,right:0,overflow:"hidden"}:{}).append(l).appendTo(f),i&&s?l.width(s):i?(l.css("width","auto"),l.removeAttr("width"),l.width()<f.clientWidth&&d&&l.width(f.clientWidth)):o?l.width(f.clientWidth):d&&l.width(d),e=o=0;e<u.length;e++)s=(f=R(c[e])).outerWidth()-f.width(),o+=f=p.bBounding?Math.ceil(c[e].getBoundingClientRect().width):f.outerWidth(),a[u[e]].sWidth=St(f-s);n.style.width=St(o),g.remove()}d&&(n.style.width=St(d)),!d&&!i||t._reszEvt||(n=function(){R(m).on("resize.DT-"+t.sInstance,ge(function(){k(t)}))},r?setTimeout(n,1e3):n(),t._reszEvt=!0)}function mt(t,e){return t?(e=(t=R("<div/>").css("width",St(t)).appendTo(e||y.body))[0].offsetWidth,t.remove(),e):0}function vt(t,e){var n=yt(t,e);if(n<0)return null;var a=t.aoData[n];return a.nTr?a.anCells[e]:R("<td/>").html(L(t,n,e,"display"))[0]}function yt(t,e){for(var n,a=-1,r=-1,o=0,i=t.aoData.length;o<i;o++)(n=(n=(n=L(t,o,e,"display")+"").replace(pe,"")).replace(/&nbsp;/g," ")).length>a&&(a=n.length,r=o);return r}function St(t){return null===t?"0px":"number"==typeof t?t<0?"0px":t+"px":t.match(/\d$/)?t+"px":t}function Dt(t){var e=[],n=t.aoColumns,a=t.aaSortingFixed,r=R.isPlainObject(a),o=[],i=function(t){t.length&&!R.isArray(t[0])?o.push(t):R.merge(o,t)};for(R.isArray(a)&&i(a),r&&a.pre&&i(a.pre),i(t.aaSorting),r&&a.post&&i(a.post),t=0;t<o.length;t++){var s=o[t][0];for(a=0,r=(i=n[s].aDataSort).length;a<r;a++){var l=i[a],u=n[l].sType||"string";o[t]._idx===P&&(o[t]._idx=R.inArray(o[t][1],n[l].asSorting)),e.push({src:s,col:l,dir:o[t][1],index:o[t]._idx,type:u,formatter:Kt.ext.type.order[u+"-pre"]})}}return e}function _t(t){var e,u=[],c=Kt.ext.type.order,d=t.aoData,n=0,a=t.aiDisplayMaster;s(t);var f=Dt(t),r=0;for(e=f.length;r<e;r++){var o=f[r];o.formatter&&n++,It(t,o.col)}if("ssp"!=Wt(t)&&0!==f.length){for(r=0,e=a.length;r<e;r++)u[a[r]]=r;n===f.length?a.sort(function(t,e){var n,a=f.length,r=d[t]._aSortData,o=d[e]._aSortData;for(n=0;n<a;n++){var i=f[n],s=r[i.col],l=o[i.col];if(0!==(s=s<l?-1:l<s?1:0))return"asc"===i.dir?s:-s}return(s=u[t])<(l=u[e])?-1:l<s?1:0}):a.sort(function(t,e){var n,a=f.length,r=d[t]._aSortData,o=d[e]._aSortData;for(n=0;n<a;n++){var i=f[n],s=r[i.col],l=o[i.col];if(0!==(s=(i=c[i.type+"-"+i.dir]||c["string-"+i.dir])(s,l)))return s}return(s=u[t])<(l=u[e])?-1:l<s?1:0})}t.bSorted=!0}function wt(t){var e=t.aoColumns,n=Dt(t);t=t.oLanguage.oAria;for(var a=0,r=e.length;a<r;a++){var o=e[a],i=o.asSorting,s=o.sTitle.replace(/<.*?>/g,""),l=o.nTh;l.removeAttribute("aria-sort"),o.bSortable&&(s+="asc"===(o=0<n.length&&n[0].col==a?(l.setAttribute("aria-sort","asc"==n[0].dir?"ascending":"descending"),i[n[0].index+1]||i[0]):i[0])?t.sSortAscending:t.sSortDescending),l.setAttribute("aria-label",s)}}function Tt(t,e,n,a){function r(t,e){var n=t._idx;return n===P&&(n=R.inArray(t[1],i)),n+1<i.length?n+1:e?null:0}var o=t.aaSorting,i=t.aoColumns[e].asSorting;"number"==typeof o[0]&&(o=t.aaSorting=[o]),n&&t.oFeatures.bSortMulti?-1!==(n=R.inArray(e,ie(o,"0")))?(null===(e=r(o[n],!0))&&1===o.length&&(e=0),null===e?o.splice(n,1):(o[n][1]=i[e],o[n]._idx=e)):(o.push([e,i[0],0]),o[o.length-1]._idx=0):o.length&&o[0][0]==e?(e=r(o[0]),o.length=1,o[0][1]=i[e],o[0]._idx=e):(o.length=0,o.push([e,i[0]]),o[0]._idx=0),E(t),"function"==typeof a&&a(t)}function Ct(e,t,n,a){var r=e.aoColumns[n];kt(t,{},function(t){!1!==r.bSortable&&(e.oFeatures.bProcessing?(ft(e,!0),setTimeout(function(){Tt(e,n,t.shiftKey,a),"ssp"!==Wt(e)&&ft(e,!1)},0)):Tt(e,n,t.shiftKey,a))})}function xt(t){var e,n=t.aLastSort,a=t.oClasses.sSortColumn,r=Dt(t),o=t.oFeatures;if(o.bSort&&o.bSortClasses){for(o=0,e=n.length;o<e;o++){var i=n[o].src;R(ie(t.aoData,"anCells",i)).removeClass(a+(o<2?o+1:3))}for(o=0,e=r.length;o<e;o++)i=r[o].src,R(ie(t.aoData,"anCells",i)).addClass(a+(o<2?o+1:3))}t.aLastSort=r}function It(t,e){var n,a=t.aoColumns[e],r=Kt.ext.order[a.sSortDataType];r&&(n=r.call(t.oInstance,t,e,u(t,e)));for(var o,i=Kt.ext.type.order[a.sType+"-pre"],s=0,l=t.aoData.length;s<l;s++)(a=t.aoData[s])._aSortData||(a._aSortData=[]),a._aSortData[e]&&!r||(o=r?n[s]:L(t,s,e,"sort"),a._aSortData[e]=i?i(o):o)}function At(n){if(n.oFeatures.bStateSave&&!n.bDestroying){var t={time:+new Date,start:n._iDisplayStart,length:n._iDisplayLength,order:R.extend(!0,[],n.aaSorting),search:tt(n.oPreviousSearch),columns:R.map(n.aoColumns,function(t,e){return{visible:t.bVisible,search:tt(n.aoPreSearchCols[e])}})};Ht(n,"aoStateSaveParams","stateSaveParams",[n,t]),n.oSavedState=t,n.fnStateSaveCallback.call(n.oInstance,n,t)}}function Ft(n,t,a){var r,o,i=n.aoColumns;if(t=function(t){if(t&&t.time){var e=Ht(n,"aoStateLoadParams","stateLoadParams",[n,t]);if(-1===R.inArray(!1,e)&&!(0<(e=n.iStateDuration)&&t.time<new Date-1e3*e||t.columns&&i.length!==t.columns.length)){if(n.oLoadedState=R.extend(!0,{},t),t.start!==P&&(n._iDisplayStart=t.start,n.iInitDisplayStart=t.start),t.length!==P&&(n._iDisplayLength=t.length),t.order!==P&&(n.aaSorting=[],R.each(t.order,function(t,e){n.aaSorting.push(e[0]>=i.length?[0,e[1]]:e)})),t.search!==P&&R.extend(n.oPreviousSearch,et(t.search)),t.columns)for(r=0,o=t.columns.length;r<o;r++)(e=t.columns[r]).visible!==P&&(i[r].bVisible=e.visible),e.search!==P&&R.extend(n.aoPreSearchCols[r],et(e.search));Ht(n,"aoStateLoaded","stateLoaded",[n,t])}}a()},n.oFeatures.bStateSave){var e=n.fnStateLoadCallback.call(n.oInstance,n,t);e!==P&&t(e)}else a()}function jt(t){var e=Kt.settings;return-1!==(t=R.inArray(t,ie(e,"nTable")))?e[t]:null}function Lt(t,e,n,a){if(n="DataTables warning: "+(t?"table id="+t.sTableId+" - ":"")+n,a&&(n+=". For more information about this error, please see http://datatables.net/tn/"+a),e)m.console&&console.log&&console.log(n);else if(e=(e=Kt.ext).sErrMode||e.errMode,t&&Ht(t,null,"error",[t,a,n]),"alert"==e)alert(n);else{if("throw"==e)throw Error(n);"function"==typeof e&&e(t,a,n)}}function Rt(n,a,t,e){R.isArray(t)?R.each(t,function(t,e){R.isArray(e)?Rt(n,a,e[0],e[1]):Rt(n,a,e)}):(e===P&&(e=t),a[t]!==P&&(n[e]=a[t]))}function Pt(t,e,n){var a;for(a in e)if(e.hasOwnProperty(a)){var r=e[a];R.isPlainObject(r)?(R.isPlainObject(t[a])||(t[a]={}),R.extend(!0,t[a],r)):n&&"data"!==a&&"aaData"!==a&&R.isArray(r)?t[a]=r.slice():t[a]=r}return t}function kt(e,t,n){R(e).on("click.DT",t,function(t){R(e).blur(),n(t)}).on("keypress.DT",t,function(t){13===t.which&&(t.preventDefault(),n(t))}).on("selectstart.DT",function(){return!1})}function Nt(t,e,n,a){n&&t[e].push({fn:n,sName:a})}function Ht(n,t,e,a){var r=[];return t&&(r=R.map(n[t].slice().reverse(),function(t,e){return t.fn.apply(n.oInstance,a)})),null!==e&&(t=R.Event(e+".dt"),R(n.nTable).trigger(t,a),r.push(t.result)),r}function Ot(t){var e=t._iDisplayStart,n=t.fnDisplayEnd(),a=t._iDisplayLength;n<=e&&(e=n-a),e-=e%a,(-1===a||e<0)&&(e=0),t._iDisplayStart=e}function Mt(t,e){t=t.renderer;var n=Kt.ext.renderer[e];return R.isPlainObject(t)&&t[e]?n[t[e]]||n._:"string"==typeof t&&n[t]||n._}function Wt(t){return t.oFeatures.bServerSide?"ssp":t.ajax||t.sAjaxSource?"ajax":"dom"}function Et(t,e){var n=Fe.numbers_length,a=Math.floor(n/2);return e<=n?t=Jt(0,e):t<=a?((t=Jt(0,n-2)).push("ellipsis"),t.push(e-1)):(e-1-a<=t?t=Jt(e-(n-2),e):((t=Jt(t-a+2,t+a-1)).push("ellipsis"),t.push(e-1)),t.splice(0,0,"ellipsis"),t.splice(0,0,0)),t.DT_el="span",t}function Bt(n){R.each({num:function(t){return je(t,n)},"num-fmt":function(t){return je(t,n,oe)},"html-num":function(t){return je(t,n,ne)},"html-num-fmt":function(t){return je(t,n,ne,oe)}},function(t,e){Yt.type.order[t+n+"-pre"]=e,t.match(/^html\-/)&&(Yt.type.search[t+n]=Yt.type.search.html)})}function e(e){return function(){var t=[jt(this[Kt.ext.iApiIndex])].concat(Array.prototype.slice.call(arguments));return Kt.ext.internal[e].apply(this,t)}}function Ut(t){return!t||!0===t||"-"===t}function Vt(t){var e=parseInt(t,10);return!isNaN(e)&&isFinite(t)?e:null}function $t(t,e){return te[e]||(te[e]=new RegExp(de(e),"g")),"string"==typeof t&&"."!==e?t.replace(/\./g,"").replace(te[e],"."):t}function qt(t,e,n){var a="string"==typeof t;return!!Ut(t)||(e&&a&&(t=$t(t,e)),n&&a&&(t=t.replace(oe,"")),!isNaN(parseFloat(t))&&isFinite(t))}function Xt(t,e,n){return!!Ut(t)||((Ut(t)||"string"==typeof t)&&!!qt(t.replace(ne,""),e,n)||null)}function zt(t,e,n,a){var r=[],o=0,i=e.length;if(a!==P)for(;o<i;o++)t[e[o]][n]&&r.push(t[e[o]][n][a]);else for(;o<i;o++)r.push(t[e[o]][n]);return r}function Jt(t,e){var n=[];if(e===P){e=0;var a=t}else a=e,e=t;for(t=e;t<a;t++)n.push(t);return n}function Gt(t){for(var e=[],n=0,a=t.length;n<a;n++)t[n]&&e.push(t[n]);return e}var Yt,Zt,Qt,Kt=function(b){this.$=function(t,e){return this.api(!0).$(t,e)},this._=function(t,e){return this.api(!0).rows(t,e).data()},this.api=function(t){return new ve(t?jt(this[Yt.iApiIndex]):this)},this.fnAddData=function(t,e){var n=this.api(!0);return t=R.isArray(t)&&(R.isArray(t[0])||R.isPlainObject(t[0]))?n.rows.add(t):n.row.add(t),e!==P&&!e||n.draw(),t.flatten().toArray()},this.fnAdjustColumnSizing=function(t){var e=this.api(!0).columns.adjust(),n=e.settings()[0],a=n.oScroll;t===P||t?e.draw(!1):""===a.sX&&""===a.sY||pt(n)},this.fnClearTable=function(t){var e=this.api(!0).clear();t!==P&&!t||e.draw()},this.fnClose=function(t){this.api(!0).row(t).child.hide()},this.fnDeleteRow=function(t,e,n){var a=this.api(!0),r=(t=a.rows(t)).settings()[0],o=r.aoData[t[0][0]];return t.remove(),e&&e.call(this,r,o),n!==P&&!n||a.draw(),o},this.fnDestroy=function(t){this.api(!0).destroy(t)},this.fnDraw=function(t){this.api(!0).draw(t)},this.fnFilter=function(t,e,n,a,r,o){r=this.api(!0),null===e||e===P?r.search(t,n,a,o):r.column(e).search(t,n,a,o),r.draw()},this.fnGetData=function(t,e){var n=this.api(!0);if(t===P)return n.data().toArray();var a=t.nodeName?t.nodeName.toLowerCase():"";return e!==P||"td"==a||"th"==a?n.cell(t,e).data():n.row(t).data()||null},this.fnGetNodes=function(t){var e=this.api(!0);return t!==P?e.row(t).node():e.rows().nodes().flatten().toArray()},this.fnGetPosition=function(t){var e=this.api(!0),n=t.nodeName.toUpperCase();return"TR"==n?e.row(t).index():"TD"==n||"TH"==n?[(t=e.cell(t).index()).row,t.columnVisible,t.column]:null},this.fnIsOpen=function(t){return this.api(!0).row(t).child.isShown()},this.fnOpen=function(t,e,n){return this.api(!0).row(t).child(e,n).show().child()[0]},this.fnPageChange=function(t,e){t=this.api(!0).page(t),e!==P&&!e||t.draw(!1)},this.fnSetColumnVis=function(t,e,n){t=this.api(!0).column(t).visible(e),n!==P&&!n||t.columns.adjust().draw()},this.fnSettings=function(){return jt(this[Yt.iApiIndex])},this.fnSort=function(t){this.api(!0).order(t).draw()},this.fnSortListener=function(t,e,n){this.api(!0).order.listener(t,e,n)},this.fnUpdate=function(t,e,n,a,r){var o=this.api(!0);return n===P||null===n?o.row(e).data(t):o.cell(e,n).data(t),r!==P&&!r||o.columns.adjust(),a!==P&&!a||o.draw(),0},this.fnVersionCheck=Yt.fnVersionCheck;var m=this,v=b===P,y=this.length;for(var t in v&&(b={}),this.oApi=this.internal=Yt.internal,Kt.ext.internal)t&&(this[t]=e(t));return this.each(function(){var n,t={},a=1<y?Pt(t,b,!0):b,r=0;t=this.getAttribute("id");var o=!1,e=Kt.defaults,i=R(this);if("table"!=this.nodeName.toLowerCase())Lt(null,0,"Non-table node initialisation ("+this.nodeName+")",2);else{_(e),w(e.column),S(e,e,!0),S(e.column,e.column,!0),S(e,R.extend(a,i.data()),!0);var s=Kt.settings;for(r=0,n=s.length;r<n;r++){var l=s[r];if(l.nTable==this||l.nTHead&&l.nTHead.parentNode==this||l.nTFoot&&l.nTFoot.parentNode==this){var u=a.bRetrieve!==P?a.bRetrieve:e.bRetrieve;if(v||u)return l.oInstance;if(a.bDestroy!==P?a.bDestroy:e.bDestroy){l.oInstance.fnDestroy();break}return void Lt(l,0,"Cannot reinitialise DataTable",3)}if(l.sTableId==this.id){s.splice(r,1);break}}null!==t&&""!==t||(this.id=t="DataTables_Table_"+Kt.ext._unique++);var c=R.extend(!0,{},Kt.models.oSettings,{sDestroyWidth:i[0].style.width,sInstance:t,sTableId:t});c.nTable=this,c.oApi=m.internal,c.oInit=a,s.push(c),c.oInstance=1===m.length?m:i.dataTable(),_(a),D(a.oLanguage),a.aLengthMenu&&!a.iDisplayLength&&(a.iDisplayLength=R.isArray(a.aLengthMenu[0])?a.aLengthMenu[0][0]:a.aLengthMenu[0]),a=Pt(R.extend(!0,{},e),a),Rt(c.oFeatures,a,"bPaginate bLengthChange bFilter bSort bSortMulti bInfo bProcessing bAutoWidth bSortClasses bServerSide bDeferRender".split(" ")),Rt(c,a,["asStripeClasses","ajax","fnServerData","fnFormatNumber","sServerMethod","aaSorting","aaSortingFixed","aLengthMenu","sPaginationType","sAjaxSource","sAjaxDataProp","iStateDuration","sDom","bSortCellsTop","iTabIndex","fnStateLoadCallback","fnStateSaveCallback","renderer","searchDelay","rowId",["iCookieDuration","iStateDuration"],["oSearch","oPreviousSearch"],["aoSearchCols","aoPreSearchCols"],["iDisplayLength","_iDisplayLength"]]),Rt(c.oScroll,a,[["sScrollX","sX"],["sScrollXInner","sXInner"],["sScrollY","sY"],["bScrollCollapse","bCollapse"]]),Rt(c.oLanguage,a,"fnInfoCallback"),Nt(c,"aoDrawCallback",a.fnDrawCallback,"user"),Nt(c,"aoServerParams",a.fnServerParams,"user"),Nt(c,"aoStateSaveParams",a.fnStateSaveParams,"user"),Nt(c,"aoStateLoadParams",a.fnStateLoadParams,"user"),Nt(c,"aoStateLoaded",a.fnStateLoaded,"user"),Nt(c,"aoRowCallback",a.fnRowCallback,"user"),Nt(c,"aoRowCreatedCallback",a.fnCreatedRow,"user"),Nt(c,"aoHeaderCallback",a.fnHeaderCallback,"user"),Nt(c,"aoFooterCallback",a.fnFooterCallback,"user"),Nt(c,"aoInitComplete",a.fnInitComplete,"user"),Nt(c,"aoPreDrawCallback",a.fnPreDrawCallback,"user"),c.rowIdFn=H(a.rowId),T(c);var d=c.oClasses;R.extend(d,Kt.ext.classes,a.oClasses),i.addClass(d.sTable),c.iInitDisplayStart===P&&(c.iInitDisplayStart=a.iDisplayStart,c._iDisplayStart=a.iDisplayStart),null!==a.iDeferLoading&&(c.bDeferLoading=!0,t=R.isArray(a.iDeferLoading),c._iRecordsDisplay=t?a.iDeferLoading[0]:a.iDeferLoading,c._iRecordsTotal=t?a.iDeferLoading[1]:a.iDeferLoading);var f=c.oLanguage;R.extend(!0,f,a.oLanguage),f.sUrl&&(R.ajax({dataType:"json",url:f.sUrl,success:function(t){D(t),S(e.oLanguage,t),R.extend(!0,f,t),ot(c)},error:function(){ot(c)}}),o=!0),null===a.asStripeClasses&&(c.asStripeClasses=[d.sStripeOdd,d.sStripeEven]),t=c.asStripeClasses;var h=i.children("tbody").find("tr").eq(0);if(-1!==R.inArray(!0,R.map(t,function(t,e){return h.hasClass(t)}))&&(R("tbody tr",this).removeClass(t.join(" ")),c.asDestroyStripes=t.slice()),t=[],0!==(s=this.getElementsByTagName("thead")).length&&(U(c.aoHeader,s[0]),t=V(c)),null===a.aoColumns)for(s=[],r=0,n=t.length;r<n;r++)s.push(null);else s=a.aoColumns;for(r=0,n=s.length;r<n;r++)C(c,t?t[r]:null);if(A(c,a.aoColumnDefs,s,function(t,e){x(c,t,e)}),h.length){function p(t,e){return null!==t.getAttribute("data-"+e)?e:null}R(h[0]).children("th, td").each(function(t,e){var n=c.aoColumns[t];if(n.mData===t){var a=p(e,"sort")||p(e,"order");e=p(e,"filter")||p(e,"search"),null===a&&null===e||(n.mData={_:t+".display",sort:null!==a?t+".@data-"+a:P,type:null!==a?t+".@data-"+a:P,filter:null!==e?t+".@data-"+e:P},x(c,t))}})}var g=c.oFeatures;t=function(){if(a.aaSorting===P){var t=c.aaSorting;for(r=0,n=t.length;r<n;r++)t[r][1]=c.aoColumns[r].asSorting[0]}xt(c),g.bSort&&Nt(c,"aoDrawCallback",function(){if(c.bSorted){var t=Dt(c),n={};R.each(t,function(t,e){n[e.src]=e.dir}),Ht(c,null,"order",[c,t,n]),wt(c)}}),Nt(c,"aoDrawCallback",function(){(c.bSorted||"ssp"===Wt(c)||g.bDeferRender)&&xt(c)},"sc"),t=i.children("caption").each(function(){this._captionSide=R(this).css("caption-side")});var e=i.children("thead");if(0===e.length&&(e=R("<thead/>").appendTo(i)),c.nTHead=e[0],0===(e=i.children("tbody")).length&&(e=R("<tbody/>").appendTo(i)),c.nTBody=e[0],0===(e=i.children("tfoot")).length&&0<t.length&&(""!==c.oScroll.sX||""!==c.oScroll.sY)&&(e=R("<tfoot/>").appendTo(i)),0===e.length||0===e.children().length?i.addClass(d.sNoFooter):0<e.length&&(c.nTFoot=e[0],U(c.aoFooter,c.nTFoot)),a.aaData)for(r=0;r<a.aaData.length;r++)F(c,a.aaData[r]);else!c.bDeferLoading&&"dom"!=Wt(c)||j(c,R(c.nTBody).children("tr"));c.aiDisplay=c.aiDisplayMaster.slice(),!(c.bInitialised=!0)===o&&ot(c)},a.bStateSave?(g.bStateSave=!0,Nt(c,"aoDrawCallback",At,"state_save"),Ft(c,a,t)):t()}}),m=null,this},te={},ee=/[\r\n\u2028]/g,ne=/<.*?>/g,ae=/^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/,re=/(\/|\.|\*|\+|\?|\||\(|\)|\[|\]|\{|\}|\\|\$|\^|\-)/g,oe=/[',$£€¥%\u2009\u202F\u20BD\u20a9\u20BArfkɃΞ]/gi,ie=function(t,e,n){var a=[],r=0,o=t.length;if(n!==P)for(;r<o;r++)t[r]&&t[r][e]&&a.push(t[r][e][n]);else for(;r<o;r++)t[r]&&a.push(t[r][e]);return a},se=function(t){t:{if(!(t.length<2))for(var e=t.slice().sort(),n=e[0],a=1,r=e.length;a<r;a++){if(e[a]===n){e=!1;break t}n=e[a]}e=!0}if(e)return t.slice();e=[],r=t.length;var o,i=0;a=0;t:for(;a<r;a++){for(n=t[a],o=0;o<i;o++)if(e[o]===n)continue t;e.push(n),i++}return e};Kt.util={throttle:function(a,t){var r,o,i=t!==P?t:200;return function(){var t=this,e=+new Date,n=arguments;r&&e<r+i?(clearTimeout(o),o=setTimeout(function(){r=P,a.apply(t,n)},i)):(r=e,a.apply(t,n))}},escapeRegex:function(t){return t.replace(re,"\\$1")}};var le=function(t,e,n){t[e]!==P&&(t[n]=t[e])},ue=/\[.*?\]$/,ce=/\(\)$/,de=Kt.util.escapeRegex,fe=R("<div>")[0],he=fe.textContent!==P,pe=/<.*?>/g,ge=Kt.util.throttle,be=[],me=Array.prototype,ve=function(t,e){if(!(this instanceof ve))return new ve(t,e);function n(t){(t=function(t){var e,n=Kt.settings,a=R.map(n,function(t,e){return t.nTable});if(!t)return[];if(t.nTable&&t.oApi)return[t];if(t.nodeName&&"table"===t.nodeName.toLowerCase()){var r=R.inArray(t,a);return-1!==r?[n[r]]:null}return t&&"function"==typeof t.settings?t.settings().toArray():("string"==typeof t?e=R(t):t instanceof R&&(e=t),e?e.map(function(t){return-1!==(r=R.inArray(this,a))?n[r]:null}).toArray():void 0)}(t))&&a.push.apply(a,t)}var a=[];if(R.isArray(t))for(var r=0,o=t.length;r<o;r++)n(t[r]);else n(t);this.context=se(a),e&&R.merge(this,e),this.selector={rows:null,cols:null,opts:null},ve.extend(this,this,be)};Kt.Api=ve,R.extend(ve.prototype,{any:function(){return 0!==this.count()},concat:me.concat,context:[],count:function(){return this.flatten().length},each:function(t){for(var e=0,n=this.length;e<n;e++)t.call(this,this[e],e,this);return this},eq:function(t){var e=this.context;return e.length>t?new ve(e[t],this[t]):null},filter:function(t){var e=[];if(me.filter)e=me.filter.call(this,t,this);else for(var n=0,a=this.length;n<a;n++)t.call(this,this[n],n,this)&&e.push(this[n]);return new ve(this.context,e)},flatten:function(){var t=[];return new ve(this.context,t.concat.apply(t,this.toArray()))},join:me.join,indexOf:me.indexOf||function(t,e){e=e||0;for(var n=this.length;e<n;e++)if(this[e]===t)return e;return-1},iterator:function(t,e,n,a){var r,o,i,s=[],l=this.context,u=this.selector;"string"==typeof t&&(a=n,n=e,e=t,t=!1);var c=0;for(r=l.length;c<r;c++){var d=new ve(l[c]);if("table"===e){var f=n.call(d,l[c],c);f!==P&&s.push(f)}else if("columns"===e||"rows"===e)(f=n.call(d,l[c],this[c],c))!==P&&s.push(f);else if("column"===e||"column-rows"===e||"row"===e||"cell"===e){var h=this[c];"column-rows"===e&&(i=we(l[c],u.opts));var p=0;for(o=h.length;p<o;p++)f=h[p],(f="cell"===e?n.call(d,l[c],f.row,f.column,c,p):n.call(d,l[c],f,c,p,i))!==P&&s.push(f)}}return s.length||a?((e=(t=new ve(l,t?s.concat.apply([],s):s)).selector).rows=u.rows,e.cols=u.cols,e.opts=u.opts,t):this},lastIndexOf:me.lastIndexOf||function(t,e){return this.indexOf.apply(this.toArray.reverse(),arguments)},length:0,map:function(t){var e=[];if(me.map)e=me.map.call(this,t,this);else for(var n=0,a=this.length;n<a;n++)e.push(t.call(this,this[n],n));return new ve(this.context,e)},pluck:function(e){return this.map(function(t){return t[e]})},pop:me.pop,push:me.push,reduce:me.reduce||function(t,e){return n(this,t,e,0,this.length,1)},reduceRight:me.reduceRight||function(t,e){return n(this,t,e,this.length-1,-1,-1)},reverse:me.reverse,selector:null,shift:me.shift,slice:function(){return new ve(this.context,this)},sort:me.sort,splice:me.splice,toArray:function(){return me.slice.call(this)},to$:function(){return R(this)},toJQuery:function(){return R(this)},unique:function(){return new ve(this.context,se(this))},unshift:me.unshift}),ve.extend=function(t,e,n){if(n.length&&e&&(e instanceof ve||e.__dt_wrapper)){function a(e,n,a){return function(){var t=n.apply(e,arguments);return ve.extend(t,t,a.methodExt),t}}var r,o=0;for(r=n.length;o<r;o++){var i=n[o];e[i.name]="function"===i.type?a(t,i.val,i):"object"===i.type?{}:i.val,e[i.name].__dt_wrapper=!0,ve.extend(t,e[i.name],i.propExt)}}},ve.register=Zt=function(t,e){if(R.isArray(t))for(var n=0,a=t.length;n<a;n++)ve.register(t[n],e);else{a=t.split(".");var r,o=be;for(t=0,n=a.length;t<n;t++){var i=(r=-1!==a[t].indexOf("()"))?a[t].replace("()",""):a[t];t:{for(var s=0,l=o.length;s<l;s++)if(o[s].name===i){s=o[s];break t}s=null}s||(s={name:i,val:{},methodExt:[],propExt:[],type:"object"},o.push(s)),t===n-1?(s.val=e,s.type="function"==typeof e?"function":R.isPlainObject(e)?"object":"other"):o=r?s.methodExt:s.propExt}}},ve.registerPlural=Qt=function(t,e,n){ve.register(t,n),ve.register(e,function(){var t=n.apply(this,arguments);return t===this?this:t instanceof ve?t.length?R.isArray(t[0])?new ve(t.context,t[0]):t[0]:P:t})};Zt("tables()",function(t){return t?new ve(function(t,e){if("number"==typeof t)return[e[t]];var n=R.map(e,function(t,e){return t.nTable});return R(n).filter(t).map(function(t){return t=R.inArray(this,n),e[t]}).toArray()}(t,this.context)):this}),Zt("table()",function(t){var e=(t=this.tables(t)).context;return e.length?new ve(e[0]):t}),Qt("tables().nodes()","table().node()",function(){return this.iterator("table",function(t){return t.nTable},1)}),Qt("tables().body()","table().body()",function(){return this.iterator("table",function(t){return t.nTBody},1)}),Qt("tables().header()","table().header()",function(){return this.iterator("table",function(t){return t.nTHead},1)}),Qt("tables().footer()","table().footer()",function(){return this.iterator("table",function(t){return t.nTFoot},1)}),Qt("tables().containers()","table().container()",function(){return this.iterator("table",function(t){return t.nTableWrapper},1)}),Zt("draw()",function(e){return this.iterator("table",function(t){"page"===e?W(t):("string"==typeof e&&(e="full-hold"!==e),E(t,!1===e))})}),Zt("page()",function(e){return e===P?this.page.info().page:this.iterator("table",function(t){ct(t,e)})}),Zt("page.info()",function(t){if(0===this.context.length)return P;var e=(t=this.context[0])._iDisplayStart,n=t.oFeatures.bPaginate?t._iDisplayLength:-1,a=t.fnRecordsDisplay(),r=-1===n;return{page:r?0:Math.floor(e/n),pages:r?1:Math.ceil(a/n),start:e,end:t.fnDisplayEnd(),length:n,recordsTotal:t.fnRecordsTotal(),recordsDisplay:a,serverSide:"ssp"===Wt(t)}}),Zt("page.len()",function(e){return e===P?0!==this.context.length?this.context[0]._iDisplayLength:P:this.iterator("table",function(t){st(t,e)})});function ye(a,r,t){if(t){var e=new ve(a);e.one("draw",function(){t(e.ajax.json())})}if("ssp"==Wt(a))E(a,r);else{ft(a,!0);var n=a.jqXHR;n&&4!==n.readyState&&n.abort(),$(a,[],function(t){l(a);for(var e=0,n=(t=X(a,t)).length;e<n;e++)F(a,t[e]);E(a,r),ft(a,!1)})}}Zt("ajax.json()",function(){var t=this.context;if(0<t.length)return t[0].json}),Zt("ajax.params()",function(){var t=this.context;if(0<t.length)return t[0].oAjaxData}),Zt("ajax.reload()",function(e,n){return this.iterator("table",function(t){ye(t,!1===n,e)})}),Zt("ajax.url()",function(e){var t=this.context;return e===P?0===t.length?P:(t=t[0]).ajax?R.isPlainObject(t.ajax)?t.ajax.url:t.ajax:t.sAjaxSource:this.iterator("table",function(t){R.isPlainObject(t.ajax)?t.ajax.url=e:t.ajax=e})}),Zt("ajax.url().load()",function(e,n){return this.iterator("table",function(t){ye(t,!1===n,e)})});function Se(t,e,n,a,r){var o,i,s,l=[],u=typeof e;for(e&&"string"!==u&&"function"!==u&&e.length!==P||(e=[e]),u=0,i=e.length;u<i;u++){var c=e[u]&&e[u].split&&!e[u].match(/[\[\(:]/)?e[u].split(","):[e[u]],d=0;for(s=c.length;d<s;d++)(o=n("string"==typeof c[d]?R.trim(c[d]):c[d]))&&o.length&&(l=l.concat(o))}if((t=Yt.selector[t]).length)for(u=0,i=t.length;u<i;u++)l=t[u](a,r,l);return se(l)}function De(t){return(t=t||{}).filter&&t.search===P&&(t.search=t.filter),R.extend({search:"none",order:"current",page:"all"},t)}function _e(t){for(var e=0,n=t.length;e<n;e++)if(0<t[e].length)return t[0]=t[e],t[0].length=1,t.length=1,t.context=[t.context[e]],t;return t.length=0,t}var we=function(t,e){var n=[],a=t.aiDisplay,r=t.aiDisplayMaster,o=e.search,i=e.order;if(e=e.page,"ssp"==Wt(t))return"removed"===o?[]:Jt(0,r.length);if("current"==e)for(i=t._iDisplayStart,t=t.fnDisplayEnd();i<t;i++)n.push(a[i]);else if("current"==i||"applied"==i){if("none"==o)n=r.slice();else if("applied"==o)n=a.slice();else if("removed"==o){var s={};for(i=0,t=a.length;i<t;i++)s[a[i]]=null;n=R.map(r,function(t){return s.hasOwnProperty(t)?null:t})}}else if("index"==i||"original"==i)for(i=0,t=t.aoData.length;i<t;i++)"none"==o?n.push(i):(-1===(r=R.inArray(i,a))&&"removed"==o||0<=r&&"applied"==o)&&n.push(i);return n};Zt("rows()",function(e,n){e===P?e="":R.isPlainObject(e)&&(n=e,e=""),n=De(n);var t=this.iterator("table",function(t){return Se("row",e,function(n){var t=Vt(n),a=r.aoData;if(null!==t&&!o)return[t];if(i=i||we(r,o),null!==t&&-1!==R.inArray(t,i))return[t];if(null===n||n===P||""===n)return i;if("function"==typeof n)return R.map(i,function(t){var e=a[t];return n(t,e._aData,e.nTr)?t:null});if(n.nodeName){t=n._DT_RowIndex;var e=n._DT_CellIndex;return t!==P?a[t]&&a[t].nTr===n?[t]:[]:e?a[e.row]&&a[e.row].nTr===n.parentNode?[e.row]:[]:(t=R(n).closest("*[data-dt-row]")).length?[t.data("dt-row")]:[]}return"string"==typeof n&&"#"===n.charAt(0)&&(t=r.aIds[n.replace(/^#/,"")])!==P?[t.idx]:(t=Gt(zt(r.aoData,i,"nTr")),R(t).filter(n).map(function(){return this._DT_RowIndex}).toArray())},r=t,o=n);var r,o,i},1);return t.selector.rows=e,t.selector.opts=n,t}),Zt("rows().nodes()",function(){return this.iterator("row",function(t,e){return t.aoData[e].nTr||P},1)}),Zt("rows().data()",function(){return this.iterator(!0,"rows",function(t,e){return zt(t.aoData,e,"_aData")},1)}),Qt("rows().cache()","row().cache()",function(n){return this.iterator("row",function(t,e){return t=t.aoData[e],"search"===n?t._aFilterData:t._aSortData},1)}),Qt("rows().invalidate()","row().invalidate()",function(n){return this.iterator("row",function(t,e){r(t,e,n)})}),Qt("rows().indexes()","row().index()",function(){return this.iterator("row",function(t,e){return e},1)}),Qt("rows().ids()","row().id()",function(t){for(var e=[],n=this.context,a=0,r=n.length;a<r;a++)for(var o=0,i=this[a].length;o<i;o++){var s=n[a].rowIdFn(n[a].aoData[this[a][o]]._aData);e.push((!0===t?"#":"")+s)}return new ve(n,e)}),Qt("rows().remove()","row().remove()",function(){var c=this;return this.iterator("row",function(t,e,n){var a,r,o=t.aoData,i=o[e];o.splice(e,1);var s=0;for(a=o.length;s<a;s++){var l=o[s],u=l.anCells;if(null!==l.nTr&&(l.nTr._DT_RowIndex=s),null!==u)for(l=0,r=u.length;l<r;l++)u[l]._DT_CellIndex.row=s}d(t.aiDisplayMaster,e),d(t.aiDisplay,e),d(c[n],e,!1),0<t._iRecordsDisplay&&t._iRecordsDisplay--,Ot(t),(e=t.rowIdFn(i._aData))!==P&&delete t.aIds[e]}),this.iterator("table",function(t){for(var e=0,n=t.aoData.length;e<n;e++)t.aoData[e].idx=e}),this}),Zt("rows.add()",function(o){var t=this.iterator("table",function(t){var e,n=[],a=0;for(e=o.length;a<e;a++){var r=o[a];r.nodeName&&"TR"===r.nodeName.toUpperCase()?n.push(j(t,r)[0]):n.push(F(t,r))}return n},1),e=this.rows(-1);return e.pop(),R.merge(e,t),e}),Zt("row()",function(t,e){return _e(this.rows(t,e))}),Zt("row().data()",function(t){var e=this.context;if(t===P)return e.length&&this.length?e[0].aoData[this[0]]._aData:P;var n=e[0].aoData[this[0]];return n._aData=t,R.isArray(t)&&n.nTr.id&&p(e[0].rowId)(t,n.nTr.id),r(e[0],this[0],"data"),this}),Zt("row().node()",function(){var t=this.context;return t.length&&this.length&&t[0].aoData[this[0]].nTr||null}),Zt("row.add()",function(e){e instanceof R&&e.length&&(e=e[0]);var t=this.iterator("table",function(t){return e.nodeName&&"TR"===e.nodeName.toUpperCase()?j(t,e)[0]:F(t,e)});return this.row(t[0])});function Te(t,e){var n=t.context;n.length&&(t=n[0].aoData[e!==P?e:t[0]])&&t._details&&(t._details.remove(),t._detailsShow=P,t._details=P)}function Ce(t,e){var n=t.context;n.length&&t.length&&((t=n[0].aoData[t[0]])._details&&((t._detailsShow=e)?t._details.insertAfter(t.nTr):t._details.detach(),xe(n[0])))}var xe=function(r){var n=new ve(r),o=r.aoData;n.off("draw.dt.DT_details column-visibility.dt.DT_details destroy.dt.DT_details"),0<ie(o,"_details").length&&(n.on("draw.dt.DT_details",function(t,e){r===e&&n.rows({page:"current"}).eq(0).each(function(t){(t=o[t])._detailsShow&&t._details.insertAfter(t.nTr)})}),n.on("column-visibility.dt.DT_details",function(t,e,n,a){if(r===e)for(e=v(e),n=0,a=o.length;n<a;n++)(t=o[n])._details&&t._details.children("td[colspan]").attr("colspan",e)}),n.on("destroy.dt.DT_details",function(t,e){if(r===e)for(t=0,e=o.length;t<e;t++)o[t]._details&&Te(n,t)}))};Zt("row().child()",function(t,e){var r,n,o,i,a=this.context;return t===P?a.length&&this.length?a[0].aoData[this[0]]._details:P:(!0===t?this.child.show():!1===t?Te(this):a.length&&this.length&&(r=a[0],n=a[0].aoData[this[0]],o=[],(i=function(t,e){if(R.isArray(t)||t instanceof R)for(var n=0,a=t.length;n<a;n++)i(t[n],e);else t.nodeName&&"tr"===t.nodeName.toLowerCase()?o.push(t):(n=R("<tr><td/></tr>").addClass(e),R("td",n).addClass(e).html(t)[0].colSpan=v(r),o.push(n[0]))})(t,e),n._details&&n._details.detach(),n._details=R(o),n._detailsShow&&n._details.insertAfter(n.nTr)),this)}),Zt(["row().child.show()","row().child().show()"],function(t){return Ce(this,!0),this}),Zt(["row().child.hide()","row().child().hide()"],function(){return Ce(this,!1),this}),Zt(["row().child.remove()","row().child().remove()"],function(){return Te(this),this}),Zt("row().child.isShown()",function(){var t=this.context;return t.length&&this.length&&t[0].aoData[this[0]]._detailsShow||!1});function Ie(t,e,n,a,r){n=[],a=0;for(var o=r.length;a<o;a++)n.push(L(t,r[a],e));return n}var Ae=/^([^:]+):(name|visIdx|visible)$/;Zt("columns()",function(n,a){n===P?n="":R.isPlainObject(n)&&(a=n,n=""),a=De(a);var t=this.iterator("table",function(t){return e=n,i=a,s=(o=t).aoColumns,l=ie(s,"sName"),u=ie(s,"nTh"),Se("column",e,function(n){var t=Vt(n);if(""===n)return Jt(s.length);if(null!==t)return[0<=t?t:s.length+t];if("function"==typeof n){var a=we(o,i);return R.map(s,function(t,e){return n(e,Ie(o,e,0,0,a),u[e])?e:null})}var r="string"==typeof n?n.match(Ae):"";if(r)switch(r[2]){case"visIdx":case"visible":if((t=parseInt(r[1],10))<0){var e=R.map(s,function(t,e){return t.bVisible?e:null});return[e[e.length+t]]}return[N(o,t)];case"name":return R.map(l,function(t,e){return t===r[1]?e:null});default:return[]}return n.nodeName&&n._DT_CellIndex?[n._DT_CellIndex.column]:(t=R(u).filter(n).map(function(){return R.inArray(this,u)}).toArray()).length||!n.nodeName?t:(t=R(n).closest("*[data-dt-column]")).length?[t.data("dt-column")]:[]},o,i);var o,e,i,s,l,u},1);return t.selector.cols=n,t.selector.opts=a,t}),Qt("columns().header()","column().header()",function(t,e){return this.iterator("column",function(t,e){return t.aoColumns[e].nTh},1)}),Qt("columns().footer()","column().footer()",function(t,e){return this.iterator("column",function(t,e){return t.aoColumns[e].nTf},1)}),Qt("columns().data()","column().data()",function(){return this.iterator("column-rows",Ie,1)}),Qt("columns().dataSrc()","column().dataSrc()",function(){return this.iterator("column",function(t,e){return t.aoColumns[e].mData},1)}),Qt("columns().cache()","column().cache()",function(o){return this.iterator("column-rows",function(t,e,n,a,r){return zt(t.aoData,r,"search"===o?"_aFilterData":"_aSortData",e)},1)}),Qt("columns().nodes()","column().nodes()",function(){return this.iterator("column-rows",function(t,e,n,a,r){return zt(t.aoData,r,"anCells",e)},1)}),Qt("columns().visible()","column().visible()",function(l,n){var e=this,t=this.iterator("column",function(t,e){if(l===P)return t.aoColumns[e].bVisible;var n,a=t.aoColumns,r=a[e],o=t.aoData;if(l!==P&&r.bVisible!==l){if(l){var i=R.inArray(!0,ie(a,"bVisible"),e+1);for(a=0,n=o.length;a<n;a++){var s=o[a].nTr;t=o[a].anCells,s&&s.insertBefore(t[e],t[i]||null)}}else R(ie(t.aoData,"anCells",e)).detach();r.bVisible=l}});return l!==P&&this.iterator("table",function(t){M(t,t.aoHeader),M(t,t.aoFooter),t.aiDisplay.length||R(t.nTBody).find("td[colspan]").attr("colspan",v(t)),At(t),e.iterator("column",function(t,e){Ht(t,null,"column-visibility",[t,e,l,n])}),n!==P&&!n||e.columns.adjust()}),t}),Qt("columns().indexes()","column().index()",function(n){return this.iterator("column",function(t,e){return"visible"===n?u(t,e):e},1)}),Zt("columns.adjust()",function(){return this.iterator("table",function(t){k(t)},1)}),Zt("column.index()",function(t,e){if(0!==this.context.length){var n=this.context[0];if("fromVisible"===t||"toData"===t)return N(n,e);if("fromData"===t||"toVisible"===t)return u(n,e)}}),Zt("column()",function(t,e){return _e(this.columns(t,e))});Zt("cells()",function(b,t,m){if(R.isPlainObject(b)&&(b.row===P?(m=b,b=null):(m=t,t=null)),R.isPlainObject(t)&&(m=t,t=null),null===t||t===P)return this.iterator("table",function(t){return n=t,e=b,a=De(m),d=n.aoData,f=we(n,a),h=Gt(zt(d,f,"anCells")),p=R([].concat.apply([],h)),g=n.aoColumns.length,Se("cell",e,function(t){var e="function"==typeof t;if(null===t||t===P||e){for(o=[],i=0,s=f.length;i<s;i++)for(r=f[i],l=0;l<g;l++)u={row:r,column:l},e?(c=d[r],t(u,L(n,r,l),c.anCells?c.anCells[l]:null)&&o.push(u)):o.push(u);return o}return R.isPlainObject(t)?t.column!==P&&t.row!==P&&-1!==R.inArray(t.row,f)?[t]:[]:(e=p.filter(t).map(function(t,e){return{row:e._DT_CellIndex.row,column:e._DT_CellIndex.column}}).toArray()).length||!t.nodeName?e:(c=R(t).closest("*[data-dt-row]")).length?[{row:c.data("dt-row"),column:c.data("dt-column")}]:[]},n,a);var n,e,a,r,o,i,s,l,u,c,d,f,h,p,g});var n,a,r,o,e=m?{page:m.page,order:m.order,search:m.search}:{},i=this.columns(t,e),s=this.rows(b,e);return e=this.iterator("table",function(t,e){for(t=[],n=0,a=s[e].length;n<a;n++)for(r=0,o=i[e].length;r<o;r++)t.push({row:s[e][n],column:i[e][r]});return t},1),e=m&&m.selected?this.cells(e,m):e,R.extend(e.selector,{cols:t,rows:b,opts:m}),e}),Qt("cells().nodes()","cell().node()",function(){return this.iterator("cell",function(t,e,n){return(t=t.aoData[e])&&t.anCells?t.anCells[n]:P},1)}),Zt("cells().data()",function(){return this.iterator("cell",function(t,e,n){return L(t,e,n)},1)}),Qt("cells().cache()","cell().cache()",function(a){return a="search"===a?"_aFilterData":"_aSortData",this.iterator("cell",function(t,e,n){return t.aoData[e][a][n]},1)}),Qt("cells().render()","cell().render()",function(a){return this.iterator("cell",function(t,e,n){return L(t,e,n,a)},1)}),Qt("cells().indexes()","cell().index()",function(){return this.iterator("cell",function(t,e,n){return{row:e,column:n,columnVisible:u(t,n)}},1)}),Qt("cells().invalidate()","cell().invalidate()",function(a){return this.iterator("cell",function(t,e,n){r(t,e,a,n)})}),Zt("cell()",function(t,e,n){return _e(this.cells(t,e,n))}),Zt("cell().data()",function(t){var e=this.context,n=this[0];return t===P?e.length&&n.length?L(e[0],n[0].row,n[0].column):P:(a(e[0],n[0].row,n[0].column,t),r(e[0],n[0].row,"data",n[0].column),this)}),Zt("order()",function(e,t){var n=this.context;return e===P?0!==n.length?n[0].aaSorting:P:("number"==typeof e?e=[[e,t]]:e.length&&!R.isArray(e[0])&&(e=Array.prototype.slice.call(arguments)),this.iterator("table",function(t){t.aaSorting=e.slice()}))}),Zt("order.listener()",function(e,n,a){return this.iterator("table",function(t){Ct(t,e,n,a)})}),Zt("order.fixed()",function(e){if(e)return this.iterator("table",function(t){t.aaSortingFixed=R.extend(!0,{},e)});var t=this.context;return t=t.length?t[0].aaSortingFixed:P,R.isArray(t)?{pre:t}:t}),Zt(["columns().order()","column().order()"],function(a){var r=this;return this.iterator("table",function(t,e){var n=[];R.each(r[e],function(t,e){n.push([e,a])}),t.aaSorting=n})}),Zt("search()",function(e,n,a,r){var t=this.context;return e===P?0!==t.length?t[0].oPreviousSearch.sSearch:P:this.iterator("table",function(t){t.oFeatures.bFilter&&J(t,R.extend({},t.oPreviousSearch,{sSearch:e+"",bRegex:null!==n&&n,bSmart:null===a||a,bCaseInsensitive:null===r||r}),1)})}),Qt("columns().search()","column().search()",function(a,r,o,i){return this.iterator("column",function(t,e){var n=t.aoPreSearchCols;if(a===P)return n[e].sSearch;t.oFeatures.bFilter&&(R.extend(n[e],{sSearch:a+"",bRegex:null!==r&&r,bSmart:null===o||o,bCaseInsensitive:null===i||i}),J(t,t.oPreviousSearch,1))})}),Zt("state()",function(){return this.context.length?this.context[0].oSavedState:null}),Zt("state.clear()",function(){return this.iterator("table",function(t){t.fnStateSaveCallback.call(t.oInstance,t,{})})}),Zt("state.loaded()",function(){return this.context.length?this.context[0].oLoadedState:null}),Zt("state.save()",function(){return this.iterator("table",function(t){At(t)})}),Kt.versionCheck=Kt.fnVersionCheck=function(t){for(var e,n,a=Kt.version.split("."),r=0,o=(t=t.split(".")).length;r<o;r++)if((e=parseInt(a[r],10)||0)!==(n=parseInt(t[r],10)||0))return n<e;return!0},Kt.isDataTable=Kt.fnIsDataTable=function(t){var a=R(t).get(0),r=!1;return t instanceof Kt.Api||(R.each(Kt.settings,function(t,e){t=e.nScrollHead?R("table",e.nScrollHead)[0]:null;var n=e.nScrollFoot?R("table",e.nScrollFoot)[0]:null;e.nTable!==a&&t!==a&&n!==a||(r=!0)}),r)},Kt.tables=Kt.fnTables=function(e){var t=!1;R.isPlainObject(e)&&(t=e.api,e=e.visible);var n=R.map(Kt.settings,function(t){if(!e||e&&R(t.nTable).is(":visible"))return t.nTable});return t?new ve(n):n},Kt.camelToHungarian=S,Zt("$()",function(t,e){return e=this.rows(e).nodes(),e=R(e),R([].concat(e.filter(t).toArray(),e.find(t).toArray()))}),R.each(["on","one","off"],function(t,n){Zt(n+"()",function(){var t=Array.prototype.slice.call(arguments);t[0]=R.map(t[0].split(/\s/),function(t){return t.match(/\.dt\b/)?t:t+".dt"}).join(" ");var e=R(this.tables().nodes());return e[n].apply(e,t),this})}),Zt("clear()",function(){return this.iterator("table",function(t){l(t)})}),Zt("settings()",function(){return new ve(this.context,this.context)}),Zt("init()",function(){var t=this.context;return t.length?t[0].oInit:null}),Zt("data()",function(){return this.iterator("table",function(t){return ie(t.aoData,"_aData")}).flatten()}),Zt("destroy()",function(d){return d=d||!1,this.iterator("table",function(e){var t=e.nTableWrapper.parentNode,n=e.oClasses,a=e.nTable,r=e.nTBody,o=e.nTHead,i=e.nTFoot,s=R(a);r=R(r);var l,u=R(e.nTableWrapper),c=R.map(e.aoData,function(t){return t.nTr});e.bDestroying=!0,Ht(e,"aoDestroyCallback","destroy",[e]),d||new ve(e).columns().visible(!0),u.off(".DT").find(":not(tbody *)").off(".DT"),R(m).off(".DT-"+e.sInstance),a!=o.parentNode&&(s.children("thead").detach(),s.append(o)),i&&a!=i.parentNode&&(s.children("tfoot").detach(),s.append(i)),e.aaSorting=[],e.aaSortingFixed=[],xt(e),R(c).removeClass(e.asStripeClasses.join(" ")),R("th, td",o).removeClass(n.sSortable+" "+n.sSortableAsc+" "+n.sSortableDesc+" "+n.sSortableNone),r.children().detach(),r.append(c),s[o=d?"remove":"detach"](),u[o](),!d&&t&&(t.insertBefore(a,e.nTableReinsertBefore),s.css("width",e.sDestroyWidth).removeClass(n.sTable),(l=e.asDestroyStripes.length)&&r.children().each(function(t){R(this).addClass(e.asDestroyStripes[t%l])})),-1!==(t=R.inArray(e,Kt.settings))&&Kt.settings.splice(t,1)})}),R.each(["column","row","cell"],function(t,l){Zt(l+"s().every()",function(o){var i=this.selector.opts,s=this;return this.iterator(l,function(t,e,n,a,r){o.call(s[l](e,"cell"===l?n:i,"cell"===l?i:P),e,n,a,r)})})}),Zt("i18n()",function(t,e,n){var a=this.context[0];return(t=H(t)(a.oLanguage))===P&&(t=e),n!==P&&R.isPlainObject(t)&&(t=t[n]!==P?t[n]:t._),t.replace("%d",n)}),Kt.version="1.10.20",Kt.settings=[],Kt.models={},Kt.models.oSearch={bCaseInsensitive:!0,sSearch:"",bRegex:!1,bSmart:!0},Kt.models.oRow={nTr:null,anCells:null,_aData:[],_aSortData:null,_aFilterData:null,_sFilterRow:null,_sRowStripe:"",src:null,idx:-1},Kt.models.oColumn={idx:null,aDataSort:null,asSorting:null,bSearchable:null,bSortable:null,bVisible:null,_sManualType:null,_bAttrSrc:!1,fnCreatedCell:null,fnGetData:null,fnSetData:null,mData:null,mRender:null,nTh:null,nTf:null,sClass:null,sContentPadding:null,sDefaultContent:null,sName:null,sSortDataType:"std",sSortingClass:null,sSortingClassJUI:null,sTitle:null,sType:null,sWidth:null,sWidthOrig:null},Kt.defaults={aaData:null,aaSorting:[[0,"asc"]],aaSortingFixed:[],ajax:null,aLengthMenu:[10,25,50,100],aoColumns:null,aoColumnDefs:null,aoSearchCols:[],asStripeClasses:null,bAutoWidth:!0,bDeferRender:!1,bDestroy:!1,bFilter:!0,bInfo:!0,bLengthChange:!0,bPaginate:!0,bProcessing:!1,bRetrieve:!1,bScrollCollapse:!1,bServerSide:!1,bSort:!0,bSortMulti:!0,bSortCellsTop:!1,bSortClasses:!0,bStateSave:!1,fnCreatedRow:null,fnDrawCallback:null,fnFooterCallback:null,fnFormatNumber:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,this.oLanguage.sThousands)},fnHeaderCallback:null,fnInfoCallback:null,fnInitComplete:null,fnPreDrawCallback:null,fnRowCallback:null,fnServerData:null,fnServerParams:null,fnStateLoadCallback:function(t){try{return JSON.parse((-1===t.iStateDuration?sessionStorage:localStorage).getItem("DataTables_"+t.sInstance+"_"+location.pathname))}catch(t){}},fnStateLoadParams:null,fnStateLoaded:null,fnStateSaveCallback:function(t,e){try{(-1===t.iStateDuration?sessionStorage:localStorage).setItem("DataTables_"+t.sInstance+"_"+location.pathname,JSON.stringify(e))}catch(t){}},fnStateSaveParams:null,iStateDuration:7200,iDeferLoading:null,iDisplayLength:10,iDisplayStart:0,iTabIndex:0,oClasses:{},oLanguage:{oAria:{sSortAscending:": activate to sort column ascending",sSortDescending:": activate to sort column descending"},oPaginate:{sFirst:"First",sLast:"Last",sNext:"Next",sPrevious:"Previous"},sEmptyTable:"No data available in table",sInfo:"Showing _START_ to _END_ of _TOTAL_ entries",sInfoEmpty:"Showing 0 to 0 of 0 entries",sInfoFiltered:"(filtered from _MAX_ total entries)",sInfoPostFix:"",sDecimal:"",sThousands:",",sLengthMenu:"Show _MENU_ entries",sLoadingRecords:"Loading...",sProcessing:"Processing...",sSearch:"Search:",sSearchPlaceholder:"",sUrl:"",sZeroRecords:"No matching records found"},oSearch:R.extend({},Kt.models.oSearch),sAjaxDataProp:"data",sAjaxSource:null,sDom:"lfrtip",searchDelay:null,sPaginationType:"simple_numbers",sScrollX:"",sScrollXInner:"",sScrollY:"",sServerMethod:"GET",renderer:null,rowId:"DT_RowId"},i(Kt.defaults),Kt.defaults.column={aDataSort:null,iDataSort:-1,asSorting:["asc","desc"],bSearchable:!0,bSortable:!0,bVisible:!0,fnCreatedCell:null,mData:null,mRender:null,sCellType:"td",sClass:"",sContentPadding:"",sDefaultContent:null,sName:"",sSortDataType:"std",sTitle:null,sType:null,sWidth:null},i(Kt.defaults.column),Kt.models.oSettings={oFeatures:{bAutoWidth:null,bDeferRender:null,bFilter:null,bInfo:null,bLengthChange:null,bPaginate:null,bProcessing:null,bServerSide:null,bSort:null,bSortMulti:null,bSortClasses:null,bStateSave:null},oScroll:{bCollapse:null,iBarWidth:0,sX:null,sXInner:null,sY:null},oLanguage:{fnInfoCallback:null},oBrowser:{bScrollOversize:!1,bScrollbarLeft:!1,bBounding:!1,barWidth:0},ajax:null,aanFeatures:[],aoData:[],aiDisplay:[],aiDisplayMaster:[],aIds:{},aoColumns:[],aoHeader:[],aoFooter:[],oPreviousSearch:{},aoPreSearchCols:[],aaSorting:null,aaSortingFixed:[],asStripeClasses:null,asDestroyStripes:[],sDestroyWidth:0,aoRowCallback:[],aoHeaderCallback:[],aoFooterCallback:[],aoDrawCallback:[],aoRowCreatedCallback:[],aoPreDrawCallback:[],aoInitComplete:[],aoStateSaveParams:[],aoStateLoadParams:[],aoStateLoaded:[],sTableId:"",nTable:null,nTHead:null,nTFoot:null,nTBody:null,nTableWrapper:null,bDeferLoading:!1,bInitialised:!1,aoOpenRows:[],sDom:null,searchDelay:null,sPaginationType:"two_button",iStateDuration:0,aoStateSave:[],aoStateLoad:[],oSavedState:null,oLoadedState:null,sAjaxSource:null,sAjaxDataProp:null,bAjaxDataGet:!0,jqXHR:null,json:P,oAjaxData:P,fnServerData:null,aoServerParams:[],sServerMethod:null,fnFormatNumber:null,aLengthMenu:null,iDraw:0,bDrawing:!1,iDrawError:-1,_iDisplayLength:10,_iDisplayStart:0,_iRecordsTotal:0,_iRecordsDisplay:0,oClasses:{},bFiltered:!1,bSorted:!1,bSortCellsTop:null,oInit:null,aoDestroyCallback:[],fnRecordsTotal:function(){return"ssp"==Wt(this)?1*this._iRecordsTotal:this.aiDisplayMaster.length},fnRecordsDisplay:function(){return"ssp"==Wt(this)?1*this._iRecordsDisplay:this.aiDisplay.length},fnDisplayEnd:function(){var t=this._iDisplayLength,e=this._iDisplayStart,n=e+t,a=this.aiDisplay.length,r=this.oFeatures,o=r.bPaginate;return r.bServerSide?!1===o||-1===t?e+a:Math.min(e+t,this._iRecordsDisplay):!o||a<n||-1===t?a:n},oInstance:null,sInstance:null,iTabIndex:0,nScrollHead:null,nScrollFoot:null,aLastSort:[],oPlugins:{},rowIdFn:null,rowId:null},Kt.ext=Yt={buttons:{},classes:{},builder:"dt/dt-1.10.20/r-2.2.3",errMode:"alert",feature:[],search:[],selector:{cell:[],column:[],row:[]},internal:{},legacy:{ajax:null},pager:{},renderer:{pageButton:{},header:{}},order:{},type:{detect:[],search:{},order:{}},_unique:0,fnVersionCheck:Kt.fnVersionCheck,iApiIndex:0,oJUIClasses:{},sVersion:Kt.version},R.extend(Yt,{afnFiltering:Yt.search,aTypes:Yt.type.detect,ofnSearch:Yt.type.search,oSort:Yt.type.order,afnSortData:Yt.order,aoFeatures:Yt.feature,oApi:Yt.internal,oStdClasses:Yt.classes,oPagination:Yt.pager}),R.extend(Kt.ext.classes,{sTable:"dataTable",sNoFooter:"no-footer",sPageButton:"paginate_button",sPageButtonActive:"current",sPageButtonDisabled:"disabled",sStripeOdd:"odd",sStripeEven:"even",sRowEmpty:"dataTables_empty",sWrapper:"dataTables_wrapper",sFilter:"dataTables_filter",sInfo:"dataTables_info",sPaging:"dataTables_paginate paging_",sLength:"dataTables_length",sProcessing:"dataTables_processing",sSortAsc:"sorting_asc",sSortDesc:"sorting_desc",sSortable:"sorting",sSortableAsc:"sorting_asc_disabled",sSortableDesc:"sorting_desc_disabled",sSortableNone:"sorting_disabled",sSortColumn:"sorting_",sFilterInput:"",sLengthSelect:"",sScrollWrapper:"dataTables_scroll",sScrollHead:"dataTables_scrollHead",sScrollHeadInner:"dataTables_scrollHeadInner",sScrollBody:"dataTables_scrollBody",sScrollFoot:"dataTables_scrollFoot",sScrollFootInner:"dataTables_scrollFootInner",sHeaderTH:"",sFooterTH:"",sSortJUIAsc:"",sSortJUIDesc:"",sSortJUI:"",sSortJUIAscAllowed:"",sSortJUIDescAllowed:"",sSortJUIWrapper:"",sSortIcon:"",sJUIHeader:"",sJUIFooter:""});var Fe=Kt.ext.pager;R.extend(Fe,{simple:function(t,e){return["previous","next"]},full:function(t,e){return["first","previous","next","last"]},numbers:function(t,e){return[Et(t,e)]},simple_numbers:function(t,e){return["previous",Et(t,e),"next"]},full_numbers:function(t,e){return["first","previous",Et(t,e),"next","last"]},first_last_numbers:function(t,e){return["first",Et(t,e),"last"]},_numbers:Et,numbers_length:7}),R.extend(!0,Kt.ext.renderer,{pageButton:{_:function(l,t,u,e,c,d){var f,h,p=l.oClasses,g=l.oLanguage.oPaginate,b=l.oLanguage.oAria.paginate||{},m=0,v=function(t,e){function n(t){ct(l,t.data.action,!0)}var a,r=p.sPageButtonDisabled,o=0;for(a=e.length;o<a;o++){var i=e[o];if(R.isArray(i)){var s=R("<"+(i.DT_el||"div")+"/>").appendTo(t);v(s,i)}else{switch(f=null,h=i,s=l.iTabIndex,i){case"ellipsis":t.append('<span class="ellipsis">&#x2026;</span>');break;case"first":f=g.sFirst,0===c&&(s=-1,h+=" "+r);break;case"previous":f=g.sPrevious,0===c&&(s=-1,h+=" "+r);break;case"next":f=g.sNext,c===d-1&&(s=-1,h+=" "+r);break;case"last":f=g.sLast,c===d-1&&(s=-1,h+=" "+r);break;default:f=i+1,h=c===i?p.sPageButtonActive:""}null!==f&&(kt(s=R("<a>",{class:p.sPageButton+" "+h,"aria-controls":l.sTableId,"aria-label":b[i],"data-dt-idx":m,tabindex:s,id:0===u&&"string"==typeof i?l.sTableId+"_"+i:null}).html(f).appendTo(t),{action:i},n),m++)}}};try{var n=R(t).find(y.activeElement).data("dt-idx")}catch(t){}v(R(t).empty(),e),n!==P&&R(t).find("[data-dt-idx="+n+"]").focus()}}}),R.extend(Kt.ext.type.detect,[function(t,e){return e=e.oLanguage.sDecimal,qt(t,e)?"num"+e:null},function(t,e){return(!t||t instanceof Date||ae.test(t))&&(null!==(e=Date.parse(t))&&!isNaN(e)||Ut(t))?"date":null},function(t,e){return e=e.oLanguage.sDecimal,qt(t,e,!0)?"num-fmt"+e:null},function(t,e){return e=e.oLanguage.sDecimal,Xt(t,e)?"html-num"+e:null},function(t,e){return e=e.oLanguage.sDecimal,Xt(t,e,!0)?"html-num-fmt"+e:null},function(t,e){return Ut(t)||"string"==typeof t&&-1!==t.indexOf("<")?"html":null}]),R.extend(Kt.ext.type.search,{html:function(t){return Ut(t)?t:"string"==typeof t?t.replace(ee," ").replace(ne,""):""},string:function(t){return Ut(t)?t:"string"==typeof t?t.replace(ee," "):t}});var je=function(t,e,n,a){return 0===t||t&&"-"!==t?(e&&(t=$t(t,e)),t.replace&&(n&&(t=t.replace(n,"")),a&&(t=t.replace(a,""))),1*t):-1/0};R.extend(Yt.type.order,{"date-pre":function(t){return t=Date.parse(t),isNaN(t)?-1/0:t},"html-pre":function(t){return Ut(t)?"":t.replace?t.replace(/<.*?>/g,"").toLowerCase():t+""},"string-pre":function(t){return Ut(t)?"":"string"==typeof t?t.toLowerCase():t.toString?t.toString():""},"string-asc":function(t,e){return t<e?-1:e<t?1:0},"string-desc":function(t,e){return t<e?1:e<t?-1:0}}),Bt(""),R.extend(!0,Kt.ext.renderer,{header:{_:function(r,o,i,s){R(r.nTable).on("order.dt.DT",function(t,e,n,a){r===e&&(t=i.idx,o.removeClass(i.sSortingClass+" "+s.sSortAsc+" "+s.sSortDesc).addClass("asc"==a[t]?s.sSortAsc:"desc"==a[t]?s.sSortDesc:i.sSortingClass))})},jqueryui:function(r,o,i,s){R("<div/>").addClass(s.sSortJUIWrapper).append(o.contents()).append(R("<span/>").addClass(s.sSortIcon+" "+i.sSortingClassJUI)).appendTo(o),R(r.nTable).on("order.dt.DT",function(t,e,n,a){r===e&&(t=i.idx,o.removeClass(s.sSortAsc+" "+s.sSortDesc).addClass("asc"==a[t]?s.sSortAsc:"desc"==a[t]?s.sSortDesc:i.sSortingClass),o.find("span."+s.sSortIcon).removeClass(s.sSortJUIAsc+" "+s.sSortJUIDesc+" "+s.sSortJUI+" "+s.sSortJUIAscAllowed+" "+s.sSortJUIDescAllowed).addClass("asc"==a[t]?s.sSortJUIAsc:"desc"==a[t]?s.sSortJUIDesc:i.sSortingClassJUI))})}}});function Le(t){return"string"==typeof t?t.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):t}return Kt.render={number:function(a,r,o,i,s){return{display:function(t){if("number"!=typeof t&&"string"!=typeof t)return t;var e=t<0?"-":"",n=parseFloat(t);return isNaN(n)?Le(t):(n=n.toFixed(o),t=Math.abs(n),n=parseInt(t,10),t=o?r+(t-n).toFixed(o).substring(2):"",e+(i||"")+n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,a)+t+(s||""))}}},text:function(){return{display:Le,filter:Le}}},R.extend(Kt.ext.internal,{_fnExternApiFunc:e,_fnBuildAjax:$,_fnAjaxUpdate:q,_fnAjaxParameters:t,_fnAjaxUpdateDraw:o,_fnAjaxDataSrc:X,_fnAddColumn:C,_fnColumnOptions:x,_fnAdjustColumnSizing:k,_fnVisibleToColumnIndex:N,_fnColumnIndexToVisible:u,_fnVisbleColumns:v,_fnGetColumns:I,_fnColumnTypes:s,_fnApplyColumnDefs:A,_fnHungarianMap:i,_fnCamelToHungarian:S,_fnLanguageCompat:D,_fnBrowserDetect:T,_fnAddData:F,_fnAddTr:j,_fnNodeToDataIndex:function(t,e){return e._DT_RowIndex!==P?e._DT_RowIndex:null},_fnNodeToColumnIndex:function(t,e,n){return R.inArray(n,t.aoData[e].anCells)},_fnGetCellData:L,_fnSetCellData:a,_fnSplitObjNotation:c,_fnGetObjectDataFn:H,_fnSetObjectDataFn:p,_fnGetDataMaster:g,_fnClearTable:l,_fnDeleteIndex:d,_fnInvalidate:r,_fnGetRowElements:f,_fnCreateTr:b,_fnBuildHead:O,_fnDrawHead:M,_fnDraw:W,_fnReDraw:E,_fnAddOptionsHtml:B,_fnDetectHeader:U,_fnGetUniqueThs:V,_fnFeatureHtmlFilter:z,_fnFilterComplete:J,_fnFilterCustom:G,_fnFilterColumn:Y,_fnFilter:Z,_fnFilterCreateSearch:Q,_fnEscapeRegex:de,_fnFilterData:K,_fnFeatureHtmlInfo:nt,_fnUpdateInfo:at,_fnInfoMacros:rt,_fnInitialise:ot,_fnInitComplete:it,_fnLengthChange:st,_fnFeatureHtmlLength:lt,_fnFeatureHtmlPaginate:ut,_fnPageChange:ct,_fnFeatureHtmlProcessing:dt,_fnProcessingDisplay:ft,_fnFeatureHtmlTable:ht,_fnScrollDraw:pt,_fnApplyToChildren:gt,_fnCalculateColumnWidths:bt,_fnThrottle:ge,_fnConvertToWidth:mt,_fnGetWidestNode:vt,_fnGetMaxLenString:yt,_fnStringToCss:St,_fnSortFlatten:Dt,_fnSort:_t,_fnSortAria:wt,_fnSortListener:Tt,_fnSortAttachListener:Ct,_fnSortingClasses:xt,_fnSortData:It,_fnSaveState:At,_fnLoadState:Ft,_fnSettingsFromNode:jt,_fnLog:Lt,_fnMap:Rt,_fnBindAction:kt,_fnCallbackReg:Nt,_fnCallbackFire:Ht,_fnLengthOverflow:Ot,_fnRenderer:Mt,_fnDataSource:Wt,_fnRowAttributes:h,_fnExtend:Pt,_fnCalculateEnd:function(){}}),((R.fn.dataTable=Kt).$=R).fn.dataTableSettings=Kt.settings,R.fn.dataTableExt=Kt.ext,R.fn.DataTable=function(t){return R(this).dataTable(t).api()},R.each(Kt,function(t,e){R.fn.DataTable[t]=e}),R.fn.dataTable}),function(n){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return n(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,e&&e.fn.dataTable||(e=require("datatables.net")(t,e).$),n(e,t,t.document)}:n(jQuery,window,document)}(function(t,e,n,a){return t.fn.dataTable}),function(n){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(t){return n(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,e&&e.fn.dataTable||(e=require("datatables.net")(t,e).$),n(e,t,t.document)}:n(jQuery,window,document)}(function(d,f,i,u){function s(t,e,n){var a=e+"-"+n;if(l[a]){t=t.cell(e,n).node(),e=[];for(var r=0,o=(n=l[a][0].parentNode.childNodes).length;r<o;r++)e.push(n[r]);for(n=0,r=e.length;n<r;n++)t.appendChild(e[n]);l[a]=u}}var r=d.fn.dataTable,a=function(t,e){if(!r.versionCheck||!r.versionCheck("1.10.10"))throw"DataTables Responsive requires DataTables 1.10.10 or newer";this.s={dt:new r.Api(t),columns:[],current:[]},this.s.dt.settings()[0].responsive||(e&&"string"==typeof e.details?e.details={type:e.details}:e&&!1===e.details?e.details={type:!1}:e&&!0===e.details&&(e.details={type:"inline"}),this.c=d.extend(!0,{},a.defaults,r.defaults.responsive,e),(t.responsive=this)._constructor())};d.extend(a.prototype,{_constructor:function(){var n=this,e=this.s.dt,t=e.settings()[0],a=d(f).width();e.settings()[0]._responsive=this,d(f).on("resize.dtr orientationchange.dtr",r.util.throttle(function(){var t=d(f).width();t!==a&&(n._resize(),a=t)})),t.oApi._fnCallbackReg(t,"aoRowCreatedCallback",function(t){-1!==d.inArray(!1,n.s.current)&&d(">td, >th",t).each(function(t){t=e.column.index("toData",t),!1===n.s.current[t]&&d(this).css("display","none")})}),e.on("destroy.dtr",function(){e.off(".dtr"),d(e.table().body()).off(".dtr"),d(f).off("resize.dtr orientationchange.dtr"),d.each(n.s.current,function(t,e){!1===e&&n._setColumnVis(t,!0)})}),this.c.breakpoints.sort(function(t,e){return t.width<e.width?1:t.width>e.width?-1:0}),this._classLogic(),this._resizeAuto(),!1!==(t=this.c.details).type&&(n._detailsInit(),e.on("column-visibility.dtr",function(){n._timer&&clearTimeout(n._timer),n._timer=setTimeout(function(){n._timer=null,n._classLogic(),n._resizeAuto(),n._resize(),n._redrawChildren()},100)}),e.on("draw.dtr",function(){n._redrawChildren()}),d(e.table().node()).addClass("dtr-"+t.type)),e.on("column-reorder.dtr",function(){n._classLogic(),n._resizeAuto(),n._resize()}),e.on("column-sizing.dtr",function(){n._resizeAuto(),n._resize()}),e.on("preXhr.dtr",function(){var t=[];e.rows().every(function(){this.child.isShown()&&t.push(this.id(!0))}),e.one("draw.dtr",function(){n._resizeAuto(),n._resize(),e.rows(t).every(function(){n._detailsDisplay(this,!1)})})}),e.on("init.dtr",function(){n._resizeAuto(),n._resize(),d.inArray(!1,n.s.current)&&e.columns.adjust()}),this._resize()},_columnsVisiblity:function(n){var t,e,a=this.s.dt,r=this.s.columns,o=r.map(function(t,e){return{columnIdx:e,priority:t.priority}}).sort(function(t,e){return t.priority!==e.priority?t.priority-e.priority:t.columnIdx-e.columnIdx}),i=d.map(r,function(t,e){return!1===a.column(e).visible()?"not-visible":(!t.auto||null!==t.minWidth)&&(!0===t.auto?"-":-1!==d.inArray(n,t.includeIn))}),s=0;for(t=0,e=i.length;t<e;t++)!0===i[t]&&(s+=r[t].minWidth);for(t=(t=a.settings()[0].oScroll).sY||t.sX?t.iBarWidth:0,s=a.table().container().offsetWidth-t-s,t=0,e=i.length;t<e;t++)r[t].control&&(s-=r[t].minWidth);var l=!1;for(t=0,e=o.length;t<e;t++){var u=o[t].columnIdx;"-"===i[u]&&!r[u].control&&r[u].minWidth&&(l||s-r[u].minWidth<0?(l=!0,i[u]=!1):i[u]=!0,s-=r[u].minWidth)}for(o=!1,t=0,e=r.length;t<e;t++)if(!r[t].control&&!r[t].never&&!1===i[t]){o=!0;break}for(t=0,e=r.length;t<e;t++)r[t].control&&(i[t]=o),"not-visible"===i[t]&&(i[t]=!1);return-1===d.inArray(!0,i)&&(i[0]=!0),i},_classLogic:function(){function r(t,e){var n=i[t].includeIn;-1===d.inArray(e,n)&&n.push(e)}function s(t,e,n,a){if(n){if("max-"===n)for(a=o._find(e).width,e=0,n=l.length;e<n;e++)l[e].width<=a&&r(t,l[e].name);else if("min-"===n)for(a=o._find(e).width,e=0,n=l.length;e<n;e++)l[e].width>=a&&r(t,l[e].name);else if("not-"===n)for(e=0,n=l.length;e<n;e++)-1===l[e].name.indexOf(a)&&r(t,l[e].name)}else i[t].includeIn.push(e)}var o=this,l=this.c.breakpoints,a=this.s.dt,i=a.columns().eq(0).map(function(t){var e=this.column(t),n=e.header().className;return(t=a.settings()[0].aoColumns[t].responsivePriority)===u&&(t=(e=d(e.header()).data("priority"))!==u?1*e:1e4),{className:n,includeIn:[],auto:!1,control:!1,never:!!n.match(/\bnever\b/),priority:t}});i.each(function(t,r){for(var e=t.className.split(" "),o=!1,n=0,a=e.length;n<a;n++){var i=d.trim(e[n]);if("all"===i)return o=!0,void(t.includeIn=d.map(l,function(t){return t.name}));if("none"===i||t.never)return void(o=!0);if("control"===i)return o=!0,void(t.control=!0);d.each(l,function(t,e){var n=e.name.split("-"),a=i.match(RegExp("(min\\-|max\\-|not\\-)?("+n[0]+")(\\-[_a-zA-Z0-9])?"));a&&(o=!0,a[2]===n[0]&&a[3]==="-"+n[1]?s(r,e.name,a[1],a[2]+a[3]):a[2]!==n[0]||a[3]||s(r,e.name,a[1],a[2]))})}o||(t.auto=!0)}),this.s.columns=i},_detailsDisplay:function(t,e){var n=this,a=this.s.dt,r=this.c.details;if(r&&!1!==r.type){var o=r.display(t,e,function(){return r.renderer(a,t[0],n._detailsObj(t[0]))});!0!==o&&!1!==o||d(a.table().node()).triggerHandler("responsive-display.dt",[a,t,o,e])}},_detailsInit:function(){var n=this,a=this.s.dt,t=this.c.details;"inline"===t.type&&(t.target="td:first-child, th:first-child"),a.on("draw.dtr",function(){n._tabIndexes()}),n._tabIndexes(),d(a.table().body()).on("keyup.dtr","td, th",function(t){13===t.keyCode&&d(this).data("dtr-keyboard")&&d(this).click()});var r=t.target;d(a.table().body()).on("click.dtr mousedown.dtr mouseup.dtr","string"==typeof r?r:"td, th",function(t){if(d(a.table().node()).hasClass("collapsed")&&-1!==d.inArray(d(this).closest("tr").get(0),a.rows().nodes().toArray())){if("number"==typeof r){var e=r<0?a.columns().eq(0).length+r:r;if(a.cell(this).index().column!==e)return}e=a.row(d(this).closest("tr")),"click"===t.type?n._detailsDisplay(e,!1):"mousedown"===t.type?d(this).css("outline","none"):"mouseup"===t.type&&d(this).blur().css("outline","")}})},_detailsObj:function(n){var a=this,r=this.s.dt;return d.map(this.s.columns,function(t,e){if(!t.never&&!t.control)return{title:r.settings()[0].aoColumns[e].sTitle,data:r.cell(n,e).render(a.c.orthogonal),hidden:r.column(e).visible()&&!a.s.current[e],columnIndex:e,rowIndex:n}})},_find:function(t){for(var e=this.c.breakpoints,n=0,a=e.length;n<a;n++)if(e[n].name===t)return e[n]},_redrawChildren:function(){var n=this,a=this.s.dt;a.rows({page:"current"}).iterator("row",function(t,e){a.row(e),n._detailsDisplay(a.row(e),!0)})},_resize:function(){var t,n=this,e=this.s.dt,a=d(f).width(),r=this.c.breakpoints,o=r[0].name,i=this.s.columns,s=this.s.current.slice();for(t=r.length-1;0<=t;t--)if(a<=r[t].width){o=r[t].name;break}var l=this._columnsVisiblity(o);for(this.s.current=l,r=!1,t=0,a=i.length;t<a;t++)if(!1===l[t]&&!i[t].never&&!i[t].control&&!1==!e.column(t).visible()){r=!0;break}d(e.table().node()).toggleClass("collapsed",r);var u=!1,c=0;e.columns().eq(0).each(function(t,e){!0===l[e]&&c++,l[e]!==s[e]&&(u=!0,n._setColumnVis(t,l[e]))}),u&&(this._redrawChildren(),d(e.table().node()).trigger("responsive-resize.dt",[e,this.s.current]),0===e.page.info().recordsDisplay&&d("td",e.table().body()).eq(0).attr("colspan",c))},_resizeAuto:function(){var e=this.s.dt,n=this.s.columns;if(this.c.auto&&-1!==d.inArray(!0,d.map(n,function(t){return t.auto}))){d.isEmptyObject(l)||d.each(l,function(t){t=t.split("-"),s(e,1*t[0],1*t[1])}),e.table().node();var t=e.table().node().cloneNode(!1),a=d(e.table().header().cloneNode(!1)).appendTo(t),r=d(e.table().body()).clone(!1,!1).empty().appendTo(t),o=e.columns().header().filter(function(t){return e.column(t).visible()}).to$().clone(!1).css("display","table-cell").css("min-width",0);if(d(r).append(d(e.rows({page:"current"}).nodes()).clone(!1)).find("th, td").css("display",""),r=e.table().footer()){r=d(r.cloneNode(!1)).appendTo(t);var i=e.columns().footer().filter(function(t){return e.column(t).visible()}).to$().clone(!1).css("display","table-cell");d("<tr/>").append(i).appendTo(r)}d("<tr/>").append(o).appendTo(a),"inline"===this.c.details.type&&d(t).addClass("dtr-inline collapsed"),d(t).find("[name]").removeAttr("name"),d(t).css("position","relative"),(t=d("<div/>").css({width:1,height:1,overflow:"hidden",clear:"both"}).append(t)).insertBefore(e.table().node()),o.each(function(t){t=e.column.index("fromVisible",t),n[t].minWidth=this.offsetWidth||0}),t.remove()}},_setColumnVis:function(t,e){var n=this.s.dt,a=e?"":"none";d(n.column(t).header()).css("display",a),d(n.column(t).footer()).css("display",a),n.column(t).nodes().to$().css("display",a),d.isEmptyObject(l)||n.cells(null,t).indexes().each(function(t){s(n,t.row,t.column)})},_tabIndexes:function(){var t=this.s.dt,e=t.cells({page:"current"}).nodes().to$(),n=t.settings()[0],a=this.c.details.target;e.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]"),"number"==typeof a?t.cells(null,a,{page:"current"}).nodes().to$().attr("tabIndex",n.iTabIndex).data("dtr-keyboard",1):("td:first-child, th:first-child"===a&&(a=">td:first-child, >th:first-child"),d(a,t.rows({page:"current"}).nodes()).attr("tabIndex",n.iTabIndex).data("dtr-keyboard",1))}}),a.breakpoints=[{name:"desktop",width:1/0},{name:"tablet-l",width:1024},{name:"tablet-p",width:768},{name:"mobile-l",width:480},{name:"mobile-p",width:320}],a.display={childRow:function(t,e,n){return e?d(t.node()).hasClass("parent")?(t.child(n(),"child").show(),!0):void 0:t.child.isShown()?(t.child(!1),d(t.node()).removeClass("parent"),!1):(t.child(n(),"child").show(),d(t.node()).addClass("parent"),!0)},childRowImmediate:function(t,e,n){return!e&&t.child.isShown()||!t.responsive.hasHidden()?(t.child(!1),d(t.node()).removeClass("parent"),!1):(t.child(n(),"child").show(),d(t.node()).addClass("parent"),!0)},modal:function(o){return function(t,e,n){if(e)d("div.dtr-modal-content").empty().append(n());else{function a(){r.remove(),d(i).off("keypress.dtr")}var r=d('<div class="dtr-modal"/>').append(d('<div class="dtr-modal-display"/>').append(d('<div class="dtr-modal-content"/>').append(n())).append(d('<div class="dtr-modal-close">&times;</div>').click(function(){a()}))).append(d('<div class="dtr-modal-background"/>').click(function(){a()})).appendTo("body");d(i).on("keyup.dtr",function(t){27===t.keyCode&&(t.stopPropagation(),a())})}o&&o.header&&d("div.dtr-modal-content").prepend("<h2>"+o.header(t)+"</h2>")}}};var l={};a.renderer={listHiddenNodes:function(){return function(n,t,e){var a=d('<ul data-dtr-index="'+t+'" class="dtr-details"/>'),r=!1;return d.each(e,function(t,e){e.hidden&&(d('<li data-dtr-index="'+e.columnIndex+'" data-dt-row="'+e.rowIndex+'" data-dt-column="'+e.columnIndex+'"><span class="dtr-title">'+e.title+"</span> </li>").append(d('<span class="dtr-data"/>').append(function(t,e,n){var a=e+"-"+n;if(l[a])return l[a];var r=[];for(t=t.cell(e,n).node().childNodes,e=0,n=t.length;e<n;e++)r.push(t[e]);return l[a]=r}(n,e.rowIndex,e.columnIndex))).appendTo(a),r=!0)}),!!r&&a}},listHidden:function(){return function(t,e,n){return!!(t=d.map(n,function(t){return t.hidden?'<li data-dtr-index="'+t.columnIndex+'" data-dt-row="'+t.rowIndex+'" data-dt-column="'+t.columnIndex+'"><span class="dtr-title">'+t.title+'</span> <span class="dtr-data">'+t.data+"</span></li>":""}).join(""))&&d('<ul data-dtr-index="'+e+'" class="dtr-details"/>').append(t)}},tableAll:function(a){return a=d.extend({tableClass:""},a),function(t,e,n){return t=d.map(n,function(t){return'<tr data-dt-row="'+t.rowIndex+'" data-dt-column="'+t.columnIndex+'"><td>'+t.title+":</td> <td>"+t.data+"</td></tr>"}).join(""),d('<table class="'+a.tableClass+' dtr-details" width="100%"/>').append(t)}}},a.defaults={breakpoints:a.breakpoints,auto:!0,details:{display:a.display.childRow,renderer:a.renderer.listHidden(),target:0,type:"inline"},orthogonal:"display"};var t=d.fn.dataTable.Api;return t.register("responsive()",function(){return this}),t.register("responsive.index()",function(t){return{column:(t=d(t)).data("dtr-index"),row:t.parent().data("dtr-index")}}),t.register("responsive.rebuild()",function(){return this.iterator("table",function(t){t._responsive&&t._responsive._classLogic()})}),t.register("responsive.recalc()",function(){return this.iterator("table",function(t){t._responsive&&(t._responsive._resizeAuto(),t._responsive._resize())})}),t.register("responsive.hasHidden()",function(){var t=this.context[0];return!!t._responsive&&-1!==d.inArray(!1,t._responsive.s.current)}),t.registerPlural("columns().responsiveHidden()","column().responsiveHidden()",function(){return this.iterator("column",function(t,e){return!!t._responsive&&t._responsive.s.current[e]},1)}),a.version="2.2.3",d.fn.dataTable.Responsive=a,d.fn.DataTable.Responsive=a,d(i).on("preInit.dt.dtr",function(t,e){if("dt"===t.namespace&&(d(e.nTable).hasClass("responsive")||d(e.nTable).hasClass("dt-responsive")||e.oInit.responsive||r.defaults.responsive)){var n=e.oInit.responsive;!1!==n&&new a(e,d.isPlainObject(n)?n:{})}}),a}),function(n){"function"==typeof define&&define.amd?define(["jquery","datatables.net-dt","datatables.net-responsive"],function(t){return n(t,window,document)}):"object"==typeof exports?module.exports=function(t,e){return t=t||window,e&&e.fn.dataTable||(e=require("datatables.net-dt")(t,e).$),e.fn.dataTable.Responsive||require("datatables.net-responsive")(t,e),n(e,t.document)}:n(jQuery,window,document)}(function(t){return t.fn.dataTable});

/** @preserve
 *
 * slippry v1.4.0 - Responsive content slider for jQuery
 * http://slippry.com
 *
 * Authors: Lukas Jakob Hafner - @saftsaak
 *          Thomas Hurd - @SeenNotHurd
 *
 * Copyright 2016, booncon oy - http://booncon.com
 *
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
!function(a){"use strict";var b;b={slippryWrapper:'<div class="sy-box" />',slideWrapper:'<div class="sy-slides-wrap" />',slideCrop:'<div class="sy-slides-crop" />',boxClass:"sy-list",elements:"li",activeClass:"sy-active",fillerClass:"sy-filler",loadingClass:"sy-loading",adaptiveHeight:!0,start:1,loop:!0,captionsSrc:"img",captions:"overlay",captionsEl:".sy-caption",initSingle:!0,responsive:!0,preload:"visible",pager:!0,pagerClass:"sy-pager",controls:!0,controlClass:"sy-controls",prevClass:"sy-prev",prevText:"Previous",nextClass:"sy-next",nextText:"Next",hideOnEnd:!0,transition:"fade",kenZoom:120,slideMargin:0,transClass:"transition",speed:800,easing:"swing",continuous:!0,useCSS:!0,auto:!0,autoDirection:"next",autoHover:!0,autoHoverDelay:100,autoDelay:500,pause:4e3,onSliderLoad:function(){return this},onSlideBefore:function(){return this},onSlideAfter:function(){return this}},a.fn.slippry=function(c){var d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;return e=this,0===e.length?this:e.length>1?(e.each(function(){a(this).slippry(c)}),this):(d={},d.vars={},n=function(){var a,b,c;b=document.createElement("div"),c={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",MSTransition:"msTransitionEnd",OTransition:"oTransitionEnd",transition:"transitionEnd transitionend"};for(a in c)if(void 0!==b.style[a])return c[a]},w=function(){var a=document.createElement("div"),b=["Khtml","Ms","O","Moz","Webkit"],c=b.length;return function(d){if(d in a.style)return!0;for(d=d.replace(/^[a-z]/,function(a){return a.toUpperCase()});c--;)if(b[c]+d in a.style)return!0;return!1}}(),z=function(b,c){var d,e,f,g;return d=c.split("."),e=a(b),f="",g="",a.each(d,function(a,b){b.indexOf("#")>=0?f+=b.replace(/^#/,""):g+=b+" "}),f.length&&e.attr("id",f),g.length&&e.attr("class",a.trim(g)),e},A=function(){var a,b,c,e;c={},e={},a=100-d.settings.kenZoom,e.width=d.settings.kenZoom+"%",d.vars.active.index()%2===0?(e.left=a+"%",e.top=a+"%",c.left="0%",c.top="0%"):(e.left="0%",e.top="0%",c.left=a+"%",c.top=a+"%"),b=d.settings.pause+2*d.settings.speed,d.vars.active.css(e),d.vars.active.animate(c,{duration:b,easing:d.settings.easing,queue:!1})},l=function(){d.vars.fresh?(d.vars.slippryWrapper.removeClass(d.settings.loadingClass),d.vars.fresh=!1,d.settings.auto&&e.startAuto(),d.settings.useCSS||"kenburns"!==d.settings.transition||A(),d.settings.onSliderLoad.call(void 0,d.vars.active.index())):a("."+d.settings.fillerClass,d.vars.slideWrapper).addClass("ready")},q=function(b,c){var e,f,g;e=b/c,f=1/e*100+"%",g=a("."+d.settings.fillerClass,d.vars.slideWrapper),g.css({paddingTop:f}),l()},g=function(b){var c,d;void 0!==a("img",b).attr("src")?a("<img />").on("load",function(){c=b.width(),d=b.height(),q(c,d)}).attr("src",a("img",b).attr("src")):(c=b.width(),d=b.height(),q(c,d))},f=function(){if(0===a("."+d.settings.fillerClass,d.vars.slideWrapper).length&&d.vars.slideWrapper.append(a('<div class="'+d.settings.fillerClass+'" />')),d.settings.adaptiveHeight===!0)g(a("."+d.settings.activeClass,e));else{var b,c,f;c=0,f=0,a(d.vars.slides).each(function(){a(this).height()>c&&(b=a(this),c=b.height()),f+=1,f===d.vars.count&&(void 0===b&&(b=a(a(d.vars.slides)[0])),g(b))})}},p=function(){d.settings.pager&&(a("."+d.settings.pagerClass+" li",d.vars.slippryWrapper).removeClass(d.settings.activeClass),a(a("."+d.settings.pagerClass+" li",d.vars.slippryWrapper)[d.vars.active.index()]).addClass(d.settings.activeClass))},u=function(){!d.settings.loop&&d.settings.hideOnEnd&&(a("."+d.settings.prevClass,d.vars.slippryWrapper)[d.vars.first?"hide":"show"](),a("."+d.settings.nextClass,d.vars.slippryWrapper)[d.vars.last?"hide":"show"]())},i=function(){var b,c;d.settings.captions!==!1&&(b="img"!==d.settings.captionsSrc?d.vars.active.attr("title"):void 0!==a("img",d.vars.active).attr("title")?a("img",d.vars.active).attr("title"):a("img",d.vars.active).attr("alt"),c="custom"!==d.settings.captions?a(d.settings.captionsEl,d.vars.slippryWrapper):a(d.settings.captionsEl),void 0!==b&&""!==b?c.html(b).show():c.hide())},e.startAuto=function(){void 0===d.vars.timer&&void 0===d.vars.delay&&(d.vars.delay=window.setTimeout(function(){d.vars.autodelay=!1,d.vars.timer=window.setInterval(function(){d.vars.trigger="auto",t(d.settings.autoDirection)},d.settings.pause)},d.vars.autodelay?d.settings.autoHoverDelay:d.settings.autoDelay),d.settings.autoHover&&d.vars.slideWrapper.unbind("mouseenter").unbind("mouseleave").bind("mouseenter",function(){void 0!==d.vars.timer?(d.vars.hoverStop=!0,e.stopAuto()):d.vars.hoverStop=!1}).bind("mouseleave",function(){d.vars.hoverStop&&(d.vars.autodelay=!0,e.startAuto())}))},e.stopAuto=function(){window.clearInterval(d.vars.timer),d.vars.timer=void 0,window.clearTimeout(d.vars.delay),d.vars.delay=void 0},e.refresh=function(){d.vars.slides.removeClass(d.settings.activeClass),d.vars.active.addClass(d.settings.activeClass),d.settings.responsive?f():l(),u(),p(),i()},s=function(){e.refresh()},m=function(){d.vars.moving=!1,d.vars.active.removeClass(d.settings.transClass),d.vars.fresh||d.vars.old.removeClass("sy-ken"),d.vars.old.removeClass(d.settings.transClass),d.settings.onSlideAfter.call(void 0,d.vars.active,d.vars.old.index(),d.vars.active.index()),d.settings.auto&&(d.vars.hoverStop&&void 0!==d.vars.hoverStop||e.startAuto())},r=function(){var b,c,f,g,h,i,j;d.settings.onSlideBefore.call(void 0,d.vars.active,d.vars.old.index(),d.vars.active.index()),d.settings.transition!==!1?(d.vars.moving=!0,"fade"===d.settings.transition||"kenburns"===d.settings.transition?(d.vars.fresh?(d.settings.useCSS?d.vars.slides.css({transitionDuration:d.settings.speed+"ms",opacity:0}):d.vars.slides.css({opacity:0}),d.vars.active.css("opacity",1),"kenburns"===d.settings.transition&&d.settings.useCSS&&(h=d.settings.pause+2*d.settings.speed,d.vars.slides.css({animationDuration:h+"ms"}),d.vars.active.addClass("sy-ken")),m()):d.settings.useCSS?(d.vars.old.addClass(d.settings.transClass).css("opacity",0),d.vars.active.addClass(d.settings.transClass).css("opacity",1),"kenburns"===d.settings.transition&&d.vars.active.addClass("sy-ken"),a(window).off("focus").on("focus",function(){d.vars.moving&&d.vars.old.trigger(d.vars.transition)}),d.vars.old.one(d.vars.transition,function(){return m(),this})):("kenburns"===d.settings.transition&&A(),d.vars.old.addClass(d.settings.transClass).animate({opacity:0},d.settings.speed,d.settings.easing,function(){m()}),d.vars.active.addClass(d.settings.transClass).css("opacity",0).animate({opacity:1},d.settings.speed,d.settings.easing)),s()):("horizontal"===d.settings.transition||"vertical"===d.settings.transition)&&(i="horizontal"===d.settings.transition?"left":"top",b="-"+d.vars.active.index()*(100+d.settings.slideMargin)+"%",d.vars.fresh?(e.css(i,b),m()):(j={},d.settings.continuous&&(!d.vars.jump||"controls"!==d.vars.trigger&&"auto"!==d.vars.trigger||(c=!0,g=b,d.vars.first?(f=0,d.vars.active.css(i,d.vars.count*(100+d.settings.slideMargin)+"%"),b="-"+d.vars.count*(100+d.settings.slideMargin)+"%"):(f=(d.vars.count-1)*(100+d.settings.slideMargin)+"%",d.vars.active.css(i,-(100+d.settings.slideMargin)+"%"),b=100+d.settings.slideMargin+"%"))),d.vars.active.addClass(d.settings.transClass),d.settings.useCSS?(j[i]=b,j.transitionDuration=d.settings.speed+"ms",e.addClass(d.settings.transition),e.css(j),a(window).off("focus").on("focus",function(){d.vars.moving&&e.trigger(d.vars.transition)}),e.one(d.vars.transition,function(){return e.removeClass(d.settings.transition),c&&(d.vars.active.css(i,f),j[i]=g,j.transitionDuration="0ms",e.css(j)),m(),this})):(j[i]=b,e.stop().animate(j,d.settings.speed,d.settings.easing,function(){return c&&(d.vars.active.css(i,f),e.css(i,g)),m(),this}))),s())):(s(),m())},v=function(a){d.vars.first=d.vars.last=!1,"prev"===a||0===a?d.vars.first=!0:("next"===a||a===d.vars.count-1)&&(d.vars.last=!0)},t=function(b){var c,f;d.vars.moving||("auto"!==d.vars.trigger&&e.stopAuto(),c=d.vars.active.index(),"prev"===b?(f=b,c>0?b=c-1:d.settings.loop&&(b=d.vars.count-1)):"next"===b?(f=b,c<d.vars.count-1?b=c+1:d.settings.loop&&(b=0)):(b-=1,f=c>b?"prev":"next"),d.vars.jump=!1,"prev"===b||"next"===b||b===c&&!d.vars.fresh||(v(b),d.vars.old=d.vars.active,d.vars.active=a(d.vars.slides[b]),(0===c&&"prev"===f||c===d.vars.count-1&&"next"===f)&&(d.vars.jump=!0),r()))},e.goToSlide=function(a){d.vars.trigger="external",t(a)},e.goToNextSlide=function(){d.vars.trigger="external",t("next")},e.goToPrevSlide=function(){d.vars.trigger="external",t("prev")},j=function(){if(d.settings.pager&&d.vars.count>1){var b,c,e;for(b=d.vars.slides.length,e=a('<ul class="'+d.settings.pagerClass+'" />'),c=1;b+1>c;c+=1)e.append(a("<li />").append(a('<a href="#'+c+'">'+c+"</a>")));d.vars.slippryWrapper.append(e),a("."+d.settings.pagerClass+" a",d.vars.slippryWrapper).click(function(){return d.vars.trigger="pager",t(parseInt(this.hash.split("#")[1],10)),!1}),p()}},k=function(){d.settings.controls&&d.vars.count>1&&(d.vars.slideWrapper.append(a('<ul class="'+d.settings.controlClass+'" />').append('<li class="'+d.settings.prevClass+'"><a href="#prev">'+d.settings.prevText+"</a></li>").append('<li class="'+d.settings.nextClass+'"><a href="#next">'+d.settings.nextText+"</a></li>")),a("."+d.settings.controlClass+" a",d.vars.slippryWrapper).click(function(){return d.vars.trigger="controls",t(this.hash.split("#")[1]),!1}),u())},o=function(){d.settings.captions!==!1&&("overlay"===d.settings.captions?d.vars.slideWrapper.append(a('<div class="sy-caption-wrap" />').html(z("<div />",d.settings.captionsEl))):"below"===d.settings.captions&&d.vars.slippryWrapper.append(a('<div class="sy-caption-wrap" />').html(z("<div />",d.settings.captionsEl))))},y=function(){t(d.vars.active.index()+1)},x=function(b){var c,e,f,g;return g="all"===d.settings.preload?b:d.vars.active,f=a("img, iframe",g),c=f.length,0===c?void y():(e=0,void f.each(function(){a(this).one("load error",function(){++e===c&&y()}).each(function(){this.complete&&a(this).trigger("load")})}))},e.getCurrentSlide=function(){return d.vars.active},e.getSlideCount=function(){return d.vars.count},e.destroySlider=function(){d.vars.fresh===!1&&(e.stopAuto(),d.vars.moving=!1,d.vars.slides.each(function(){void 0!==a(this).data("sy-cssBckup")?a(this).attr("style",a(this).data("sy-cssBckup")):a(this).removeAttr("style"),void 0!==a(this).data("sy-classBckup")?a(this).attr("class",a(this).data("sy-classBckup")):a(this).removeAttr("class")}),void 0!==e.data("sy-cssBckup")?e.attr("style",e.data("sy-cssBckup")):e.removeAttr("style"),void 0!==e.data("sy-classBckup")?e.attr("class",e.data("sy-classBckup")):e.removeAttr("class"),d.vars.slippryWrapper.before(e),d.vars.slippryWrapper.remove(),d.vars.fresh=void 0)},e.reloadSlider=function(){e.destroySlider(),h()},h=function(){var f;return d.settings=a.extend({},b,c),d.vars.slides=a(d.settings.elements,e),d.vars.count=d.vars.slides.length,d.settings.useCSS&&(w("transition")||(d.settings.useCSS=!1),d.vars.transition=n()),e.data("sy-cssBckup",e.attr("style")),e.data("sy-classBackup",e.attr("class")),e.addClass(d.settings.boxClass).wrap(d.settings.slippryWrapper).wrap(d.settings.slideWrapper).wrap(d.settings.slideCrop),d.vars.slideWrapper=e.parent().parent(),d.vars.slippryWrapper=d.vars.slideWrapper.parent().addClass(d.settings.loadingClass),d.vars.fresh=!0,d.vars.slides.each(function(){a(this).addClass("sy-slide "+d.settings.transition),d.settings.useCSS&&a(this).addClass("useCSS"),"horizontal"===d.settings.transition?a(this).css("left",a(this).index()*(100+d.settings.slideMargin)+"%"):"vertical"===d.settings.transition&&a(this).css("top",a(this).index()*(100+d.settings.slideMargin)+"%")}),d.vars.count>1||d.settings.initSingle?(-1===a("."+d.settings.activeClass,e).index()?(f="random"===d.settings.start?Math.round(Math.random()*(d.vars.count-1)):d.settings.start>0&&d.settings.start<=d.vars.count?d.settings.start-1:0,d.vars.active=a(d.vars.slides[f]).addClass(d.settings.activeClass)):d.vars.active=a("."+d.settings.activeClass,e),k(),j(),o(),x(d.vars.slides),void 0):this},h(),this)}}(jQuery);

/*! Magnific Popup - v1.1.0 - 2016-02-20
* http://dimsemenov.com/plugins/magnific-popup/
* Copyright (c) 2016 Dmitry Semenov; */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):window.jQuery||window.Zepto)}(function(a){var b,c,d,e,f,g,h="Close",i="BeforeClose",j="AfterClose",k="BeforeAppend",l="MarkupParse",m="Open",n="Change",o="mfp",p="."+o,q="mfp-ready",r="mfp-removing",s="mfp-prevent-close",t=function(){},u=!!window.jQuery,v=a(window),w=function(a,c){b.ev.on(o+a+p,c)},x=function(b,c,d,e){var f=document.createElement("div");return f.className="mfp-"+b,d&&(f.innerHTML=d),e?c&&c.appendChild(f):(f=a(f),c&&f.appendTo(c)),f},y=function(c,d){b.ev.triggerHandler(o+c,d),b.st.callbacks&&(c=c.charAt(0).toLowerCase()+c.slice(1),b.st.callbacks[c]&&b.st.callbacks[c].apply(b,a.isArray(d)?d:[d]))},z=function(c){return c===g&&b.currTemplate.closeBtn||(b.currTemplate.closeBtn=a(b.st.closeMarkup.replace("%title%",b.st.tClose)),g=c),b.currTemplate.closeBtn},A=function(){a.magnificPopup.instance||(b=new t,b.init(),a.magnificPopup.instance=b)},B=function(){var a=document.createElement("p").style,b=["ms","O","Moz","Webkit"];if(void 0!==a.transition)return!0;for(;b.length;)if(b.pop()+"Transition"in a)return!0;return!1};t.prototype={constructor:t,init:function(){var c=navigator.appVersion;b.isLowIE=b.isIE8=document.all&&!document.addEventListener,b.isAndroid=/android/gi.test(c),b.isIOS=/iphone|ipad|ipod/gi.test(c),b.supportsTransition=B(),b.probablyMobile=b.isAndroid||b.isIOS||/(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),d=a(document),b.popupsCache={}},open:function(c){var e;if(c.isObj===!1){b.items=c.items.toArray(),b.index=0;var g,h=c.items;for(e=0;e<h.length;e++)if(g=h[e],g.parsed&&(g=g.el[0]),g===c.el[0]){b.index=e;break}}else b.items=a.isArray(c.items)?c.items:[c.items],b.index=c.index||0;if(b.isOpen)return void b.updateItemHTML();b.types=[],f="",c.mainEl&&c.mainEl.length?b.ev=c.mainEl.eq(0):b.ev=d,c.key?(b.popupsCache[c.key]||(b.popupsCache[c.key]={}),b.currTemplate=b.popupsCache[c.key]):b.currTemplate={},b.st=a.extend(!0,{},a.magnificPopup.defaults,c),b.fixedContentPos="auto"===b.st.fixedContentPos?!b.probablyMobile:b.st.fixedContentPos,b.st.modal&&(b.st.closeOnContentClick=!1,b.st.closeOnBgClick=!1,b.st.showCloseBtn=!1,b.st.enableEscapeKey=!1),b.bgOverlay||(b.bgOverlay=x("bg").on("click"+p,function(){b.close()}),b.wrap=x("wrap").attr("tabindex",-1).on("click"+p,function(a){b._checkIfClose(a.target)&&b.close()}),b.container=x("container",b.wrap)),b.contentContainer=x("content"),b.st.preloader&&(b.preloader=x("preloader",b.container,b.st.tLoading));var i=a.magnificPopup.modules;for(e=0;e<i.length;e++){var j=i[e];j=j.charAt(0).toUpperCase()+j.slice(1),b["init"+j].call(b)}y("BeforeOpen"),b.st.showCloseBtn&&(b.st.closeBtnInside?(w(l,function(a,b,c,d){c.close_replaceWith=z(d.type)}),f+=" mfp-close-btn-in"):b.wrap.append(z())),b.st.alignTop&&(f+=" mfp-align-top"),b.fixedContentPos?b.wrap.css({overflow:b.st.overflowY,overflowX:"hidden",overflowY:b.st.overflowY}):b.wrap.css({top:v.scrollTop(),position:"absolute"}),(b.st.fixedBgPos===!1||"auto"===b.st.fixedBgPos&&!b.fixedContentPos)&&b.bgOverlay.css({height:d.height(),position:"absolute"}),b.st.enableEscapeKey&&d.on("keyup"+p,function(a){27===a.keyCode&&b.close()}),v.on("resize"+p,function(){b.updateSize()}),b.st.closeOnContentClick||(f+=" mfp-auto-cursor"),f&&b.wrap.addClass(f);var k=b.wH=v.height(),n={};if(b.fixedContentPos&&b._hasScrollBar(k)){var o=b._getScrollbarSize();o&&(n.marginRight=o)}b.fixedContentPos&&(b.isIE7?a("body, html").css("overflow","hidden"):n.overflow="hidden");var r=b.st.mainClass;return b.isIE7&&(r+=" mfp-ie7"),r&&b._addClassToMFP(r),b.updateItemHTML(),y("BuildControls"),a("html").css(n),b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo||a(document.body)),b._lastFocusedEl=document.activeElement,setTimeout(function(){b.content?(b._addClassToMFP(q),b._setFocus()):b.bgOverlay.addClass(q),d.on("focusin"+p,b._onFocusIn)},16),b.isOpen=!0,b.updateSize(k),y(m),c},close:function(){b.isOpen&&(y(i),b.isOpen=!1,b.st.removalDelay&&!b.isLowIE&&b.supportsTransition?(b._addClassToMFP(r),setTimeout(function(){b._close()},b.st.removalDelay)):b._close())},_close:function(){y(h);var c=r+" "+q+" ";if(b.bgOverlay.detach(),b.wrap.detach(),b.container.empty(),b.st.mainClass&&(c+=b.st.mainClass+" "),b._removeClassFromMFP(c),b.fixedContentPos){var e={marginRight:""};b.isIE7?a("body, html").css("overflow",""):e.overflow="",a("html").css(e)}d.off("keyup"+p+" focusin"+p),b.ev.off(p),b.wrap.attr("class","mfp-wrap").removeAttr("style"),b.bgOverlay.attr("class","mfp-bg"),b.container.attr("class","mfp-container"),!b.st.showCloseBtn||b.st.closeBtnInside&&b.currTemplate[b.currItem.type]!==!0||b.currTemplate.closeBtn&&b.currTemplate.closeBtn.detach(),b.st.autoFocusLast&&b._lastFocusedEl&&a(b._lastFocusedEl).focus(),b.currItem=null,b.content=null,b.currTemplate=null,b.prevHeight=0,y(j)},updateSize:function(a){if(b.isIOS){var c=document.documentElement.clientWidth/window.innerWidth,d=window.innerHeight*c;b.wrap.css("height",d),b.wH=d}else b.wH=a||v.height();b.fixedContentPos||b.wrap.css("height",b.wH),y("Resize")},updateItemHTML:function(){var c=b.items[b.index];b.contentContainer.detach(),b.content&&b.content.detach(),c.parsed||(c=b.parseEl(b.index));var d=c.type;if(y("BeforeChange",[b.currItem?b.currItem.type:"",d]),b.currItem=c,!b.currTemplate[d]){var f=b.st[d]?b.st[d].markup:!1;y("FirstMarkupParse",f),f?b.currTemplate[d]=a(f):b.currTemplate[d]=!0}e&&e!==c.type&&b.container.removeClass("mfp-"+e+"-holder");var g=b["get"+d.charAt(0).toUpperCase()+d.slice(1)](c,b.currTemplate[d]);b.appendContent(g,d),c.preloaded=!0,y(n,c),e=c.type,b.container.prepend(b.contentContainer),y("AfterChange")},appendContent:function(a,c){b.content=a,a?b.st.showCloseBtn&&b.st.closeBtnInside&&b.currTemplate[c]===!0?b.content.find(".mfp-close").length||b.content.append(z()):b.content=a:b.content="",y(k),b.container.addClass("mfp-"+c+"-holder"),b.contentContainer.append(b.content)},parseEl:function(c){var d,e=b.items[c];if(e.tagName?e={el:a(e)}:(d=e.type,e={data:e,src:e.src}),e.el){for(var f=b.types,g=0;g<f.length;g++)if(e.el.hasClass("mfp-"+f[g])){d=f[g];break}e.src=e.el.attr("data-mfp-src"),e.src||(e.src=e.el.attr("href"))}return e.type=d||b.st.type||"inline",e.index=c,e.parsed=!0,b.items[c]=e,y("ElementParse",e),b.items[c]},addGroup:function(a,c){var d=function(d){d.mfpEl=this,b._openClick(d,a,c)};c||(c={});var e="click.magnificPopup";c.mainEl=a,c.items?(c.isObj=!0,a.off(e).on(e,d)):(c.isObj=!1,c.delegate?a.off(e).on(e,c.delegate,d):(c.items=a,a.off(e).on(e,d)))},_openClick:function(c,d,e){var f=void 0!==e.midClick?e.midClick:a.magnificPopup.defaults.midClick;if(f||!(2===c.which||c.ctrlKey||c.metaKey||c.altKey||c.shiftKey)){var g=void 0!==e.disableOn?e.disableOn:a.magnificPopup.defaults.disableOn;if(g)if(a.isFunction(g)){if(!g.call(b))return!0}else if(v.width()<g)return!0;c.type&&(c.preventDefault(),b.isOpen&&c.stopPropagation()),e.el=a(c.mfpEl),e.delegate&&(e.items=d.find(e.delegate)),b.open(e)}},updateStatus:function(a,d){if(b.preloader){c!==a&&b.container.removeClass("mfp-s-"+c),d||"loading"!==a||(d=b.st.tLoading);var e={status:a,text:d};y("UpdateStatus",e),a=e.status,d=e.text,b.preloader.html(d),b.preloader.find("a").on("click",function(a){a.stopImmediatePropagation()}),b.container.addClass("mfp-s-"+a),c=a}},_checkIfClose:function(c){if(!a(c).hasClass(s)){var d=b.st.closeOnContentClick,e=b.st.closeOnBgClick;if(d&&e)return!0;if(!b.content||a(c).hasClass("mfp-close")||b.preloader&&c===b.preloader[0])return!0;if(c===b.content[0]||a.contains(b.content[0],c)){if(d)return!0}else if(e&&a.contains(document,c))return!0;return!1}},_addClassToMFP:function(a){b.bgOverlay.addClass(a),b.wrap.addClass(a)},_removeClassFromMFP:function(a){this.bgOverlay.removeClass(a),b.wrap.removeClass(a)},_hasScrollBar:function(a){return(b.isIE7?d.height():document.body.scrollHeight)>(a||v.height())},_setFocus:function(){(b.st.focus?b.content.find(b.st.focus).eq(0):b.wrap).focus()},_onFocusIn:function(c){return c.target===b.wrap[0]||a.contains(b.wrap[0],c.target)?void 0:(b._setFocus(),!1)},_parseMarkup:function(b,c,d){var e;d.data&&(c=a.extend(d.data,c)),y(l,[b,c,d]),a.each(c,function(c,d){if(void 0===d||d===!1)return!0;if(e=c.split("_"),e.length>1){var f=b.find(p+"-"+e[0]);if(f.length>0){var g=e[1];"replaceWith"===g?f[0]!==d[0]&&f.replaceWith(d):"img"===g?f.is("img")?f.attr("src",d):f.replaceWith(a("<img>").attr("src",d).attr("class",f.attr("class"))):f.attr(e[1],d)}}else b.find(p+"-"+c).html(d)})},_getScrollbarSize:function(){if(void 0===b.scrollbarSize){var a=document.createElement("div");a.style.cssText="width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",document.body.appendChild(a),b.scrollbarSize=a.offsetWidth-a.clientWidth,document.body.removeChild(a)}return b.scrollbarSize}},a.magnificPopup={instance:null,proto:t.prototype,modules:[],open:function(b,c){return A(),b=b?a.extend(!0,{},b):{},b.isObj=!0,b.index=c||0,this.instance.open(b)},close:function(){return a.magnificPopup.instance&&a.magnificPopup.instance.close()},registerModule:function(b,c){c.options&&(a.magnificPopup.defaults[b]=c.options),a.extend(this.proto,c.proto),this.modules.push(b)},defaults:{disableOn:0,key:null,midClick:!1,mainClass:"",preloader:!0,focus:"",closeOnContentClick:!1,closeOnBgClick:!0,closeBtnInside:!0,showCloseBtn:!0,enableEscapeKey:!0,modal:!1,alignTop:!1,removalDelay:0,prependTo:null,fixedContentPos:"auto",fixedBgPos:"auto",overflowY:"auto",closeMarkup:'<button title="%title%" type="button" class="mfp-close">&#215;</button>',tClose:"Close (Esc)",tLoading:"Loading...",autoFocusLast:!0}},a.fn.magnificPopup=function(c){A();var d=a(this);if("string"==typeof c)if("open"===c){var e,f=u?d.data("magnificPopup"):d[0].magnificPopup,g=parseInt(arguments[1],10)||0;f.items?e=f.items[g]:(e=d,f.delegate&&(e=e.find(f.delegate)),e=e.eq(g)),b._openClick({mfpEl:e},d,f)}else b.isOpen&&b[c].apply(b,Array.prototype.slice.call(arguments,1));else c=a.extend(!0,{},c),u?d.data("magnificPopup",c):d[0].magnificPopup=c,b.addGroup(d,c);return d};var C,D,E,F="inline",G=function(){E&&(D.after(E.addClass(C)).detach(),E=null)};a.magnificPopup.registerModule(F,{options:{hiddenClass:"hide",markup:"",tNotFound:"Content not found"},proto:{initInline:function(){b.types.push(F),w(h+"."+F,function(){G()})},getInline:function(c,d){if(G(),c.src){var e=b.st.inline,f=a(c.src);if(f.length){var g=f[0].parentNode;g&&g.tagName&&(D||(C=e.hiddenClass,D=x(C),C="mfp-"+C),E=f.after(D).detach().removeClass(C)),b.updateStatus("ready")}else b.updateStatus("error",e.tNotFound),f=a("<div>");return c.inlineElement=f,f}return b.updateStatus("ready"),b._parseMarkup(d,{},c),d}}});var H,I="ajax",J=function(){H&&a(document.body).removeClass(H)},K=function(){J(),b.req&&b.req.abort()};a.magnificPopup.registerModule(I,{options:{settings:null,cursor:"mfp-ajax-cur",tError:'<a href="%url%">The content</a> could not be loaded.'},proto:{initAjax:function(){b.types.push(I),H=b.st.ajax.cursor,w(h+"."+I,K),w("BeforeChange."+I,K)},getAjax:function(c){H&&a(document.body).addClass(H),b.updateStatus("loading");var d=a.extend({url:c.src,success:function(d,e,f){var g={data:d,xhr:f};y("ParseAjax",g),b.appendContent(a(g.data),I),c.finished=!0,J(),b._setFocus(),setTimeout(function(){b.wrap.addClass(q)},16),b.updateStatus("ready"),y("AjaxContentAdded")},error:function(){J(),c.finished=c.loadError=!0,b.updateStatus("error",b.st.ajax.tError.replace("%url%",c.src))}},b.st.ajax.settings);return b.req=a.ajax(d),""}}});var L,M=function(c){if(c.data&&void 0!==c.data.title)return c.data.title;var d=b.st.image.titleSrc;if(d){if(a.isFunction(d))return d.call(b,c);if(c.el)return c.el.attr(d)||""}return""};a.magnificPopup.registerModule("image",{options:{markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',cursor:"mfp-zoom-out-cur",titleSrc:"title",verticalFit:!0,tError:'<a href="%url%">The image</a> could not be loaded.'},proto:{initImage:function(){var c=b.st.image,d=".image";b.types.push("image"),w(m+d,function(){"image"===b.currItem.type&&c.cursor&&a(document.body).addClass(c.cursor)}),w(h+d,function(){c.cursor&&a(document.body).removeClass(c.cursor),v.off("resize"+p)}),w("Resize"+d,b.resizeImage),b.isLowIE&&w("AfterChange",b.resizeImage)},resizeImage:function(){var a=b.currItem;if(a&&a.img&&b.st.image.verticalFit){var c=0;b.isLowIE&&(c=parseInt(a.img.css("padding-top"),10)+parseInt(a.img.css("padding-bottom"),10)),a.img.css("max-height",b.wH-c)}},_onImageHasSize:function(a){a.img&&(a.hasSize=!0,L&&clearInterval(L),a.isCheckingImgSize=!1,y("ImageHasSize",a),a.imgHidden&&(b.content&&b.content.removeClass("mfp-loading"),a.imgHidden=!1))},findImageSize:function(a){var c=0,d=a.img[0],e=function(f){L&&clearInterval(L),L=setInterval(function(){return d.naturalWidth>0?void b._onImageHasSize(a):(c>200&&clearInterval(L),c++,void(3===c?e(10):40===c?e(50):100===c&&e(500)))},f)};e(1)},getImage:function(c,d){var e=0,f=function(){c&&(c.img[0].complete?(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("ready")),c.hasSize=!0,c.loaded=!0,y("ImageLoadComplete")):(e++,200>e?setTimeout(f,100):g()))},g=function(){c&&(c.img.off(".mfploader"),c===b.currItem&&(b._onImageHasSize(c),b.updateStatus("error",h.tError.replace("%url%",c.src))),c.hasSize=!0,c.loaded=!0,c.loadError=!0)},h=b.st.image,i=d.find(".mfp-img");if(i.length){var j=document.createElement("img");j.className="mfp-img",c.el&&c.el.find("img").length&&(j.alt=c.el.find("img").attr("alt")),c.img=a(j).on("load.mfploader",f).on("error.mfploader",g),j.src=c.src,i.is("img")&&(c.img=c.img.clone()),j=c.img[0],j.naturalWidth>0?c.hasSize=!0:j.width||(c.hasSize=!1)}return b._parseMarkup(d,{title:M(c),img_replaceWith:c.img},c),b.resizeImage(),c.hasSize?(L&&clearInterval(L),c.loadError?(d.addClass("mfp-loading"),b.updateStatus("error",h.tError.replace("%url%",c.src))):(d.removeClass("mfp-loading"),b.updateStatus("ready")),d):(b.updateStatus("loading"),c.loading=!0,c.hasSize||(c.imgHidden=!0,d.addClass("mfp-loading"),b.findImageSize(c)),d)}}});var N,O=function(){return void 0===N&&(N=void 0!==document.createElement("p").style.MozTransform),N};a.magnificPopup.registerModule("zoom",{options:{enabled:!1,easing:"ease-in-out",duration:300,opener:function(a){return a.is("img")?a:a.find("img")}},proto:{initZoom:function(){var a,c=b.st.zoom,d=".zoom";if(c.enabled&&b.supportsTransition){var e,f,g=c.duration,j=function(a){var b=a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),d="all "+c.duration/1e3+"s "+c.easing,e={position:"fixed",zIndex:9999,left:0,top:0,"-webkit-backface-visibility":"hidden"},f="transition";return e["-webkit-"+f]=e["-moz-"+f]=e["-o-"+f]=e[f]=d,b.css(e),b},k=function(){b.content.css("visibility","visible")};w("BuildControls"+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.content.css("visibility","hidden"),a=b._getItemToZoom(),!a)return void k();f=j(a),f.css(b._getOffset()),b.wrap.append(f),e=setTimeout(function(){f.css(b._getOffset(!0)),e=setTimeout(function(){k(),setTimeout(function(){f.remove(),a=f=null,y("ZoomAnimationEnded")},16)},g)},16)}}),w(i+d,function(){if(b._allowZoom()){if(clearTimeout(e),b.st.removalDelay=g,!a){if(a=b._getItemToZoom(),!a)return;f=j(a)}f.css(b._getOffset(!0)),b.wrap.append(f),b.content.css("visibility","hidden"),setTimeout(function(){f.css(b._getOffset())},16)}}),w(h+d,function(){b._allowZoom()&&(k(),f&&f.remove(),a=null)})}},_allowZoom:function(){return"image"===b.currItem.type},_getItemToZoom:function(){return b.currItem.hasSize?b.currItem.img:!1},_getOffset:function(c){var d;d=c?b.currItem.img:b.st.zoom.opener(b.currItem.el||b.currItem);var e=d.offset(),f=parseInt(d.css("padding-top"),10),g=parseInt(d.css("padding-bottom"),10);e.top-=a(window).scrollTop()-f;var h={width:d.width(),height:(u?d.innerHeight():d[0].offsetHeight)-g-f};return O()?h["-moz-transform"]=h.transform="translate("+e.left+"px,"+e.top+"px)":(h.left=e.left,h.top=e.top),h}}});var P="iframe",Q="//about:blank",R=function(a){if(b.currTemplate[P]){var c=b.currTemplate[P].find("iframe");c.length&&(a||(c[0].src=Q),b.isIE8&&c.css("display",a?"block":"none"))}};a.magnificPopup.registerModule(P,{options:{markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',srcAction:"iframe_src",patterns:{youtube:{index:"youtube.com",id:"v=",src:"//www.youtube.com/embed/%id%?autoplay=1"},vimeo:{index:"vimeo.com/",id:"/",src:"//player.vimeo.com/video/%id%?autoplay=1"},gmaps:{index:"//maps.google.",src:"%id%&output=embed"}}},proto:{initIframe:function(){b.types.push(P),w("BeforeChange",function(a,b,c){b!==c&&(b===P?R():c===P&&R(!0))}),w(h+"."+P,function(){R()})},getIframe:function(c,d){var e=c.src,f=b.st.iframe;a.each(f.patterns,function(){return e.indexOf(this.index)>-1?(this.id&&(e="string"==typeof this.id?e.substr(e.lastIndexOf(this.id)+this.id.length,e.length):this.id.call(this,e)),e=this.src.replace("%id%",e),!1):void 0});var g={};return f.srcAction&&(g[f.srcAction]=e),b._parseMarkup(d,g,c),b.updateStatus("ready"),d}}});var S=function(a){var c=b.items.length;return a>c-1?a-c:0>a?c+a:a},T=function(a,b,c){return a.replace(/%curr%/gi,b+1).replace(/%total%/gi,c)};a.magnificPopup.registerModule("gallery",{options:{enabled:!1,arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',preload:[0,2],navigateByImgClick:!0,arrows:!0,tPrev:"Previous (Left arrow key)",tNext:"Next (Right arrow key)",tCounter:"%curr% of %total%"},proto:{initGallery:function(){var c=b.st.gallery,e=".mfp-gallery";return b.direction=!0,c&&c.enabled?(f+=" mfp-gallery",w(m+e,function(){c.navigateByImgClick&&b.wrap.on("click"+e,".mfp-img",function(){return b.items.length>1?(b.next(),!1):void 0}),d.on("keydown"+e,function(a){37===a.keyCode?b.prev():39===a.keyCode&&b.next()})}),w("UpdateStatus"+e,function(a,c){c.text&&(c.text=T(c.text,b.currItem.index,b.items.length))}),w(l+e,function(a,d,e,f){var g=b.items.length;e.counter=g>1?T(c.tCounter,f.index,g):""}),w("BuildControls"+e,function(){if(b.items.length>1&&c.arrows&&!b.arrowLeft){var d=c.arrowMarkup,e=b.arrowLeft=a(d.replace(/%title%/gi,c.tPrev).replace(/%dir%/gi,"left")).addClass(s),f=b.arrowRight=a(d.replace(/%title%/gi,c.tNext).replace(/%dir%/gi,"right")).addClass(s);e.click(function(){b.prev()}),f.click(function(){b.next()}),b.container.append(e.add(f))}}),w(n+e,function(){b._preloadTimeout&&clearTimeout(b._preloadTimeout),b._preloadTimeout=setTimeout(function(){b.preloadNearbyImages(),b._preloadTimeout=null},16)}),void w(h+e,function(){d.off(e),b.wrap.off("click"+e),b.arrowRight=b.arrowLeft=null})):!1},next:function(){b.direction=!0,b.index=S(b.index+1),b.updateItemHTML()},prev:function(){b.direction=!1,b.index=S(b.index-1),b.updateItemHTML()},goTo:function(a){b.direction=a>=b.index,b.index=a,b.updateItemHTML()},preloadNearbyImages:function(){var a,c=b.st.gallery.preload,d=Math.min(c[0],b.items.length),e=Math.min(c[1],b.items.length);for(a=1;a<=(b.direction?e:d);a++)b._preloadItem(b.index+a);for(a=1;a<=(b.direction?d:e);a++)b._preloadItem(b.index-a)},_preloadItem:function(c){if(c=S(c),!b.items[c].preloaded){var d=b.items[c];d.parsed||(d=b.parseEl(c)),y("LazyLoad",d),"image"===d.type&&(d.img=a('<img class="mfp-img" />').on("load.mfploader",function(){d.hasSize=!0}).on("error.mfploader",function(){d.hasSize=!0,d.loadError=!0,y("LazyLoadError",d)}).attr("src",d.src)),d.preloaded=!0}}}});var U="retina";a.magnificPopup.registerModule(U,{options:{replaceSrc:function(a){return a.src.replace(/\.\w+$/,function(a){return"@2x"+a})},ratio:1},proto:{initRetina:function(){if(window.devicePixelRatio>1){var a=b.st.retina,c=a.ratio;c=isNaN(c)?c():c,c>1&&(w("ImageHasSize."+U,function(a,b){b.img.css({"max-width":b.img[0].naturalWidth/c,width:"100%"})}),w("ElementParse."+U,function(b,d){d.src=a.replaceSrc(d,c)}))}}}}),A()});

/* ================================================================================================
# Rateboard jQuery Plugin
================================================================================================ */

(function( $ ) {
	'use strict';

	/**
	 * Start the plugin
	 * ============================================================================================
	 * @param  {[type]} options [description]
	 * @return {[type]}         [description]
	 */
	$.fn.cvsRateboard = function(options){

		options = $.extend({
			// Set to false to hide the column
			// FYKI - 	the 'code' column is required, only its order number can be changed. 
			// 			In case it's set to false, the system sets it as last column, but 
			// 			doesn't disable it. 
			columnOrder: {
				'flag': 				1, 
				'code': 				2, 
				'country': 				3, 
				'currency': 			4, 
				'webuy': 				5, 
				'wesell': 				6,
				'invbuy': 				false, 
				'invsell': 				false,				
			},
			// Set to false to leave the th empty ( aka no/empty label )
			columnHeadings: {
				'flag': 				false,
				'code': 				'Code',
				'country': 				'Country',
				'currency': 			'Currency',
				'webuy': 				'We Buy',
				'wesell': 				'We Sell',
				'invbuy': 				'We Buy (Inverse Rates)', 
				'invsell': 				'We Sell (Inverse Rates)',				
			},
			// Update ONLY if XML tags get changed by ClearViewSys
			xmlElements: {
				'flag': 				'FLAGURL',
				'code': 				'ISO',
				'country': 				'COUNTRY',
				'currency': 			'NAME',
				'webuy': 				'WEBUY',
				'wesell': 				'WESELL',
				'invbuy': 				'INVBUY',
				'invsell': 				'INVSELL',								
			},			
			style: {
				logo: 					'',
				color: 					'rgba(255, 255, 255, 1)',
				backgroundColor:		'rgba(0, 0, 0, 1)',
				borderColor:			'rgba(255, 193, 7, 1)',
				headerBackgroundColor: 	'rgba(1, 50, 67, 1)',
				evenBackgroundColor:	'rgba(34, 34, 34, 1)',
				oddBackgroundColor:		'rgba(51, 51, 51, 1)',				
			},
			slider: {
				display: 				false,
				slider_images:			[],
			},
			cvsFolder: 					'cvs',
			updateFrequency: 			3000,			
		}, options);	

		return this.each(function(i, v) {

			// If 'code' is set to false - the system sets it as last column, but doesn't disable it.
			// This column is required to make the looped Ajax queries work.
			if ( false == options.columnOrder['code'] )
				options.columnOrder['flag'] = 9999;

			// Set the `isflagged` column's label and index number
			options.columnHeadings['isflagged'] = 'Is Flagged';
			options.columnOrder['isflagged'] 	= 9999;

			// Set up constants
			const $this 			= $(this),
				  colorPattern 		= /(#([\da-f]{3}){1,2}|(rgb|hsl)a\((\d{1,3}%?,\s?){3}(1|0?\.\d+)\)|(rgb|hsl)\(\d{1,3}%?(,\s?\d{1,3}%?){2}\))/ig,
				  rbColor 			= options.style['color'].match(colorPattern),
				  rbBckColor 		= options.style['backgroundColor'].match(colorPattern),
				  rbBorderColor 	= options.style['borderColor'].match(colorPattern),
				  rbHeaderBckColor 	= options.style['headerBackgroundColor'].match(colorPattern),
				  rbEvenBckColor 	= options.style['evenBackgroundColor'].match(colorPattern),
				  rbOddBckColor 	= options.style['oddBackgroundColor'].match(colorPattern),
				  // Store this in a constant to make it available is the AJAX success function
				  thisTableWrap = $(v);

			// Set up variables
			let xmlRates = [],
	    		ratesNo,
				flag,
				code,
				country,
				currency,
				webuy,
				wesell,
				invbuy,
				invsell,
				isflagged,
				timestamp,
				rateboardHasSlides = false,
				newImages = [];		

			if ( 
					( options.slider['display'] === true ) 	&&
					Array.isArray( options.slider['slider_images'] ) 
				) {

				const images = options.slider['slider_images'];

				$.each( images, function(i, v) {

					newImages.push( v );	

				});

				if ( newImages.length > 0 )
					rateboardHasSlides = true;

			};

	    	// The initial AJAX request
			const firstAjax = $.ajax({
				type: 'GET',
				url: options.cvsFolder.replace(/\/?$/, '/') + 'rateswithcss.xml',
				dataType: 'xml',
			});

			function updateCellValues( apiCell, $cell,tdOldVal, tdNewVal, tdType ) {

				// if old and new values differ
		  		if ( tdNewVal !== tdOldVal ) { 

					switch( tdType ) {

					  	case 'flag':

					  		apiCell.data( tdNewVal );

					  		$cell.addClass('val-change--NoN val-change');

					  		setTimeout(function () { 
							    $cell.removeClass('val-change val-change--NoN');
							}, 2000);
					    	
					    	break;

					  	case 'currency':
					  	case 'country':
					  	case 'isflagged':				  	

					  		apiCell.data( tdNewVal );

					  		$cell.addClass('val-change--NoN val-change');

					  		setTimeout(function () { 
							    $cell.removeClass('val-change val-change--NoN');
							}, 2000);

					    	break;

					  	default:

					  		apiCell.data( tdNewVal );

					  		// Special case - resposive
					  		/*if ( $tdElem.is(':hidden') && $tdElem.closest('tr').is(':visible') ) {

					  			const tdIndex 	= $tdElem.index(),
					  				  $tdVersion = $tdElem.closest('tr').next('.child').find('li:eq(' + tdIndex + ')');

					  				  console.log( $tdVersion );

					  		}*/

					  		if ( tdOldVal > tdNewVal )
					  			$cell.addClass('val-change--decrease val-change');

					  		if ( tdOldVal < tdNewVal )
					  			$cell.addClass('val-change--increase val-change');

					  		setTimeout(function () { 
							    $cell.removeClass('val-change val-change--increase val-change--decrease');
							}, 2000);

					} // EOF switch

				}


			}	

			function removeRow( thisRow ) {

				thisRow
					.remove()
					.draw(false);

			}			

			// Reusable function to fill the xmlRates array - this way we don't repeat 
			// ourselves when managing the multiple Ajax requests.
			function fillXmlRatesArr( data ) {

				$(data).find('RATE').each(function(i, v){

					let xmlText 	= new XMLSerializer().serializeToString(v),
						parser 		= new DOMParser(), 
						xmlDoc 		= parser.parseFromString( xmlText,"text/xml"),
						flagOrig 	= xmlDoc.getElementsByTagName("FLAGURL")[0].childNodes[0].nodeValue,
						// update uppercase extensions to lowercase (XML includes uc 
						// flag extensions, while the real extensions are in lc )
						extOrig 	= flagOrig.split('.').pop(),
						extLc 		= extOrig.toLowerCase();

					flag 	 	= options.cvsFolder.replace(/\/?$/, '/') + flagOrig.substr(0, flagOrig.lastIndexOf(".")) + '.' + extLc,
					code 		= xmlDoc.getElementsByTagName("ISO")[0].childNodes[0].nodeValue,
					country 	= xmlDoc.getElementsByTagName("COUNTRY")[0].childNodes[0].nodeValue,
					currency 	= xmlDoc.getElementsByTagName("NAME")[0].childNodes[0].nodeValue,
					webuy 		= xmlDoc.getElementsByTagName("WEBUY")[0].childNodes[0].nodeValue,
					wesell 		= xmlDoc.getElementsByTagName("WESELL")[0].childNodes[0].nodeValue,
					invbuy 		= xmlDoc.getElementsByTagName("INVBUY")[0].childNodes[0].nodeValue,
					invsell 	= xmlDoc.getElementsByTagName("INVSELL")[0].childNodes[0].nodeValue,
					isflagged 	= xmlDoc.getElementsByTagName("ISFLAGGED")[0].childNodes[0].nodeValue;

					xmlRates
						.push( 
							{ 
								'flag': 		'<img src="' + flag + '" width="" height="" alt="" />', 
								'code': 		code,
								'country': 		country, 
								'currency': 	currency,
								'webuy': 		webuy, 
								'wesell': 		wesell,
								'invbuy': 		invbuy,
								'invsell': 		invsell,
								'isflagged': 	isflagged,
							} 
						);

				}); 

				timestamp = $(data).find('TIMESTAMP');

			}

			/**
			 * Helper function
			 * 
			 * Get image source url, and craft an image element based on the url's split
			 * pieces.
			 * 
			 * @return 		Str 	image element as string
			 */
			function craftImgElemStr( flagUrl ) {

				let // Split the source url
					flagUrlArr 		= flagUrl.split('/'),
					// Get the folder name from the resulting array
					flagArr_folder 	= flagUrlArr[ flagUrlArr.length - 2 ],
					// Get the file name from the resulting array				
					flagArr_file 	= flagUrlArr[ flagUrlArr.length - 1 ],
					// Split the file name				
					flagArr_flagpcs = flagArr_file.split('.'),
					// Get the ISO from the resulting array
					flagArr_iso 	= flagArr_flagpcs[ flagArr_flagpcs.length - 2 ].toUpperCase(),
					// Get the extension from the resulting array
					flagArr_ext 	= flagArr_flagpcs[ flagArr_flagpcs.length - 1 ].toLowerCase(),
					// Craft the corrected filename ( uppercasing, lowercasing all done )
					flag 			= flagArr_folder + '/' + flagArr_iso + '.' + flagArr_ext;

				// Craft the image element string and return it
				return '<img src="' + options.cvsFolder.replace(/\/?$/, '/') + flag + '" width="" height="" alt="" />';

			}

			function updateTable_loopedAjax( newTimestamp, oldXmlRates, newXmlRates, thisTableWrap ) {

			    /* ================================================================
			    XML looped parsing
			    ================================================================ */

				// Update timestamp

				thisTableWrap.find('.cvs-timestamp').find('p').text( newTimestamp[0].textContent );

				// let iLoop = 0;
				let	currentIsosArr = [];

									// the API
				const api 			= thisTableWrap.find('.cvs-rates-table').DataTable(), 
								 	// the jQuery object				
					  table 		= thisTableWrap.find('.cvs-rates-table').dataTable(), 
					  $headRow 	 	= table.find('thead').find('tr'),
					  numberOfRows	= api.rows().data().length;

				/** 
				 * Datatables doesn't have a usable api for looping through ALL CELLS OF A SPECIFIC.
				 * But one of its users found out a way to use this functionality:
				 * @ https://datatables.net/forums/discussion/26687/get-cells-from-selected-row
				 *
				 * So 
				 * 1) 	at first we loop through the rows, then 
				 * 2) 	inside each iteration we use @bySabi's invention to loop through 
				 * 		the currently "queried" row's each cell.
				 * ------------------------------------------------------------
				 */

				api.rows().every( function ( rowIdx, tableLoop, rowLoop ) {

	    			const thisRow 	= api.row(rowIdx),
	     				  data 		= thisRow.data(),	
						  thisIso 	= thisRow.cell(rowIdx, iCode).data(),
						  newIso 	= $.grep( newXmlRates, function( i, v ) {
							return ( i['code'] === thisIso );
						  });

					//console.log( thisRow.cell({row: rowIdx, column: 0}) );
					//console.log( api.row(rowIdx).data() );

					/**
					 * SCENARIO 1 - IF THE CURRENT ISO CAN BE FOUND IN THE newXmlRates array
					 * ============================================================================
					 */
					if ( newIso.length > 0 ) {	

						//console.log( this.cells(this.index(),this.columns()[0]).data() );
									
						/* Cell type 1 - FLAG */
						this.cells( this.index(),this.columns()[0] ).every( function(i) {

				  			let tdElem 		= this.node(),
				  				tdOldVal 	= this.data(),
				  				tdType 		= $(tdElem).data('type'),
				  				tdNewVal 	= newIso[0][tdType];
							
				  			if ( 'flag' == tdType ) {

								tdOldVal = craftImgElemStr( $(tdOldVal).attr('src') );

							}
							
							updateCellValues( this, $(tdElem),tdOldVal, tdNewVal, tdType );
							api.draw(false).order();

						})
					
					// If newIso can't be found AKA row has been removed!!
					} else if ( newIso.length == 0 ) {

				  		removeRow( this );

				  	};

				})  // EOF rows().every()	

				/**
				 * Add new row(s)
				 */

				// Let's set up the arrays of available ISOs and new ISOs
			  	let availableIsos	= [],
			  		newIsos 		= [];

				//console.log(api.column(iCode).nodes());		
			  	
			  	$.each( api.column(iCode).nodes(), function(i, v) {
			  		availableIsos.push( $(v).data('code') );
			  	})

				$.each( newXmlRates, function(i, v) {

					const thisIso = v['code'];
					
					if ( availableIsos.indexOf( thisIso ) === -1 ) {

						newIsos.push( v );

					}

				})

				//console.log( availableIsos );
				//console.log( newIsos );			

				// Build the new table rows if the newIsos array is not empty.
				if ( newIsos.length > 0 ) {

					let colNo 		= api.columns().count(),
						colQtyArr 	= [];

					$.each( newIsos, function(i, v) {

						let newCellsArr = [],
							col_i;

						for (col_i = 0; col_i < colNo; col_i++) {

							let header 	= api.column(col_i).header(),
								theKey 	= $(header).data('type');

							if ( 'flag' == theKey ) {

								const flagElem = craftImgElemStr( $( v[theKey] ).attr('src') );
								newCellsArr.push( flagElem );
							
								//console.log( flagElem );

							} else {

								newCellsArr.push( v[theKey] );

							}

						}

						// Use const to add the row so that we can target the same new row
						// to update classes and data attributes
						const newRow 		= 	api
													.row
													.add( newCellsArr ),
							  newRowIndex 	= newRow.index();

						// Update classes and data attributes
						newRow.cells( newRowIndex, newRow.columns()[0] ).every( function(i) {

				  			let cellElem 	= this.node(),
				  				indexObj 	= this.index(),
				  				colIndex 	= indexObj['column'],
				  				colHeader 	= api.column(colIndex).header(),
				  				dataType 	= $(colHeader).data('type');

				  			//console.log( $(cellElem) );

							$(cellElem)
								.addClass('data-' + dataType)
								.attr('data-type', dataType)
								.attr('data-code', v['code']);	  				

				  		})
						
						// Re-sort the table
						api.draw(false).order();
						location.reload();

					})

				} 

			}

			/* Looped Ajax Request Success Callback
			--------------------------------------- */
			function loopedAjaxSuccess(xml) {

				let oldXmlRates = xmlRates,
					newXmlRates,
					newTimestamp;

				xmlRates = [];

				fillXmlRatesArr( xml );

				newXmlRates 	= xmlRates,
				newTimestamp 	= timestamp;

				//var css_y = "color: yellow";
				//console.log( '%c' + oldXmlRates[0]['webuy'], css_y );

				//var css_g = "color: green";
				//console.log( '%c' + newXmlRates[0]['webuy'], css_g );

				// Run the table update function
				updateTable_loopedAjax( newTimestamp, oldXmlRates, newXmlRates, $('body').find('.mfp-content') );

			}		

			/* Let's build the table content
			-------------------------------- */

			function buildRatesTable( data ) { 

				// Set up variable to store number of data rows
				ratesNo = $(data).find('RATE').length;

				// console.log(ratesNo);
						
				/**
				 * ================================================================================
				 * Build wrappers, containers and other supporting DOM elements
				 * ================================================================================
				 */

				// Build the rateboard header HTML
				let rbHeaderHtml = '<div class="wrap--cvs-rateboard__header"><header class="cvs-rateboard__header flex-container"><div class="flex-item cvs-rateboard__logo">';
							
				if ( 
						options.style['logo'] 				&&
						( '' !== options.style['logo'] ) 	&&
						( false !== options.style['logo'] ) 
					) {

					rbHeaderHtml += '<img src="' + options.style['logo'] + '" width="" height="" alt="" />';

				}

				rbHeaderHtml += '</div><div class="flex-item cvs-rateboard__close"><a href="#" style="color: ' + rbColor + '">&#10006;</a></div></header></div>';

				// Build the slider
				let rbSlider = '';

				if ( rateboardHasSlides ) {
				
					rbSlider = '<style>.wrap--cvs-rateboard__slider .sy-pager li.sy-active a {background-color: ' + rbBorderColor + ';}</style><div class="wrap--cvs-rateboard__slider"><ul class="cvs-rateboard__slider">';
				
					$.each( newImages, function( i, v ) {
						rbSlider += '<li><img src="' + v + '" alt=""></li>';
					});

					rbSlider += '</ul></div>';		
						
				}

				// Build the table skeleton
				const rbTable = '<div class="cvs-widget cvs-widget--rateboard" style="color: ' + rbColor + '; background-color: ' + rbBckColor + ';">' + rbHeaderHtml + '<table class="cvs-rates-table cvs-rateboard" style="width: 100%; border-color: ' + rbBorderColor + '"><thead><tr style="background-color: ' + rbHeaderBckColor + ';" /></thead><tbody /></table>' + rbSlider + '</div>';			    

				thisTableWrap.append( rbTable );

				if ( rateboardHasSlides ) {

					$('.cvs-rateboard__slider').slippry();

				}	

				/**
				 * ================================================================================
				 * Build the table content
				 * ================================================================================
				 */
			    
			    const $thisTable 	= thisTableWrap.find('table'),
			    	  $headRow 		= thisTableWrap.find('.cvs-rates-table thead tr'),
			    	  $tableBody 	= thisTableWrap.find('.cvs-rates-table tbody');
			    
			    let i;

			    for ( i = 0; i < ratesNo; i++ ) {
						
					$tableBody.append( '<tr />' );

			    };		

				/**
				 * --------------------------------------------------------------------------------
				 * Create new object, sorted by the order specified in options, and holding the 
				 * correct th class base and the th label, both specified in options as well.
				 *
				 * based on:
				 * @see https://jsfiddle.net/lalatino/mcuzr/
				 */

				const thArr = [], 
					  thObj = options.columnOrder;

				let thProp;

				for ( thProp in thObj ) {

				    if ( thObj.hasOwnProperty(thProp) ) {
				    	
						// Add to array only if the value of the current options.columnOrder 
						// is not set to false ( meaning the column should be hidden ).
						if ( false !== thObj[thProp] ) {
				        
					        thArr.push({
					            'key': thProp,
					            'value': thObj[thProp],
					            'label': options.columnHeadings[thProp],
					            'xmlElem': options.xmlElements[thProp], 
					        });

						}

				    }

				}
				
				// Now let's sort the array
				thArr.sort(function(a, b) {
				    return a.value - b.value;
				});

				/** 
				 * ------------------------------------------------------------------------------- 
				 */

				// Build the table headers
			    $.each( thArr, function(i, v) {

			    	const classSfx 	= v['key'],
			    	 	  headLabel = ( false == v['label'] ) ? '' : v['label'];

			    	$headRow
			    		.append( '<th class="header-' + classSfx + '" data-type="' + classSfx + '">' + headLabel + '</th>' );
		    	
			    });

				// Build the table data
				$tableBody.find('tr').each( function(i) {
					
					// how many columns we have
					const thNo 		= $thisTable.find('th').length,
						  trIndex 	= i;

					// append thNo number of tds					
					for (i = 0; i < thNo; i++) {

						let theClass = $thisTable.find('th:eq(' + i + ')').attr('class').split(' ')[0],
							dataType = theClass.replace('header-', '');
						
						theClass = theClass.replace('header', 'data'),

						$(this).append( '<td class="' + theClass + '" data-type="' + dataType + '" />' );

					}

					// fill the tds
					$(this).find('td').each( function(i) {

						// which one is the correct object from the xmlRates object array

						const classToMakeTheKey = $thisTable.find('th').eq(i).attr('class'),
							  theKey 			= classToMakeTheKey.replace( 'header-', '' );

						// trIndex tells us the which object of the xmlRates object array 
						// we need to parse - and theKey tells us which key-value pairs of 
						// this object we should use to fill the current td. 
						$(this).html( xmlRates[trIndex][theKey] );
						$(this).attr('data-code', xmlRates[trIndex]['code']);

					})
					
				})

				// Get column indexes
				iFlag 		= $headRow.find('.header-flag').index(),
				iCode 		= $headRow.find('.header-code').index(),
				iCountry 	= $headRow.find('.header-country').index(),
				iCurrency 	= $headRow.find('.header-currency').index(),
				iBuy 		= $headRow.find('.header-webuy').index(),
				iSell 		= $headRow.find('.header-wesell').index(),
				iInvBuy 	= $headRow.find('.header-invbuy').index(),
				iInvSell 	= $headRow.find('.header-invsell').index(),
				iIsflagged 	= $headRow.find('.header-isflagged').index();

				const table = thisTableWrap
				    	.find('.cvs-rates-table')
				    	.DataTable({
					    	paging: false, 			
					    	searching: false, 		
					    	info: false, 					
					    	lengthChange: false, 		 
					    	order: [], // Default sorting
					    	responsive: {
						        breakpoints: [
						            { name: 'desktop', width: Infinity },
						            { name: 'tablet',  width: 1024 },
						            { name: 'fablet',  width: 768 },
						            { name: 'phone',   width: 480 }
						        ],
					            /*details: {
					                display: $.fn.dataTable.Responsive.display.modal( {
					                    header: function ( row ) {
					                        var data = row.data();
					                        return 'Details for '+data[0]+' '+data[1];
					                    }
					                } ),
					                renderer: $.fn.dataTable.Responsive.renderer.tableAll()
					            }*/						        	    		
					    	},
							columnDefs: [
									// { responsivePriority: 1, targets: iFlag }, 	 // first column
									{ 
										targets: iFlag, 
										className: 'all', 
										orderable: false 
									},
									{ 
										targets: iCode, 
										className: 'all', 
									},
									{ 
										targets: iBuy, 		
										responsivePriority: 1,
									},
									{ 
										targets: iSell, 		
										responsivePriority: 2,
									},
									{ 
										targets: iInvBuy, 	
										responsivePriority: 3,
									},
									{ 
										targets: iInvSell, 	
										responsivePriority: 4,
									},
									{ 
										targets: iCurrency, 	
										responsivePriority: 5,
									},
									{ 
										targets: iCountry, 	
										responsivePriority: 6,
									},
									{ 
										targets: iIsflagged, 	
										responsivePriority: 7, 
									},									
									// { responsivePriority: 2, targets: -1 } 		// last column
							], 
							'initComplete': function(settings, json) {

								/**
								 * ================================================================
								 * Add dynamic styles
								 * ================================================================
								 */

								thisTableWrap.find('label, div').css('color', rbColor);
								thisTableWrap.find('.dataTables_wrapper').prepend('<style>.mfp-wrap .dataTables_wrapper .dataTables_paginate .paginate_button, .mfp-wrap .dataTables_wrapper .dataTables_paginate .paginate_button.disabled, .mfp-wrap .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover, .mfp-wrap .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active { color: ' + rbColor + '!important; background: transparent!important; }.mfp-wrap .dataTables_wrapper .dataTables_paginate .paginate_button.current,.mfp-wrap .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover, .mfp-wrap .dataTables_wrapper .dataTables_paginate .paginate_button:hover { color: ' + rbBckColor+ '!important; background: ' + rbColor+ '!important;}.mfp-wrap .dataTables_wrapper tbody tr{background-color: ' + rbEvenBckColor + '}.mfp-wrap .dataTables_wrapper tbody tr:nth-child(2n+1){ background-color: ' + rbOddBckColor + ' }.mfp-wrap .dataTables_wrapper table.dataTable, .mfp-wrap .dataTables_wrapper .cvs-rateboard th, .mfp-wrap .dataTables_wrapper .cvs-rateboard td, .mfp-wrap .dataTables_wrapper table.dataTable>tbody>tr.child ul.dtr-details>li{ border-color: ' + rbBorderColor + '; }</style>');			

							}							 							
						});

				// Init the popup
				let reparseXml;

				$.magnificPopup.open({
				   	items: {
				    	src: $('.cvs-widget'),
					},			
					type: 'inline',
					showCloseBtn: false,	
					mainClass: 'mfp-fade',
					fixedContentPos: true,
					callbacks: {
						open: function() {

							// Make the custom close button work
							$('.cvs-rateboard__close a').on( 'click', function(e) {

								e.preventDefault();
								$.magnificPopup.close();

							})		

							if ( false !== options.updateFrequency ) {							

								let i = 0;
								reparseXml = setInterval(function() { 

									// temporary loop limit
									//if ( i <= 10 ) {

								    	// The looped Ajax request - here we use the defualt 
								    	// `success` and `error` callbacks. Why?
								    	// Because using `done` and `fail` here would only 
								    	// make sense if we could set them up outside the 
								    	// setInterval function. But this can't be done - it 
								    	// has been tested, and such setup outside just
								    	// doesn't work. Blimey. 
										$.ajax({
											type: 'GET',
											url: options.cvsFolder.replace(/\/?$/, '/') + 'rateswithcss.xml',
											dataType: 'xml',
											success: loopedAjaxSuccess,
											error: function() {

												console.log( 'Looped Ajax request failed :(' );

											}						
										});

										i++;					

									//}

								}, options.updateFrequency );

							}

							const $elem = $('.cvs-widget').find('.cvs-rates-table');

							// console.log( $elem );
							// console.log( table );				
							 
							//table.responsive.rebuild();
							//table.responsive.recalc();	

						},
						close: function() {
							clearInterval( reparseXml );
						},		 							
					},
				}, 0);

			}

			// Declare global variables to store column indexes
			let iFlag, iCode, iCountry, iCurrency, iBuy, iSell, iInvBuy, iInvSell, iIsflagged;

			firstAjax
				// ================================================================================
				// Success callback 1 - fill the xmlRates array
				.done( function(data) {

					fillXmlRatesArr( data );

					var css = 'color: orange';
					// console.log( '%c' + xmlRates[0]['webuy'], css );
					// console.log( 'Hey' );

				})
				// ================================================================================
				// Success callback 2 - build the table
				.done( function(data) {

					buildRatesTable( data );

				})
				// ================================================================================
				// Success callback 3 - append timestamp
				.done( function(data) {

					$('body').find('.wrap--cvs-rateboard__header').after( '<div class="cvs-timestamp"><p style="margin: 0;">' + timestamp[0].textContent + '</p></div>' );

				})
				// ================================================================================
				// Error callback - looped Ajax request
				.fail( function() {

					console.log( 'Request failed :(' );

				})

		}) // EOF return this.each(function() 

	};

})( jQuery );
