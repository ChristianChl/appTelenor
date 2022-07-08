import * as XLSX from "xlsx";

const getFileName = (name: any) => {
  let timeSpan = new Date().toISOString();
  let sheetName = name || "ExportResult";
  let fileName = `${sheetName}-${timeSpan}`;
  return {
    sheetName,
    fileName
  };
};

export class TableUtil {
  static exportTableToExcel(tableId: string, tableId2: string, name?: string) {
    let { sheetName, fileName } = getFileName(name);
    let targetTableElm = document.getElementById(tableId);
    let targetTableElm2 = document.getElementById(tableId2);
    let wb = XLSX.utils.table_to_book(targetTableElm, <XLSX.Table2SheetOpts>{
      sheet: sheetName
    });
    let wb2 = XLSX.utils.table_to_book(targetTableElm2, <XLSX.Table2SheetOpts>{
        sheet: sheetName
      });
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  static exportArrayToExcel(arr: any[], arr2: any[],name?: string) {
    let { sheetName, fileName } = getFileName(name);

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(arr);
    var ws2 = XLSX.utils.json_to_sheet(arr2);
    XLSX.utils.book_append_sheet(wb, ws, "Detalles");
    XLSX.utils.book_append_sheet(wb, ws2, "Totales");
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}