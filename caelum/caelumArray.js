var Caelum = {};
Caelum.Array = (function() {
	var arrayPrototype = Array.prototype;
	var _unshift = Array.prototype.unshift;
	var _splice = Array.prototype.splice;
	function arrayFix(){
		if (!('indexOf' in arrayPrototype)) {
			arrayPrototype.indexOf = function(item, index) {
				var len = this.length,
					i = ~~index;    //若index为字符串，则0
				if (i < 0){
					i = i + len;
				}  
				for(; i < len; i++){
					if(this[i] === item){
						return i;
					}
				}
				return -1;
			}
		}
		if(!('lastIndexOf') in arrayPrototype) {
			arrayPrototype.lastIndexOf = function(item, index) {
				var len = this.length,
					i = ~~index;
				if(i < 0) {
					i = Math.max(0,n+i);
				}
				for(;i >= 0; i--){
					if(this[i] === item) {
						return i;
					}
				}
				return -1;
			}
		}
		if(!('forEach' in arrayPrototype)) {
			arrayPrototype.forEach = function(fn, scope) {   //scope为运行作用域
				for(var i = 0, j = this.length; i < j; i++){
					fn.call(scope, this[i], i, this);        //为回调传入三个参数：this，当前内容，索引，迭代的对象
				}
			}
		}
		if(!('filter' in arrayPrototype)) {
			arrayPrototype.filter = function(fn, scope) {   //scope为运行作用域
				var result = [];
				for(var i = 0, j = this.length; i < j; i++) {
					if(fn.call(scope, this[i], i, this)) {     //若fn返回true，则添加
						result.push(this[i]);
					}
				}
				return result;     //返回结果
			}
		}
		if(!('map' in arrayPrototype)) {
			arrayPrototype.map = function(fn, scope) {   //scope为运行作用域
				var result = [];
				for(var i = 0, j = this.length; i < j; i++) {
					result[i] = fn.call(scope,scope, this[i], i, this);	
				}
				return result;
			}
		}
		if(!('every' in arrayPrototype)) {
			arrayPrototype.every = function(fn, scope) {   //scope为运行作用域
				for(var i = 0, j = this.length; i < j; i++){
					if (!fn.call(scope, this[i], i, this)) {
	                    return false;   //有错误的就返回false
	                }
				}
				return true;
			}
		}
		if(!('some' in arrayPrototype)) {
			arrayPrototype.some = function(fn, scope) {   //scope为运行作用域
				for(var i = 0, j = this.length; i < j; i++){
					if (fn.call(scope, this[i], i, this)) {
	                    return true;   //有错误的就返回false
	                }
				}
				return false;
			}
		}
		if([].unshift(1) !== 1) {
			Array.prototype.unshift = function() {
				_unshift.apply(this, arguments);
				return this.length;    //修复不返回长度的
			}
		}
		if([1,2].splice(1).length == 0) {
			Array.prototype.splice() = function(num) {
				if(arguments.length == 1) {
					return _splice(this, num, this.length);
				}else{
					return _splice(this, arguments);
				}
			}
		}
		return {
			contains : function(array, item) {
				return array.indexOf(item) > -1;  //返回是否包含
			},
			removeAt: function(array, index) {
				return array.splice(index,1).length > 0;   //返回真假
			},
			remove: function(array, item) {
				var index = array.indexOf(item);
				return index > -1 ? removeAt(array, index) : false;
			},
			clean: function(array) {
				return array.filter(function(item){
					return item != null;
				})
			},
			shuffle: function(array) {
				var len = array.length-1,
					temp,
					j;
				for( ;len > 0 ; len--){
					j = parseInt(Math.random() * len);   //生成区间
					temp = array[len];
					array[len] = array[j];
					array[j] = temp;
				}
				return array;
			},
			flatten: function(array) {
				var newArray = [];
				function RFlatten(a) {
					var len = a.length,
						item;
					for(var i = 0; i < len; i++) {
						item = a[i];
						if(Caelum.isArray(item)){
							RFlatten(item);
						}else{
							newArray.push(item);
						}
					}
					return newArray;
				}
				return RFlatten(array);     //递归实现数组平坦化
			},
			random: function(array) {
				return array[Math.random() * array.length];
			},
			include: function(array, item){
				if (!Caelum.Array.contains(array, item)){
					array.push(item);
				}
			},   //把一个元素插入到数组，如果它不存在于这个数组
			unique: function(array) {
				var result = [],
					len = array.length;
				loop: for(var i = 0; i < len; i++) {
					for(var x = i+1; x < len; x++) {
						if( array[i] === array[x]) {
							continue loop;
						}
					}
					result.push(array[i]);
				}
				return result;
			},    //去重
			merge: function(array) {
				var args = [].slice.call(arguments),
					len = args.length,
					result = [];
				for(var i = 0; i < len; i++) {
					result = result.concat(args[i]);
				}
				return Caelum.Array.unique(result); 
			},   //取并集
			intersect: function(target, array) {
				return target.filter(function(item){
					return ~array.indexOf(item);    //取反 || 取交集
				})
			},
			diff: function(target, array) {
				for(var i = 0; i < target.length; i++) {
					for(var j=0; j < array.length; j++) {
						if(target[i] === array[j]) {
							target.splice(i,1);   //删除
							i--;
							break;
						}
					}
				}
				return target;   //取补集
			},
			min: function(array) {
				return Math.min.apply(null, array);
			},
			max: function(array) {
				return Math.max.apply(null, array);
			},
			sum: function(array) {
				var len = array.length,
					result = 0;
				for(var i = 0; i < len; i++) {
					result += array[i];
				}
				return result;
			}
		}
	}
})()