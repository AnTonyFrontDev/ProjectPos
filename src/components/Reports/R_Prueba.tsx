// import React from 'react';
// import { Document, Page, Text, View } from "@react-pdf/renderer";
// import { styles } from './style';


// interface DetallePreOrdersProps {
//     detallePreOrder: any; // Assuming the prop has any type for now
// }

// const columns = [
//     { title: 'ID', dataIndex: 'id', key: 'id' },
//     { title: 'Nombre', dataIndex: 'productName', key: 'productName' },
//     { title: 'Tamaño', dataIndex: 'size', key: 'size' },
//     { title: 'Color Primario', dataIndex: 'colorPrimary', key: 'colorPrimary' },
//     { title: 'Precio', dataIndex: 'price', key: 'price' },
//     { title: 'Cantidad', dataIndex: 'quantity', key: 'quantity' },
// ];

// const R_Prueba: React.FC<DetallePreOrdersProps> = ({ detallePreOrder }) => {
//     const { client, items } = detallePreOrder;

//     return (
//         <Document>
//             <Page size="A4">
//                 <View style={styles.container}>
//                     <View style={styles.headerContainer}>
//                         <View style={styles.businessInfo}>
//                             <Text style={styles.companyName}>COMERCIAL ZYL</Text>
//                             <Text style={styles.taxId}>RNC 101000001</Text>
//                         </View>
//                         <View style={styles.invoiceInfo}>
//                             <Text style={styles.issueDate}>Fecha Emisión: 27-01-2020</Text> {/* Assuming you have this data */}
//                             <Text style={styles.dueDate}>Fecha Vencimiento: 31-12-2021</Text> {/* Assuming you have this data */}
//                         </View>
//                     </View>
//                     <View style={styles.clientInfo}>
//                         <Text style={styles.clientLabel}>Cliente:</Text>
//                         <Text>{`${client[0].f_name} ${client[0].l_name}`}</Text>
//                         <Text>{`${client[0].f_surname} ${client[0].l_surname}`}</Text>
//                         {client[0].companyName && (
//                             <Text>Razón Social Cliente: {client[0].companyName}</Text>
//                         )}
//                         <Text>RNC: {client[0].rnc}</Text>
//                         <Text>DNI: {client[0].dni}</Text>
//                         <Text>Teléfonos:</Text>
//                         {client[0].phones.map((phone: any) => (
//                             <Text key={phone.id}>{phone.number}</Text>
//                         ))}
//                     </View>
//                     <View style={styles.table}>
//                         <View style={styles.tableHeader}>
//                             {columns.map((column) => (
//                                 <Text style={styles.tableHeaderCell} key={column.dataIndex}>
//                                     {column.title}
//                                 </Text>
//                             ))}
//                         </View>
//                         {items.map((item: any) => (
//                             <View style={styles.tableRow} key={item.id}>
//                                 <Text style={styles.tableCell}>{item.quantity}</Text> {/* Assuming data for each column exists */}
//                                 <Text style={styles.tableCell}>{item.description}</Text>
//                                 <Text style={styles.tableCell}>{item.unitOfMeasure}</Text>
//                                 <Text style={styles.tableCell}>{item.price}</Text>
//                                 <Text style={styles.tableCell}>{/* Calculate and display ITBIS here */}</Text>
//                                 <Text style={styles.tableCell}>{/* Calculate and display total value here */}</Text>
//                             </View>
//                         ))}
//                     </View>
//                     <View style={styles.totals}>
//                         <Text style={styles.subtotal}>Subtotal Gravado: {/* Calculate and display subtotal here */}</Text>
//                         <Text style={styles.totalItbis}>Total ITBIS: {/* Calculate and display total ITBIS here */}</Text>
//                         <Text style={styles.total}>Total: {/* Calculate and display overall total here */}</Text>
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     );
// };

// export default R_Prueba;
