import * as XLSX from 'xlsx';

/**
 * 导出表格数据为多种格式
 * @param {Array} data - 要导出的数据数组
 * @param {String} fileName - 文件名(不带扩展名)
 * @param {String} fileType - 导出类型: 'xlsx', 'csv', 'json'
 */
export function exportTableData(data, fileName = 'exported-data', fileType = 'xlsx') {
  if (!data || !Array.isArray(data) || data.length === 0) {
    console.error('导出数据不能为空');
    return;
  }

  try {
    switch (fileType.toLowerCase()) {
      case 'xlsx':
        exportToXLSX(data, fileName);
        break;
      case 'csv':
        exportToCSV(data, fileName);
        break;
      case 'json':
        exportToJSON(data, fileName);
        break;
      default:
        console.error('不支持的导出格式');
    }
  } catch (error) {
    console.error('导出失败:', error);
  }
}

// 导出为Excel (XLSX)
function exportToXLSX(data, fileName) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

// 导出为CSV
function exportToCSV(data, fileName) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
  downloadFile(csvOutput, `${fileName}.csv`, 'text/csv;charset=utf-8;');
}

// 导出为JSON
function exportToJSON(data, fileName) {
  const jsonString = JSON.stringify(data, null, 2);
  downloadFile(jsonString, `${fileName}.json`, 'application/json');
}

// 通用文件下载方法
function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}
