const ingresos = [

];

const egresos = [

];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngreso = () => {
    let totalIngresos = 0;
    for (let ingreso of ingresos) {
        totalIngresos += ingreso.valor;
    }
    return totalIngresos;
}

let totalEgreso = () => {
    let totalEgresos = 0;
    for (let egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () => {
    let presupuesto = totalIngreso() - totalEgreso();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngreso());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgreso());
}

let formatoMoneda = (valor) => {
    // Convertir el valor en una cadena poética con el estilo de la moneda mexicana
    return valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (let ingreso of ingresos) {
        ingresosHTML += crearIngresosHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresosHTML = (ingreso) => {
    let ingresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>`;
    return ingresoHTML;
}

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for (let egreso of egresos) {
        egresosHTML += crearEgresosHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresosHTML = (egreso) => {
    let egresoHTML = `
        <div class="elemento limpiarEstilos">
            <div class="elemento_descripcion">${egreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>`;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const agregarIngreso = () => {
    let descripcion = document.getElementById('descripcion').value;
    let valor = parseFloat(document.getElementById('valor').value);

    if (descripcion !== '' && !isNaN(valor) && valor > 0) {
        ingresos.push(new Ingreso(descripcion, valor));
        cargarCabecero();
        cargarIngresos();
        limpiar();
    }
}

const agregarEgreso = () => {
    let descripcion = document.getElementById('descripcion').value;
    let valor = parseFloat(document.getElementById('valor').value);

    if (descripcion !== '' && !isNaN(valor) && valor > 0) {
        egresos.push(new Egreso(descripcion, valor));
        cargarCabecero();
        cargarEgresos();
        limpiar();

    }
}

const limpiar = () => {
    // Limpiar campos después de agregar
    document.getElementById('descripcion').value = '';
    document.getElementById('valor').value = '';
}