function main(lines) {
    var msg = lines[0];
    var palavras = msg.toLowerCase().split(' ');
    var i;
    
    var dir = null;
    var elev = null;
    
    for (i = 0; i < palavras.length; i++) {
        switch (palavras[i]) {
            case 'mercurio':
                dir = 'N';
                break;
                
            case 'venus':
                dir = 'NE';
                break;
                
            case 'terra':
                dir = 'L';
                break;
                
            case 'marte':
                dir = 'SE';
                break;
                
            case 'jupiter':
                dir = 'S';
                break;
                
            case 'saturno':
                dir = 'SO';
                break;
                
            case 'urano':
                dir = 'O';
                break;
                
            case 'netuno':
                dir = 'NO';
                break;
            
            case 'verde':
                elev = 30;
                break;
                
            case 'amarelo':
                elev = 45;
                break;
                
            case 'vermelho':
                elev = 60;
                break;
        }
        
        if (dir && elev) {
            println(dir + ' - ' + elev);
            
            dir = null;
            elev = null;
        }
    }
}
