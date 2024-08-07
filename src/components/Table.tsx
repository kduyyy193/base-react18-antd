import { Table as TableAnt } from "antd";
import { FilterValue, TableCurrentDataSource } from "antd/es/table/interface";
import { TablePaginationConfig, TableProps } from "antd/lib";
import { SorterResult } from "antd/lib/table/interface";

type TypeTableProps = TableProps & {
  onChangePagination: (pagination: TablePaginationConfig) => void;
  onChangeSorter: (sorter: SorterResult<any> | SorterResult<any>[]) => void;
  onChangeFilter: (filters: Record<string, FilterValue | null>) => void;
  totalsItem: number;
};

const Table = ({
  dataSource,
  columns,
  onChangePagination,
  onChangeSorter,
  onChangeFilter,
  totalsItem,
  ...props
}: TypeTableProps) => {
  const handleChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
    extra: TableCurrentDataSource<any>
  ): void => {
    switch (extra?.action) {
      case "paginate":
        onChangePagination(pagination);
        break;
      case "sort":
        onChangeSorter(sorter);
        break;
      default:
        onChangeFilter(filters);
        break;
    }
  };

  return (
    <>
      <TableAnt columns={columns} dataSource={dataSource} onChange={handleChange} {...props} />
      {+totalsItem > 0 && (
        <div className="ml-4 mt-4">
          Total: <strong className="font-bold text-black pb-8">{totalsItem}</strong> records
        </div>
      )}
    </>
  );
};

export default Table;
