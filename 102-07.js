function eh_perfeito(n) {
    var soma_div = 0;
    var i;
    
    for (i = 1; i <= n / 2; i++) {
        if (n % i === 0) {
            soma_div += i;
        }
    }
    
    return soma_div === n;
}

function eh_triangular(n) {
    var soma_int = 0;
    var i = 0;
    
    while (i <= n && soma_int < n) {
        soma_int += i;
        i++;
    }
    
    return soma_int === n;
}

function calcular_pontos(golpe) {
    var pontos = golpe;
    
    if (eh_perfeito(golpe)) {
        pontos *= 3;
    }
    
    if (eh_triangular(golpe)) {
        pontos *= 2;
    }
    
    return pontos;
}

function main(lines) {
    var pontos_ryu = 0;
    var pontos_ken = 0;
    var i = 0;
    var golpe = parseInt(lines[i]);
    while (golpe !== 0) {
        if (golpe > 0) {
            pontos_ryu += calcular_pontos(golpe);
        } else {
            golpe *= -1;
            pontos_ken += calcular_pontos(golpe);
        }

        i++;
        golpe = parseInt(lines[i]);
    }
    
    if (pontos_ryu > pontos_ken) {
        println('Ryu venceu');
    } else if (pontos_ryu < pontos_ken) {
        println('Ken venceu');
    } else {
        println('empatou');
    }

}
