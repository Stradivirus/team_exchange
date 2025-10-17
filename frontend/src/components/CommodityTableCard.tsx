import React from "react";
import "../styles/CommodityTableCard.scss";
import { defaultColumns } from "../constants/sampleDatas";

// 기존 Row 타입 유지 (하위 호환성)
export type Row = {
  name: string;        
  month: string;       
  unit: string;        
  price: number;       
  diff: number;        
  rate: number;        
  baseDate: string;    
  exchange?: string;    
};

// 새로운 제네릭 컬럼 정의
export interface TableColumn<T = any> {
  key: keyof T | string;
  header: string;
  className?: string;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
}

// Props 인터페이스 - 기존 방식과 새로운 방식 모두 지원
interface Props<T = Row> {
  title?: string;
  rows: T[];
  columns?: TableColumn<T>[];
  // 하위 호환성을 위한 기존 속성들
  className?: string;
}

const CommodityTableCard = <T extends Record<string, any> = Row>({ 
  title = "Grains", 
  rows, 
  columns = defaultColumns as TableColumn[],
  className = ""
}: Props<T>) => {

  
  const renderCellContent = (column: TableColumn<T>, row: T, index: number) => {
    const value = typeof column.key === 'string' ? row[column.key] : row[column.key as keyof T];
    
    if (column.render) {
      return column.render(value, row, index);
    }
    
    return value;
  };

  const getCellClassName = (column: TableColumn<T>) => {
    const classes = [];
    if (column.className) classes.push(column.className);
    if (column.align) classes.push(column.align);
    return classes.join(' ');
  };

  return (
    <div className={`card commodityTableCard ${className}`} role="region" aria-label={title}>
      <div className="cardHeader">
        <h3>{title}</h3>
      </div>

      <div className="cardBody">
        <table className="cTable">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={getCellClassName(column)}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="empty" colSpan={columns.length}>데이터가 없습니다</td>
              </tr>
            ) : (
              rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className={getCellClassName(column)}>
                      {renderCellContent(column, row, rowIndex)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommodityTableCard;