let dateUtil = {

};

dateUtil.int2DateFormat = intDate => {
    let strDate = String(intDate)
    return strDate.substr(0, 4) + "-" + strDate.substr(4, 2) + "-" + strDate.substr(6, 2)
};

dateUtil.dateFormat2Int = dateFormat => {
    let strDate = String(dateFormat)
    return parseInt(strDate.replaceAll('-',''))
};

dateUtil.datetime2Format = datetime => {
    let y = datetime.getFullYear();
    let M = datetime.getMonth() + 1;
    M = M < 10 ? '0' + M : M;
    let d = datetime.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = datetime.getHours();
    h = h < 10 ? '0' + h : h;
    let m = datetime.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = datetime.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
};

dateUtil.datetime2DateFormat = datetime => {
    let y = datetime.getFullYear();
    let M = datetime.getMonth() + 1;
    M = M < 10 ? '0' + M : M;
    let d = datetime.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + M + '-' + d;
};

dateUtil.datetime2Int = datetime => {
    let y = datetime.getFullYear();
    let M = datetime.getMonth() + 1;
    let d = datetime.getDate();
    return y * 10000 + M * 100 + d;
};

dateUtil.datetime2TimeFormat = datetime => {
    let h = datetime.getHours();
    h = h < 10 ? '0' + h : h;
    let m = datetime.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = datetime.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return h + ':' + m + ':' + s;
};


export default dateUtil;