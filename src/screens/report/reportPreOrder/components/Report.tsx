import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable'
import { getPreOrderById } from '@/shared/Api/PreOrder/PreOrderApi';


const PreOrderReport: React.FC<{ id: number }> = ({ id }) => {
  const [detallePreOrder, setDetallePreOrder] = useState<any>(null);
  const [errorr, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const preOrderData = await getPreOrderById(id);
        setDetallePreOrder(preOrderData.data[0]); // Set invoice data
      } catch (error) {
        if (error instanceof Error) { // Check if it's an Error object
          setError(error);
        } else {
          console.error('Error al obtener detalle de la preorden:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  console.log(detallePreOrder)

  const { client = {}, items = [] } = detallePreOrder || {};

  console.log(client)

  const generarPDF = async () => {
    if (errorr) {
      console.error('Error fetching pre-order data:', errorr);
      return; // Prevent PDF generation if there's an error
    }
    // Extract invoice data from detallePreOrder
    const pedidoData = {
      Numeropedido: detallePreOrder.id || 'N/A', // Replace with actual property name
      Fecha: detallePreOrder?.dateCreated || 'N/A', // Replace with actual property name
      Cliente: detallePreOrder?.cliente || 'N/A', // Replace with actual property name
      f_name: client?.[0]?.f_name || 'N/A', // Replace with actual property name
      l_name: client?.[0]?.l_name || 'N/A', // Replace with actual property name
      f_surname: client?.[0]?.f_surname,
      l_surname: client?.[0]?.f_surname,
      rnc: client?.[0]?.rnc || 'N/A',
    };

    // Extract item data from detallePreOrder
    const itemData = items || [];

    // Generate the PDF using jsPDF (refer to previous code for the logic)
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.setTextColor(80);
    // Display invoice header information
    doc.text(`Cliente: ${pedidoData.f_name} ${pedidoData.l_name} ${pedidoData.f_surname} ${pedidoData.l_surname}`, 20, 20);
    doc.text(`Fecha: ${pedidoData.Fecha}`, 20, 30);
    doc.addImage('/logo.png', 140, 5, 60, 50); // Adjust image path and dimensions as needed
    doc.text(`RNC: ${pedidoData.rnc}`, 20, 60);

    // Configure table columns
    const columns = ['Producto', 'Color', 'Size', 'Cantidad', 'Precio', 'Precio Total'];

    // Prepare item data for the table
    const data = itemData.map((item: any) => {
      const totalPrice = item.quantity * item.price;
      [
        item.productName,
        item.colorPrimary,
        item.size,
        item.quantity,
        item.price,
        totalPrice
      ]
    });

    // Add the table to the PDF
    autoTable(doc, {
      startY: 65,
      head: [columns],
      body: data,
      styles: {
        cellPadding: 2,
        halign: 'center',
        valign: 'middle'
      },
      headStyles: {
        fillColor: '#f0f0f0',
        textColor: '#333',
        fontStyle: 'bold'
      },
      bodyStyles: {
        fillColor: '#fff',
        textColor: '#000'
      }
    });
    // Save the PDF with a filename based on the pre-order ID
    doc.save(`pedido_${id}.pdf`);
  };

  if (!detallePreOrder) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="pedido">
      <h1>pedido</h1>
      <button onClick={generarPDF}>Generar PDF</button>
    </div>
  );
};

export default PreOrderReport;
