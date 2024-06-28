// import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
} from '@react-pdf/renderer';
import { FormatCurrency } from '@/shared/Common/FormatCurrency';
import pdfStyles from '@/shared/Common/stylesConst/PrintStyles';

import { ISaleData } from '@/shared/interfaces/Sale/ISaleDetail';


const Print = ({ Data }: { Data: ISaleData }) => {
  const { preOrder, amount, itbis, fecha, amountBase } = Data;
  const { client, preOrderProducts } = preOrder;

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.titleContainer}>
          <Image style={pdfStyles.logo} src="https://lh4.googleusercontent.com/QOa6Hc4BVXS8rWrTzcNJ2_QB-iXdV0QbpIQDzOBrkgGQCUn1waF9vkcTUL6q5JlZI1Lc_zDFP9Q8jijyh1E0ZcI" />
          <Text style={pdfStyles.title}>Factura Bordados Roraima</Text>
        </View>

        {/* Information Sections Container */}
        <View style={pdfStyles.sectionContainer}>
          {/* Client Information Section */}
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Información del Cliente</Text>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Nombre:</Text>
              <Text style={pdfStyles.value}>{`${client.f_name} ${client.f_surname} ${client.l_surname}`}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>RNC:</Text>
              <Text style={pdfStyles.value}>{client.rnc}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>DNI:</Text>
              <Text style={pdfStyles.value}>{client.dni}</Text>
            </View>
          </View>

          {/* Invoice Information Section */}
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>Información de la Factura</Text>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Fecha:</Text>
              <Text style={pdfStyles.value}>{new Date(fecha).toLocaleString()}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Monto:</Text>
              <Text style={pdfStyles.value}>{FormatCurrency(amountBase)}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>ITBIS:</Text>
              <Text style={pdfStyles.value}>{FormatCurrency(itbis)}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Total a Pagar:</Text>
              <Text style={pdfStyles.value}>{FormatCurrency(amount)}</Text>
            </View>
          </View>
        </View>

        {/* Products Table */}
        <Text style={pdfStyles.sectionTitle}>Productos</Text>
        <View style={pdfStyles.table}>
          <View style={pdfStyles.tableHeader}>
            <Text style={pdfStyles.tableHeaderCell}>Id</Text>
            <Text style={pdfStyles.tableHeaderCell}>Producto</Text>
            <Text style={pdfStyles.tableHeaderCell}>Color</Text>
            <Text style={pdfStyles.tableHeaderCell}>Cantidad</Text>
            <Text style={pdfStyles.tableHeaderCell}>Tamaño</Text>
            <Text style={pdfStyles.tableHeaderCell}>Precio</Text>
            <Text style={pdfStyles.tableHeaderCell}>Precio Total</Text>
          </View>
          {preOrderProducts.map((product) => (
            <View key={product.id} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableBodyCell}>{product.product.id}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.product.namE_PRODUCT}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.colorPrimary.colorname}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.quantity}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.size.size}</Text>
              <Text style={pdfStyles.tableBodyCell}>{FormatCurrency(product.custoM_PRICE)}</Text>
              <Text style={pdfStyles.tableBodyCell}>{FormatCurrency(product.quantity * product.custoM_PRICE)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Print;
