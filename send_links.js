// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Send back to the popup a sorted deduped list of valid link URLs on this page.
// The popup injects this script into all frames in the active tab.
function AliExpresscontent()
{
	var linkss = [];
	var tmpTagName = document.getElementsByTagName("div");
	for (var i = 0; i < tmpTagName.length; i++)
	{
		if (tmpTagName[i].className == "ui-box product-description-main")
		{
			var tmpTagName2 = tmpTagName[i].getElementsByTagName("div");
			for (var i2 = 0; i2 < tmpTagName2.length; i2++)
			{
				if (tmpTagName2[i2].className == "ui-box-body")
				{
					var links = tmpTagName2[i2].getElementsByTagName('img');
					
					for (var ii = 0; ii < links.length; ii++)
					{
						linkss.push(links[ii].src); //添加;
					}
					return linkss;
				}
			}
		}
	}
	return linkss;
}
function AliExpressMainPicture()
{
	var tmpTagName = document.getElementById("j-image-thumb-list");
	if (tmpTagName == null)
	{
		return '';
	}
	var links = tmpTagName.getElementsByTagName('img');
	var linkss = [];
	for (var ii = 0; ii < links.length; ii++)
	{
		
		linkss.push(links[ii].src.replace('_50x50.jpg', '')); //添加;
	}
	//linkss.sort();
	return linkss;
	//chrome.extension.sendRequest(unique(linkss));
}
function detail1688MainPicture()
{
	var tmpTagName = document.getElementById("dt-tab");
	if (tmpTagName == null)
	{
		return [];
	}
	var links = tmpTagName.getElementsByTagName('img');
	var linkss = [];
	for (var ii = 0; ii < links.length; ii++)
	{
		
		linkss.push(links[ii].src.replace('.60x60', '')); //添加;
	}
	//linkss.sort();
	return linkss;
	//chrome.extension.sendRequest(unique(linkss));
}
function detail1688content()
{
	var tmpTagName = document.getElementById("desc-lazyload-container");
	if (tmpTagName == null)
	{
		return [];
	}
	var links = tmpTagName.getElementsByTagName('img');
	var linkss = [];
	for (var ii = 0; ii < links.length; ii++)
	{
		
		linkss.push(links[ii].src); //添加;
	}
	//linkss.sort();
	return linkss;
	//chrome.extension.sendRequest(unique(linkss));
}
function taobaoMainPicture()
{
	var tmpTagName = document.getElementById("J_UlThumb");
	if (tmpTagName == null)
	{
		return [];
	}
	var links = tmpTagName.getElementsByTagName('img');
	var linkss = [];
	for (var ii = 0; ii < links.length; ii++)
	{
		var tmpurl;
		tmpurl = links[ii].getAttribute("data-src");
		tmpurl = tmpurl.replace('_50x50' + GetExtension(tmpurl), '');
		//tmpurl=tmpurl.substring(2,tmpurl.length);
		tmpurl = 'http:' + tmpurl
			linkss.push(tmpurl); //添加;
		
	}
	//linkss.sort();
	return linkss;
	//chrome.extension.sendRequest(unique(linkss));
}
function taobaocontent()
{
	var tmpTagName = document.getElementById("J_DivItemDesc");
	if (tmpTagName == null)
	{
		return [];
	}
	var links = tmpTagName.getElementsByTagName('img');
	var linkss = [];
	for (var ii = 0; ii < links.length; ii++)
	{
		
		linkss.push(links[ii].src); //添加;
	}
	//linkss.sort();
	return linkss;
	//chrome.extension.sendRequest(unique(linkss));
}
// 数组去重复函数
function unique(arr)
{
	var result = [],
	hash = {};
	for (var i = 0, elem; (elem = arr[i]) != null; i++)
	{
		if (!hash[elem])
		{
			result.push(elem);
			hash[elem] = true;
		}
	}
	return result;
}
// 数组去空函数
function ClearNullArr(arr)
{
	for (var i = 0, len = arr.length; i < len; i++)
	{
		if (!arr[i] || arr[i] == '' || arr[i] === undefined)
		{
			arr.splice(i, 1);
			len--;
			i--;
		}
	}
	return arr;
}
// 获取后缀名函数
function GetExtension(url)
{
	var filename = url;
	var index1 = filename.lastIndexOf(".");
	var index2 = filename.length;
	var postf = filename.substring(index1, index2); //后缀名
	
	return postf;
}
//Main -----------------------------------------------------------
var tmpsrc = '', tmpsrcarr = [], tmparr = [];
var tmp = [];
var host;
host = window.location.host;
if (host == 'www.aliexpress.com' || host == 'aliexpress.com')
{
	tmp = [];
	tmp = AliExpressMainPicture();
	if (tmp.length !== 0)
	{
		tmpsrc = tmpsrc + '|' + tmp.join('|');
	}
	tmp = [];
	tmp = AliExpresscontent();
	if (tmp.length !== 0)
	{
		tmpsrc = tmpsrc + '|' + tmp.join('|');
	}
	tmp = [];
}
if (host == 'detail.1688.com')
{
	tmp = [];
	tmp = detail1688MainPicture();
	if (tmp.length !== 0)
	{
		tmpsrc = tmpsrc + '|' + tmp.join('|');
	}
	tmp = [];
	tmp = detail1688content();
	if (tmp.length !== 0)
	{
		tmpsrc = tmpsrc + '|' + tmp.join('|');
	}
	tmp = [];
}
if (host == 'item.taobao.com')
{
	tmp = [];
	tmp = taobaoMainPicture();
	if (tmp.length !== 0)
	{
		tmpsrc = tmpsrc + '|' + tmp.join('|');
	}
	tmp = [];
	tmp = taobaocontent();
	if (tmp.length !== 0)
	{
		tmpsrc = tmpsrc + '|' + tmp.join('|');
	}
	tmp = [];
}

tmparr = tmpsrc.split('|');
tmparr = ClearNullArr(tmparr);
tmparr = unique(tmparr);
console.log(tmparr);
if (tmparr.length !== 0)
{
	chrome.extension.sendRequest(tmparr);
}
