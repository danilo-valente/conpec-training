/*
 * Função que recebe um texto, apaga todas as ocorrências de `palavra` e retorna
 * o novo texto
 */
function apagar(texto, palavra) {
    var plvs = texto.split(' ');
    var novas_plvs = [];
    var i;
    
    for (i = 0; i < plvs.length; i++) {
        if (plvs[i].toLowerCase() === palavra.toLowerCase()) {
        } else {
            novas_plvs.push(plvs[i]);
        }
    }
    
    return novas_plvs.join(' ');
}

/*
 * Função que recebe um texto, substitui todas as ocorrências de `palavra1` por
 * `palavra2` e retorna o novo texto
 */
function substituir(texto, palavra1, palavra2) {
    var plvs = texto.split(' ');
    var i;
    
    for (i = 0; i < plvs.length; i++) {
        if (plvs[i].toLowerCase() === palavra1.toLowerCase()) {
            plvs[i] = palavra2;
        }
    }
    
    return plvs.join(' ');
}

/*
 * Função que recebe uma string e inverte a ordem dos caracteres dela
 */
function inverter_str(str) {
    return str.split('').reverse().join('');
}

/*
 * Função que recebe um texto, inverte a ordem dos caracteres de todas as
 * corrências de `palavra` e retorna o novo texto
 */
function inverter(texto, palavra) {
    var plvs = texto.split(' ');
    var i;
    
    for (i = 0; i < plvs.length; i++) {
        if (plvs[i].toLowerCase() === palavra.toLowerCase()) {
            plvs[i] = inverter_str(plvs[i]);
        }
    }
    
    return plvs.join(' ');
}

function main(lines) {
    var texto = lines[0];
    var i = 1;
    
    println(texto); // Imprime a versão inicial do texto
    
    while (lines[i] !== 'Q') {
        // println(lines[i]);
        switch (lines[i]) {
            case 'D':
                texto = apagar(texto, lines[i + 1]);
                i += 2; // Leu 2 linhas
                break;
                
            case 'R':
                texto = substituir(texto, lines[i + 1], lines[i + 2]);
                i += 3; // Leu 3 linhas
                break;
                
            case 'I':
                texto = inverter(texto, lines[i + 1]);
                i += 2; // Leu 2 linhas
                break;
                
            default:
                i++;     // Leu apenas 1 linha
        }
        
        println(texto); // Imprime a nova versão do texto
    }
}
