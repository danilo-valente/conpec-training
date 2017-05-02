function main(lines) {
    var h = parseFloat(lines[0]);
    var Vb = parseFloat(lines[1]);
    var d = parseFloat(lines[2]);
    var T = parseFloat(lines[3]);
    
    var t = h / Vb - d / T;
    print(t.toFixed(3));
}
