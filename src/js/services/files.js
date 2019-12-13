//----------------------------------------------------------------------------->>
//---------------------- Files v2.14 - 20191208 ------------------------------->>
//---------------------- © Roberto Cortés ------------------------------------->>
//---------------------- Free use --------------------------------------------->>
//----------------------------------------------------------------------------->>

const files = ($window, $scope = {}) => {

// -------------- Functions for queryStrings ---------------------------------->>
  $scope.getValueFromQueryString = (key, url) => {
    key = key.replace(/[\[\]]/g, '\\$&')
    var results = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)').exec(url)
    if (!results) return false;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
 
  $scope.toQueryString = (obj, baseUrl = '', symbol = '') => (
    baseUrl + symbol + Object.keys(obj).map(key => key + '=' + obj[key]).join('&')
  )

  
  $scope.toQueryParams = url => {
    if (!url || !/[?#]/.test(url)) {
      return { }
    }
    return (/[?#]/.test(url) ? url.slice(new RegExp('[?#]').exec(url).index + 1)
      : url).split('&')
      .reduce((obj, param) => {
        var [key, val] = param.split('=')
        obj[key] = val ? decodeURIComponent(val.replace(/\+/g, ' ')) : ''
        return obj
      }, {})
  }
  
  /*
  //------------- Test for queryString functions ------------------------------->>
  console.log(getValueFromQueryString("scheDate","http://localhost:8080/schedule/bySportDate?scheDate=09&sport=ATH"))
  console.log(toQueryString({'foo':'bar','foo2':'bar2'},"www.tokyo2020.html?"))
  console.log(toQueryParams("http://localhost:8080/schedule/bySportDate?scheDate=09&sport=ATH"))
  // */
  
  // -------------- Functions for parse & serialize xmls ------------------------>>
  $scope.parseXML = xml => (
    angular.isDefined(DOMParser)
      ? new DOMParser().parseFromString(xml, 'text/xml')
      : new ActiveXObject('Microsoft.XMLDOM').loadXML(xml)
  )
  
  $scope.serializeXML = xml => (
     new XMLSerializer().serializeToString(xml)
  )
  
  $scope.getFromStorage = (key, type = 'localStorage') => {
    if ($window.localStorage) {
      try {
        return angular.fromJson($window[type].getItem(key))
      } catch (err) {
        return $window[type].getItem(key);
      }
    }
  }
  
  $scope.setInStorage = (key, val, what = 'localStorage') => {
    if ($window[what]) {
      $window[what].setItem(key, val);
    }
  }
  
  // -------------- Functions convert files ------------------------------------->>
  $scope.clone = obj => {
    if (obj === null || !angular.isObject(obj)) {
      return obj;
    }
    if (angular.isArray(obj)) {
      var clonedArr = [];
      obj.forEach((element) => {
        clonedArr.push($scope.clone(element))
      })
      return clonedArr;
    }
    let clonedObj = {}
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        clonedObj[prop] = $scope.clone(obj[prop])
      }
    }
    return clonedObj;
  }
  
  $scope.fromIniToJSON = ini => {
    var doc = ini.toString(); var json = {}; var arr = doc.split('\n')
    function clearStr (str) {
      if (str) return str.toString().trim()
    }
    for (var x = 0; x < arr.length; x++) {
      if (arr[x].length > 2) {
        var pieces = arr[x].split(/=(.+)/)
        json[clearStr(pieces[0])] = clearStr(pieces[1]);
      }
    }
    return json;
  }
  
  $scope.fromXmlToJSON = xml => {
    var obj = {}
    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j)
          obj[attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) {
      obj = xml.nodeValue.trim();
    }
    if (xml.hasChildNodes()) {
      for (var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i); var nodeName = item.nodeName
        if (angular.isUndefined((obj[nodeName]))) {
          if (item.nodeType != 3) {
            obj[nodeName] = $scope.fromXmlToJSON(item)
          }
        } else {
          if (angular.isUndefined((obj[nodeName].push)) && item.nodeType != 3) {
            var old = obj[nodeName]
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          if (item.nodeType != 3) {
            obj[nodeName].push($scope.fromXmlToJSON(item));
          }
        }
      }
    }
    return obj;
  }

  $scope.isObjectEmpty = obj => (
     Object.keys(obj) && Object.keys(obj).length == 0
  )
  
  $scope.fromObjectToArr = obj => (
      !$scope.isObjectEmpty(obj) ? Object.keys(obj).map((key) => { return obj[key] }) : []
   )
  
   $scope.fromObjectToArrObj = obj => {
    var arr = [], keys = (Object.keys(obj)), x = 0;
    for (; x < obj[keys[0]].length; x++) {
      var nOb = {};
      for (var y = 0; y < keys.length; y++) {
        nOb[keys[y]] = obj[keys[y]][x];
        arr[x] = (nOb);
      }
    }
    return arr
  }
  
  $scope.fromArrToJSON = arr => {
    var JSON = {}; var x = 0; var keys = Object.keys(arr[0]); var y = 0
    for (; y < keys.length; y++) { JSON[keys[y]] = [] }
    for (; x < arr.length; x++) {
      for (y = 0; y < keys.length; y++) {
        JSON[keys[y]].push(arr[x][keys[y]]);
      }
    }
    return JSON;
  }
  
  // -------------- Functions for cookies --------------------------------------->>
  
  $scope.getCookie = name => {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
    return v ? v[2] : null;
  }
  
  $scope.setCookie = (name, value, days) => {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + '=' + value + ';path=/;expires=' + d.toGMTString();
  }

  
  $scope.deleteCookie = name => {
     $scope.setCookie(name, '', -1);
  }
  
  // -------------- Functions for array & objects ------------------------------->>
  
  $scope.deepIterObj = (obj, node) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== null && angular.isObject(obj[key])) {
        $scope.deepIterObj(obj[key])
        return;
      }
      if (angular.isString(obj[key])) {
        obj[key] = obj[key].replace(/'/g, "''")
        node.innerHTML += '<br> ' + obj[key];
      }
    })
  }
  
  $scope.sortArr = (array, key, order = 'asc') => {
    return array.sort(function (a, b) {
      var y = a[key], x = b[key], param = order === 'desc' ? [1, -1] : [-1, 1];
      return ((y < x) ? param[0] : ((y > x) ? param[1] : 0))
    })
  }
  
  $scope.indexIn = (array, searchedKey, expectedValue, type = false) => {
    var index = -1, x = 0
    if (angular.isArray(array) && array.length) {
      for (; x < array.length; x++) {
        if (array[x].hasOwnProperty(searchedKey) && array[x][searchedKey] === expectedValue) {
          index = x;
          break
        }
      }
    }
    return !type ? index : index != -1 ? array[index] : -1;
  }
  
  $scope.ret = false
  $scope.findProp = (object, key, index, result) => {
    if (!result) { result = []; $scope.ret = false }
    if (object.hasOwnProperty(key)) {
      if ((index) && result.length === (index)) {
        $scope.ret = object[key]
      }
      result.push((object[key]))
    }
    for (var i = 0; i < Object.keys(object).length; i++) {
      if ($scope.ret) break
      if (angular.isObject(object[Object.keys(object)[i]])) {
        $scope.findProp(object[Object.keys(object)[i]], key, index, result)
      }
    }
    return !isNaN(index)
      ? index < result.length
        ? $scope.ret
        : 'Wrong index!'
      : result;
  }
  
  $scope.groupByPropValue = (object, key, expectedValue, result) => {
    if (!result) { result = []; $scope.ret = false }
    if (object.hasOwnProperty(key) && object[key] == expectedValue) {
      result.push(object)
    }
    for (var i = 0; i < Object.keys(object).length; i++) {
      if ($scope.ret) break
      if (angular.isObject(object[Object.keys(object)[i]])) {
        $scope.groupByPropValue(object[Object.keys(object)[i]], key, expectedValue, result)
      }
    }
    return result;
  }
  
  $scope.filterByPropValue = (object, key, expectedValue, exceptionKey) => {
    var matchs = {};
    for (var i in object) {
      if (object[i].hasOwnProperty(key) && object[i][key] === expectedValue || i === exceptionKey) { matchs[i] = object[i] }
    }
    return matchs
  }
  
  $scope.findAndReplaceProp = (object, key, index, result) => {
    if (!result) { result = []; ret = false }
    function isFX (ob, _self) {
      return angular.isFunction(_self.replace)
        ? _self.replace(ob)
        : _self.replace;
    }
    if (object.hasOwnProperty(key)) {
      if ((!isNaN(index)) && result.length == (index)) {
        object[key] = isFX(object[key], this);
        $scope.ret = true;
      } else if (!index || isNaN(index)) {
        object[key] = isFX(object[key], this);
      }
      result.length++;
    }
    for (var i = 0; i < Object.keys(object).length; i++) {
      if ($scope.ret) break
      if (angular.isObject(object[Object.keys(object)[i]])) {
        $scope.findAndReplaceProp(object[Object.keys(object)[i]], key, index, result);
      }
    }
  }
  
  $scope.compare = (obj, key1, key2, replace, ignore, char) => {
    var arr1 = $scope.findProp(obj, key1); var arr2 = $scope.findProp(obj, key2); var dif = []
    for (var x = 0; x < arr1.length; x++) {
      if (arr1[x].replace(ignore, '') === arr2[x]) {
        if (replace) {
          $scope.replaceProp(obj, key1, char, x)
        } else {
          dif[x] = ([arr1[x], arr2[x]])
        }
      }
    }
    if (!replace) return dif;
  }

  $scope.delAttr = (object, key, index, result) => {
    if (!result) { result = []; $scope.ret = false }
    if (object.hasOwnProperty(key)) {
      if ((index) && result.length === (index + 1)) {
        delete (object[key])
      } else if (!index) {
        delete (object[key]);
      }
    }
    for (var i = 0; i < Object.keys(object).length; i++) {
      if ($scope.ret) break
      if (angular.isObject(object[Object.keys(object)[i]])) {
        $scope.delAttr(object[Object.keys(object)[i]], key, index, result);
      }
    }
  }
  
  $scope.replaceProp = (obj, key, value, index, dep) => {
     if (dep) Object.extend(this, dep)
     $scope.replace = this.hasOwnProperty(value) ? this[value] : value
     $scope.findAndReplaceProp.apply(this, [obj, key, parseInt(index)]);
  }
  
  $scope.compareJSON = (obj1, obj2) => {
    Object.keys(obj1).map(function (k) {
      if (!obj2.hasOwnProperty(k) || obj2[k] != obj1[k]) {
        return false;
      }
    })
    return true;
  }
  
  $scope.addKey = (array, key, value) => {
    for (let val of array) {
         val[key] = value;
    }
    return array;
  }
  
  $scope.extend = arr => {
    var ob = {};
    for (var i in arr) { ob = Object.assign(ob, arr[i]) }
    return ob;
  },
  
  $scope.isObject = item => (
    (item && angular.isObject(item) && !angular.isArray(item))
  )
  
  $scope.extendObj = (defObj, newObj) => {
    let ret = Object.assign({}, defObj);
    if ($scope.isObject(defObj) && $scope.isObject(newObj)) {
      Object.keys(newObj).forEach(key => {
        if ($scope.isObject(newObj[key])) {
          if (!(key in defObj)) { Object.assign(ret, { [key]: newObj[key] }) } else { ret[key] = $scope.extendObj(defObj[key], newObj[key]) }
        } else {
          Object.assign(ret, { [key]: newObj[key] });
        }
      })
    }
    return ret;
  }

  
  $scope.sortObjByKey = obj => {
    let ordered = {}
    Object.keys(obj).sort().forEach(function (key) {
      ordered[key] = obj[key];
    })
    return ordered;
  }
  
  // range is with both (start and end) inclusive. For removing end, add true to the thirth param
  $scope.range = (start, end, excludeEnd) => (
    Array.from({ length: (end - start) + (excludeEnd ? 0 : 1) }, (v, k) => k + start)
  )
  
  $scope.UnixTimestamp = () => (
     Math.floor(new Date().getTime() / 1000)
  )  
  
  // ---------------------------------------------------------------------------->>
  
  $scope.getRandomToken = (str ='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxxxxxxxxxx') => (
     str.replace(/[xy]/g, (c) => {
       var r = Math.random() * 16 | 0; var v = c == 'x' ? r : (r & 0x3 | 0x8)
       return v.toString(16)
     })
  )

  $scope.testJWToken = v => (
       /^ey[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/.test(v)
  )


  $scope.capitalizeStr = (s) => {
    var split = s.toLowerCase().split(' '), n, str = '';
    if (angular.isArray(split)) {
      for (n of split) { str += n.charAt(0).toUpperCase() + n.slice(1) + ' ' }
    }
    return str;
  }

  $scope.toCamelCase = (str) => (
     str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
       index == 0 ? word.toLowerCase() : word.toUpperCase()
    )).replace(/\s+/g, '')
  )

  return $scope;

}

(function() { 
   'use strict'; 
   angular
   .module('myApp')
   .factory('files', files)
})(angular);
