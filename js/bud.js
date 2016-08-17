String.prototype.format = function () {
    var args = arguments;

    return this.replace(/\{(\d+)\}/g, function (g0, g1) {
        return args[+g1];
    });
};

var size = 26;     //最大宽度
var sum = 22;      //层级数量
var widMin = 4;  //最小宽度
var sizePer = 0.82; //每级宽高比

function createNode(nodeType, className, styles) {   //创建节点快捷方法
    var node = document.createElement(nodeType);
    node.className = className;
    if (styles) node.style.cssText = styles;
    return node;
}

function createBud() {
    var wrap = createNode('div', 'bud-wrap');

    var budCenter = createNode('div', 'bud-center');
    for (var i = 0; i < 6; i++) {
        var wid = getWid(size, 5, sum);
        var petal = createNode('div', 'bud-petal', 'width:{0}px'.format(wid));
        petal.appendChild(createBudBox(sum));
        budCenter.appendChild(petal);
    }
    wrap.appendChild(budCenter);
    return wrap;
}

function createBudBox(left, sum) {   //递归创造折叠容器
    if (!sum) sum = left;

    var half = ~~(sum / 2);

    var percent = (sum - left) / sum;

    var color = 'hsl(' + ~~(180 * percent) + ',100%,' + (~~(60 * percent) + 10 + '%)');

    var wid = getWid(size, sum - left, sum); //该级宽度
    wid = +(wid + '').substr(0, 4);

    var boxStyles = [           //容器样式
        'width:{0}px'.format(wid),
        'height:{0}px'.format(wid)
    ].join(';');

    var shadowsStr = [               //box-shadow 字符串
        '{0}px 0 0 0'.format(-2 * wid),
        '{0}px 0 0 0'.format(-wid),
        '{0}px 0 0 0'.format(wid),
        '{0}px 0 0 0'.format(2 * wid)
    ].join(',')

    var shapeStyles = [             //色块样式
        'background-color:' + color,
        'color:' + color,
        'width:' + wid + 'px',
        'height:' + wid + 'px',
        'box-shadow:' + shadowsStr,
        ''
    ].join(';');

    var box = createNode('div', 'bud-box', boxStyles);

    box.appendChild(createNode('div', 'bud-shape', shapeStyles));

    if (left > 1) {
        box.appendChild(arguments.callee(left - 1, sum));
    }
    return box;
}

function getWid(start, index, sum) {
    var half = ~~(sum / 2);
    if (index < half) {
        index = sum - index;
    }
    var wid = start * Math.pow(sizePer, index - half);

    if (wid < widMin) wid = widMin;
    return wid;
}

var demo = document.getElementById('demo');
demo.innerHTML = '';
demo.appendChild(createBud());