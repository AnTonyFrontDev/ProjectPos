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
import { LOGORORAIMA } from '@/shared/constants/UrlPictures';

const PreOrderPrint = ({ Data }: { Data: any }) => {
  const { client, items, dateCreated, dateDelivery } = Data;
  const { preOrderProducts, invColors } = items;
  const { phones } = client[0]; // Accessing the first client's phones

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.titleContainer}>
          <Image style={pdfStyles.logo} src={LOGORORAIMA} />
          <Text style={pdfStyles.title}>Pedido Bordados Roraima</Text>
        </View>

        {/* Information Sections Container */}
        <View style={pdfStyles.sectionContainer}>
          {/* Client Information Section */}
          <View style={pdfStyles.sectionComplet}>
            <Text style={pdfStyles.sectionTitle}>Información de el Pedido</Text>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Cliente:</Text>
              <Text style={pdfStyles.value}>{`${client[0].f_name} ${client[0].f_surname} ${client[0].l_surname}`}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>RNC:</Text>
              <Text style={pdfStyles.value}>{client[0].rnc}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Teléfono del Cliente:</Text>
              <Text style={pdfStyles.value}>{phones[0].number}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Fecha:</Text>
              <Text style={pdfStyles.value}>{new Date(dateCreated).toLocaleString()}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Fecha de Entrega:</Text>
              <Text style={pdfStyles.value}>{new Date(dateDelivery).toLocaleString()}</Text>
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
          {invColors.map((product: any) => (
            <View key={preOrderProducts.id} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableBodyCell}>{product.product.id}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.product.name_prod}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.colorPrimary.colorname}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.quantity}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.size.size}</Text>
              <Text style={pdfStyles.tableBodyCell}>{FormatCurrency(product.product.sale_price)}</Text>
              <Text style={pdfStyles.tableBodyCell}>{FormatCurrency(product.quantity * product.product.sale_price)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PreOrderPrint;
