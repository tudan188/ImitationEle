export function saveToLocal(id,key,val){
	let seller = window.localStorage._seller_;
	if(!seller){
		seller = {};
		seller[id] = {};
	}else{
		seller = JSON.parse(seller);//JSON.parse() 方法用来解析JSON字符串，构造由字符串描述的JavaScript值或对象。提供可选的reviver函数用以在返回之前对所得到的对象执行变换(操作)。
		if(!seller[id]){
			seller[id]={};
		}
	}
	seller[id][key] = val;
	window.localStorage._seller_ = JSON.stringify(seller); //JSON.stringify() 方法是将一个JavaScript值(对象或者数组)转换为一个 JSON字符串
}

export function loadFromLocal(id, key, def) {
	let seller = window.localStorage.getItem('_seller_');
	console.log(seller)
	if (!seller) {
		return def;
	}
	seller = JSON.parse(seller)[id];
	if (!seller) {
		return def;
	}
	let ret = seller[key];
	console.log(1,ret,def)
	return ret || def;
};
