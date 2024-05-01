import { useEffect } from 'react'
import { useState } from 'react';
import SearchFilter from '@/shared/SearchFilter';
import ApiTable from '@/components/Generics/Tabla/apiTable';
import { getInventoryByIdBeta } from '@/shared/Api/Inventory/InventoryApi';
import { AppIcon } from '@/components/ui/AppIcon';
getInventoryByIdBeta

interface ProcessedDataItem {
    size: string;
    colorName: string;
    quantity: number;
    idCategory: string;
    icon: JSX.Element;
  }

function Tabla()  {

    const [tableData, setTableData] = useState<ProcessedDataItem[]>([]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filterColumn, setFilterColumn] = useState<string>('');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    
    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handleFilterChange = (value: string) => {
        setFilterColumn(value);
    };

    const handleSortToggle = () => {
        setSortDirection((prevSortDirection) => (prevSortDirection === 'asc' ? 'desc' : 'asc') as 'asc' | 'desc');
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getInventoryByIdBeta(1); 
            const processedData = processData(data);
            setTableData(processedData);
          } catch (error) {
            console.error('Error fetching inventory:', error);
          }
        };
        fetchData();
      }, []);
    
      const processData = (data: any[]) => {
        const sizeQuantityMap: { [key: string]: any } = {};
        data.forEach((item: any) => {
          item.availableSizes.forEach((size: any) => {
            size.availableColors.forEach((color: any) => {
              color.colorPrimary.forEach((primaryColor: any) => {
                const key = `${primaryColor.colorname}-${size.idCategory}`;
                if (!sizeQuantityMap[key]) {
                  sizeQuantityMap[key] = { quantity: 0, code: primaryColor.code };
                }
                sizeQuantityMap[key].quantity += size.quantity;
              });
            });
          });
        });
    
        const processedData: ProcessedDataItem[] = [];
        for (const key in sizeQuantityMap) {
          if (sizeQuantityMap.hasOwnProperty(key)) {
            const [colorName, categoryId] = key.split('-');
            const { quantity, code } = sizeQuantityMap[key];
            const sizes = data
              .filter((item: any) => {
                return item.availableSizes.some((size: any) => {
                  const color = size.availableColors.find((color: any) => color.colorPrimary.some((primary: any) => primary.colorname === colorName));
                  return color && size.idCategory.toString() === categoryId;
                });
              })
              .map((item: any) => {
                const size = item.availableSizes.find((size: any) => {
                  const color = size.availableColors.find((color: any) => color.colorPrimary.some((primary: any) => primary.colorname === colorName));
                  return color && size.idCategory.toString() === categoryId;
                });
                return `${size.size}: ${size.quantity}`;
              })
              .join(' ');
    
            processedData.push({
              size: sizes,
              colorName: colorName,
              quantity: quantity,
              idCategory: categoryId,
              icon: (
                <div className="flex items-center">
                  <AppIcon type="colors" style={{ color: code }} className="cursor-pointer" width={28} />
                  <span className="ml-2">{colorName}</span>
                </div>
              ),
            });
          }
        }
        return processedData;
      };

    const columns = [
        {
          title: 'Color Primario',
          dataIndex: 'icon',
          key: 'icon',
        },
        {
          title: 'Tamaño',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: 'Cantidad Disponible',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Categoría Size',
          dataIndex: 'idCategory',
          key: 'idCategory',
        },
      ];
    

    return (
        <>
            <div className="col-span-2 bg-gray-50 shadow-lg my-14 p-4 rounded-md flex justify-between">
                <SearchFilter
                    onSearch={handleSearch}
                    onFilterChange={handleFilterChange}
                    onSortToggle={handleSortToggle}
                    columns={columns}
                />
            </div>
            <ApiTable
                dataSource={tableData}
                columns={columns}
                searchTerm={searchTerm}
                filterColumn={filterColumn}
                sortDirection={sortDirection}
                showActions={false}
            />
        </>
    )
}

export default Tabla