// import React from 'react';
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';

// interface FacturaProps {
//     emisor: {
//         nombre: string;
//         rnc: string;
//         direccion: string;
//     };
//     cliente: {
//         nombre: string;
//         rnc: string;
//     };
//     productos: {
//         cantidad: number;
//         descripcion: string;
//         unidadMedida: string;
//         precio: number;
//         itbis: number;
//         total: number;
//     }[];
// }

// const Factura: React.FC<FacturaProps> = ({ emisor, cliente, productos }) => {
//     const generarPDF = () => {
//         const doc = new jsPDF();

//         // Encabezado de la factura
//         doc.setFontSize(16);
//         doc.text('Factura de Crédito Fiscal Electrónica', 20, 20);
//         doc.setFontSize(10);
//         doc.text('ZYL, SRL', 20, 30);
//         doc.text('e-NCF: E310000000001', 20, 40);
//         doc.text('Sucursal Gazcue', 20, 50);
//         doc.text('RNC 101000001', 20, 60);
//         doc.text('Dirección: Calle Segunda #01, Gazcue, Distrito Nacional, Rep. Dom.', 20, 70);
//         doc.text('Fecha Emisión: 27-01-2020', 20, 80);

//         // Datos del cliente
//         doc.setFontSize(12);
//         doc.text('Razón Social Cliente:', 160, 20);
//         doc.text(cliente.nombre, 160, 30);
//         doc.text('RNC Cliente:', 160, 40);
//         doc.text(cliente.rnc, 160, 50);

//         // Tabla de productos
        

//         // Resumen de totales
//         doc.text('Subtotal:', 20, 180);
//         doc.text(calcularSubtotal(productos).toFixed(2), 100, 180);
//         doc.text('ITBIS (18%):', 20, 190);
//         doc.text(calcularTotalItbis(productos).toFixed(2), 100, 190);
//         doc.text('Total General:', 20, 200);
//         doc.text(calcularTotalGeneral(productos).toFixed(2), 100, 200);

//         // Descarga del PDF
//         doc.save('Factura.pdf');

//         console.log('Factura generada y descargada como Factura.pdf');
//     };

//     const calcularSubtotal = (productos: FacturaProps['productos']) => {
//         let subtotal = 0;

//         productos.forEach(producto => {
//             subtotal += producto.precio * producto.cantidad;
//         });

//         return subtotal;
//     };

//     const calcularTotalItbis = (productos: FacturaProps['productos']) => {
//         let totalItbis = 0;

//         productos.forEach(producto => {
//             totalItbis += producto.itbis;
//         });

//         return totalItbis;
//     };

//     const calcularTotalGeneral = (productos: FacturaProps['productos']) => {
//         return calcularSubtotal(productos) + calcularTotalItbis(productos);
//     };
//     // Continuación del componente Factura.tsx con jsPDF

//     return (
//         <div>
//             <button onClick={generarPDF}>Generar Factura PDF</button>
//         </div>
//     );
// };

// export default Factura;
