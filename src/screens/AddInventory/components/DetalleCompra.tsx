import React, { useEffect, useState } from 'react';
import { Descriptions, Modal, Table } from 'antd';
// import ButtonModal from '@/components/Generics/Modal/ButtonModal';
// import ViewForm from '@/components/FormularioV4/viewForm';
import { IBuyInventoryGet } from '@/shared/interfaces/IBuyInventory';
import { getBuyById, RemoveBuy } from '@/shared/Api/BuyApi';
import { BuyDetailTable } from '@/components/Generics/Tabla/tData';
import BackButton from '@/components/Generics/BackButton';

const DetalleCompra: React.FC<IBuyInventoryGet> = ({ id: buyId }) => {
    const [detalleCompra, setDetalleCompra] = useState<IBuyInventoryGet>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!buyId) {
                    return;
                }
                console.log('entro');
                const compraData = await getBuyById(buyId);
                console.log(compraData);
                setDetalleCompra(compraData);
                console.log(compraData);
            } catch (error) {
                console.error('Error al obtener detalle de la compra:', error);
            }
        };

        fetchData();
    }, [buyId]);

    const handleRemoveClient = async () => {
        try {
            if (!buyId) {
                console.log('No hay id');
                return;
            }
            const response = await RemoveBuy(buyId);
            window.location.href = '/customers';
            console.log('Compra eliminada exitosamente:', response);
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    const showConfirm = () => {
        Modal.confirm({
            title: 'Confirmar',
            content: '¿Está seguro de que desea eliminar este registro?',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk: handleRemoveClient,
        });
    };


    if (!detalleCompra) {
        return <div>Cargando...</div>;
    }

    const { company, rnc, ncf, datE_MADE, totaL_SALE, details } = detalleCompra;


    return (
        <div className="mt-2 mb-8">
            {errorMessage && <p className="text-red-500 w-full">{errorMessage}</p>}
            <div className="flex items-center space-x-4 mb-4">
                <BackButton />
                <h2 className="text-2xl font-bold text-gray-800">
                    Compra Numero {buyId}
                </h2>
            </div>
            {/* Descriptions for the main purchase details */}
            <Descriptions title="Detalles de la Compra" className="mb-4">
                <Descriptions.Item label="Empresa">{company}</Descriptions.Item>
                <Descriptions.Item label="RNC">{rnc}</Descriptions.Item>
                <Descriptions.Item label="NCF">{ncf}</Descriptions.Item>
                <Descriptions.Item label="Fecha de Compra">
                    {datE_MADE ? new Date(datE_MADE).toLocaleDateString() : 'Fecha no disponible'}
                </Descriptions.Item>
                <Descriptions.Item label="Total de Venta">${totaL_SALE}</Descriptions.Item>
            </Descriptions>

            {/* Table for the details of the products */}
            <Table
                columns={BuyDetailTable}
                dataSource={details}
                rowKey="id"
                pagination={false}
            />

            <div className="flex mt-4">
                {/* Botón para editar */}
                {/* <ButtonModal
                    buttonText="Editar"
                    modalTitle=""
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded'
                    size={15}
                    modalContent={<ViewForm usarForm="Client" formData={detalleCompra} isUpdate={true} updateData={detalleCompra} />}
                /> */}
                {/* Botón para eliminar */}
                <button
                    onClick={showConfirm}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default DetalleCompra;
