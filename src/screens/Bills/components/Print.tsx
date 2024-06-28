// import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    Image,
    StyleSheet,
  } from '@react-pdf/renderer';
  
  import { ISaleData } from '@/shared/interfaces/Sale/ISaleDetail';
  
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      padding: 20,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    logo: {
      width: 90,
      height: 90,
      marginRight: 10,
    },
    title: {
      fontSize: 24,
    },
    sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    section: {
      width: '46%',
      padding: 10,
      borderWidth: 1,
      borderColor: '#e4e4e4',
      borderRadius: 5,
    },
    sectionTitle: {
      fontSize: 16,
      marginBottom: 10,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    label: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    value: {
      fontSize: 12,
    },
    table: {
      width: '100%',
      borderWidth: 1,
      borderColor: '#e4e4e4',
      borderRadius: 5,
      overflow: 'hidden',
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#f2f2f2',
      padding: 8,
    },
    tableHeaderCell: {
      flex: 1,
      textAlign: 'left',
      fontSize: 12,
      fontWeight: 'bold',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e4e4e4',
      padding: 8,
    },
    tableBodyCell: {
      flex: 1,
      fontSize: 12,
    },
  });
  
  const formatCurrency = (value : number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'DOP',
    }).format(value);
  };
  
  const Print = ({ saleData }: { saleData: ISaleData }) => {
    const { preOrder, amount, itbis, fecha, amountBase } = saleData;
    const { client, preOrderProducts } = preOrder;
  
    return (
      <Document>
        <Page style={styles.page}>
          <View style={styles.titleContainer}>
            <Image style={styles.logo} src="https://lh4.googleusercontent.com/QOa6Hc4BVXS8rWrTzcNJ2_QB-iXdV0QbpIQDzOBrkgGQCUn1waF9vkcTUL6q5JlZI1Lc_zDFP9Q8jijyh1E0ZcI" />
            <Text style={styles.title}>Factura Bordados Roraima</Text>
          </View>
          
          {/* Information Sections Container */}
          <View style={styles.sectionContainer}>
            {/* Client Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información del Cliente</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>{`${client.f_name} ${client.f_surname} ${client.l_surname}`}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>RNC:</Text>
                <Text style={styles.value}>{client.rnc}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>DNI:</Text>
                <Text style={styles.value}>{client.dni}</Text>
              </View>
            </View>
  
            {/* Invoice Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Información de la Factura</Text>
              <View style={styles.row}>
                <Text style={styles.label}>Fecha:</Text>
                <Text style={styles.value}>{new Date(fecha).toLocaleString()}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Monto:</Text>
                <Text style={styles.value}>{formatCurrency(amountBase)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>ITBIS:</Text>
                <Text style={styles.value}>{formatCurrency(itbis)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Total a Pagar:</Text>
                <Text style={styles.value}>{formatCurrency(amount)}</Text>
              </View>
            </View>
          </View>
  
          {/* Products Table */}
          <Text style={styles.sectionTitle}>Productos</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Id</Text>
              <Text style={styles.tableHeaderCell}>Producto</Text>
              <Text style={styles.tableHeaderCell}>Color</Text>
              <Text style={styles.tableHeaderCell}>Cantidad</Text>
              <Text style={styles.tableHeaderCell}>Tamaño</Text>
              <Text style={styles.tableHeaderCell}>Precio</Text>
              <Text style={styles.tableHeaderCell}>Precio Total</Text>
            </View>
            {preOrderProducts.map((product) => (
              <View key={product.id} style={styles.tableRow}>
                <Text style={styles.tableBodyCell}>{product.product.id}</Text>
                <Text style={styles.tableBodyCell}>{product.product.namE_PRODUCT}</Text>
                <Text style={styles.tableBodyCell}>{product.colorPrimary.colorname}</Text>
                <Text style={styles.tableBodyCell}>{product.quantity}</Text>
                <Text style={styles.tableBodyCell}>{product.size.size}</Text>
                <Text style={styles.tableBodyCell}>{formatCurrency(product.custoM_PRICE)}</Text>
                <Text style={styles.tableBodyCell}>{formatCurrency(product.quantity * product.custoM_PRICE)}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );
  };
  
  export default Print;
  