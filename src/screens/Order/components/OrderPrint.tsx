// import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  Image,
} from '@react-pdf/renderer';
// import { FormatCurrency } from '@/shared/Common/FormatCurrency';
import { LOGORORAIMA } from '@/shared/constants/UrlPictures';
import pdfStyles from '@/shared/Common/stylesConst/PrintStyles';

const OrderPrint = ({ Data }: { Data: any }) => {
  const { detail, fullName, descriptionJob, observation, statusOrder } = Data;
  const client = detail[0]; // Assuming all details belong to the same client

  return (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.titleContainer}>
          <Image style={pdfStyles.logo} src={LOGORORAIMA} />
          <Text style={pdfStyles.title}>Orden de Trabajo Bordados Roraima</Text>
        </View>

        {/* Information Sections Container */}
        <View style={pdfStyles.sectionContainer}>
          {/* Client Information Section */}
          <View style={pdfStyles.sectionComplet}>
            <Text style={pdfStyles.sectionTitle}>Información de la Orden</Text>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Cliente:</Text>
              <Text style={pdfStyles.value}>{fullName}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Estado del Pedido:</Text>
              <Text style={pdfStyles.value}>{statusOrder}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Descripción del Trabajo:</Text>
              <Text style={pdfStyles.value}>{descriptionJob}</Text>
            </View> 
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Observacion:</Text>
              <Text style={pdfStyles.value}>{observation}</Text>
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
            <Text style={pdfStyles.tableHeaderCell}>Tamaño</Text>
            <Text style={pdfStyles.tableHeaderCell}>Cantidad</Text>
          </View>
          {client.products.map((product: any) => (
            <View key={product.id} style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableBodyCell}>{product.id}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.productName}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.colorPrimary.colorname}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.size}</Text>
              <Text style={pdfStyles.tableBodyCell}>{product.quantity}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default OrderPrint;
