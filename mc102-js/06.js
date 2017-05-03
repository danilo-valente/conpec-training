function main(lines) {
    var c = parseInt(lines[0]);
    
    var i = 1;
    var t = parseInt(lines[i]);
    while (t !== 0) {
        c -= t;
        
        if (t < 0) {
            println('Seja bem-vindo! Capacidade restante: ' + c);
        } else {
            println('Volte sempre! Capacidade restante: ' + c);
        }
        
        i++;
        t = parseInt(lines[i]);
    }
}
