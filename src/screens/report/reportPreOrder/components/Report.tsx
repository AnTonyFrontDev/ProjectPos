import { getReportDiffItemsToComplete } from "@/shared/Api/Report/preOrder/preOrderApi";
import { IReportDiffItems } from "@/shared/interfaces/report/IReportDiffItems";
import { useEffect, useState } from "react";

const Report = (props: { idPreOrder: number }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IReportDiffItems[]>();
  useEffect(() => {
    const GetData = async () => {
      setData(await getReportDiffItemsToComplete(props.idPreOrder));
      setLoading(false);
    };
    GetData();
  }, []);
  if (loading) {
    return <div> Loading...</div>;
  }
  return (
    <div>
      {Array.isArray(data) &&
        data.map((item) => (
          <div>
            <div>
              <h2>Producto: {item.productName}</h2>
              <h3>Size: {item.sizes.map((item)=>(<>{item.size}</>))}</h3>
            </div>
            <div>
              Sizes faltantes:
              <ul>
                {item.missingSizes.length ==0 &&(<li>No hay sizes faltantes</li>)}
                {item.missingSizes.map((size)=>(<li>{size}</li>))}
              </ul>
            </div>
            <br></br>
          </div>
        ))}
    </div>
  );
};

export default Report;
