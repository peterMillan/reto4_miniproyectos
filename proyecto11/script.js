function numeroATexto(numero) {
    const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
    const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
    const decenas = ['veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
    const centenas = ['ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

    if (numero === 0) return 'cero';

    // Verificar si el número está fuera del rango soportado
    if (numero > 1000000000000) {
        return 'Número no soportado';
    }

    function convertirGrupo(numero) {
        let texto = '';
        if (numero === 100) return 'cien';

        if (numero > 100) {
            texto += centenas[Math.floor(numero / 100) - 1] + ' ';
            numero %= 100;
        }

        if (numero >= 20) {
            if (numero >= 21 && numero <= 29) {
                texto += 'veinti' + unidades[numero % 10];
                return texto.trim();
            } else {
                texto += decenas[Math.floor(numero / 10) - 2];
                if (numero % 10 > 0) {
                    texto += ' y ' + unidades[numero % 10];
                }
                return texto.trim();
            }
        } else if (numero >= 10) {
            texto += especiales[numero - 10];
        } else if (numero > 0) {
            texto += unidades[numero];
        }

        return texto.trim();
    }

    let textoFinal = '';
    const billones = Math.floor(numero / 1000000000000);
    const milesMillones = Math.floor((numero % 1000000000000) / 1000000000);
    const millones = Math.floor((numero % 1000000000) / 1000000);
    const miles = Math.floor((numero % 1000000) / 1000);
    const restante = numero % 1000;

    if (billones > 0) {
        if (billones === 1) {
            textoFinal += 'un billón ';
        } else {
            textoFinal += convertirGrupo(billones) + ' billones ';
        }
    }

    if (milesMillones > 0) {
        if (milesMillones === 1) {
            textoFinal += 'mil millones ';
        } else {
            textoFinal += convertirGrupo(milesMillones) + ' mil millones ';
        }
    }

    if (millones > 0) {
        if (millones === 1) {
            textoFinal += 'un millón ';
        } else {
            textoFinal += convertirGrupo(millones) + ' millones ';
        }
    }

    if (miles > 0) {
        if (miles === 1) {
            textoFinal += 'mil ';
        } else {
            textoFinal += convertirGrupo(miles) + ' mil ';
        }
    }

    if (restante > 0) {
        textoFinal += convertirGrupo(restante);
    }

    // Ajuste final para cambiar 'uno' por 'un' en casos necesarios
    var palabras = textoFinal.split(" "); // Dividir la cadena en palabras
    for (var i = 0; i < palabras.length; i++) {
        if (palabras[i] === 'uno' && i !== palabras.length - 1) {
            palabras[i] = 'un'; // Cambiar 'uno' por 'un'
        }
    }
    textoFinal = palabras.join(" "); // Unir las palabras de nuevo en una cadena

    return textoFinal.trim();
}