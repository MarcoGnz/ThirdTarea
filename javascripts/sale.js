const productos = {
    1: { nombre: "Mezcla original 200g", precio: 500 },
    2: { nombre: "Mezcla original 500g", precio: 900 },
    3: { nombre: "Mezcla especial 200g", precio: 700 },
    4: { nombre: "Mezcla especial 500g", precio: 1200 }
};
const selectElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = []

/*
function calc() {
    const price = parseInt(priceElement.value);
    const number = parseInt(numberElement.value);
    window.alert(`${price} guaranes por ${number} unidades。Subtotal: ${price * number} guaranies`);
}
*/

function calc() {
    const sum = subtotal();
    const postage = calcPostageFromPurchase(sum);
    window.alert(`${display()}\n El subtotal es de ${sum} Guaranies, los gastos de envío son: ${postage} Guaranies. Total: ${sum + postage} Guaranies.`);
    purchases = [];
    selectElement.value = "";
    numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
    if (sum == 0 || sum >= 3000) {
        return 0;
    } else if (sum < 2000) {
        return 500;
    } else {
        return 250;
    }
}

function add() {
    // Obtener el valor numérico del campo de precio y cantidad.
    const claveProducto = parseInt(selectElement.value);
    const selectedProd = productos[claveProducto];
    const price = selectedProd.precio;
    const number = parseInt(numberElement.value);
    const name = selectedProd.nombre;

    // Crear un objeto 'purchase' con las propiedades 'price' y 'number'.
    let purchase = {
        price: parseInt(price),
        number: parseInt(number),
        nombre: name,
    };

    // Buscar si ya existe una compra con el mismo precio.
    const newPurchase = purchases.findIndex((item) => item.price === purchase.price); // --1

    // Verificar si el arreglo 'purchases' está vacío o si no se encontró una compra con el mismo precio. 
    if (purchases.length < 1 || newPurchase === -1) { // --2
        // Agregar la nueva compra al arreglo 'purchases'.
        purchases.push(purchase);
    } else {
        // Si ya existe una compra con el mismo precio, incrementar la cantidad de esa compra. 
        purchases[newPurchase].number += purchase.number; // --3
    }

    // Mostrar un mensaje con el contenido de las compras y el subtotal.
    window.alert(`${display()}\nSubtotal: ${subtotal()} guaraníes.`);
}

// Función 'display' que crea una cadena con información sobre las compras.
function display() {
    // Utiliza el método 'map' en el arreglo 'purchases' para transformar cada compra en una cadena de información.
    // Luego, utiliza 'join' para combinar todas las cadenas en una sola, separadas por saltos de línea.
    return purchases.map(purchase => {
        return `Precio de ${purchase.nombre} es: ${purchase.price} Guaraníes. Cantidad: ${purchase.number}.`
    }).join("\n");
}

// Función 'subtotal' que calcula el subtotal de todas las compras.
function subtotal() {
    // Utiliza el método 'reduce' en el arreglo 'purchases' para acumular el subtotal de todas las compras.
    // Inicia desde 0 y suma el producto del precio y la cantidad de cada compra al valor previo.
    return purchases.reduce((prev, purchase) => {
        return prev + purchase.price * purchase.number;
    }, 0);
}