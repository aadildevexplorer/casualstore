import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CSVLink } from "react-csv";

const ButtonCSV = ({ data = [], type = `${type}` }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Headers based on type
    let headers = [];
    switch (type) {
      case "users":
        headers = ["#", "Name", "Email", "Password", "Date", "Time", "User Id"];
        break;

      case "orders":
        headers = ["#", "Order ID", "Price", "Date", "Status"];
        break;

      case "cookies":
        headers = [
          "#",
          "Consent",
          "IP",
          "User Agent",
          "Date",
          "Time",
          "Cookie ID",
        ];
        break;

      default:
        headers = [];
    }

    // based on type
    let rows = [];
    switch (type) {

      // users
      case "users":
        rows = data.map((item, index) => [
          index + 1,
          item.userName,
          item.email,
          item.password.slice(0, 10),
          item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "--",
          item.createdAt
            ? new Date(item.createdAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
          item._id,
        ]);
        break;

      // orders
      case "orders":
        rows = data?.map((item, index) => [
          index + 1,
          item._id, 
          item.totalAmount ? `$${item.totalAmount.toFixed(2)}` : "$0", // price
          item.orderDate ? new Date(item.orderDate).toLocaleDateString() : "--",
          item.orderStatus || "N/A",
        ]);

        break;

      // cookies
      case "cookies":
        rows = data.map((item, index) => [
          index + 1,
          item.consent || "--",
          item.ip || "--",
          item.userAgent || "--",
          item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "--",
          item.createdAt
            ? new Date(item.createdAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
          item._id || "--",
        ]);
        break;

      default:
        rows = [];
    }

    autoTable(doc, {
      head: [headers],
      body: rows,
      startY: 20,
    });

    doc.save(`${type}.pdf`);
  };

  // CSV mapping based on type
  const csvData = data?.map((item, index) => {
    switch (type) {
        
      // users
      case "users":
        return {
          "#": index + 1,
          Name: item.userName,
          Email: item.email,
          Password: item.password.slice(0, 10),
          Date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "--",
          Time: item.createdAt
            ? new Date(item.createdAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
          "User Id": item._id,
        };

      // orders
      case "orders":
        return {
          "#": index + 1,
          "Order ID": item._id,
          Amount: item.totalAmount ? `$${item.totalAmount.toFixed(2)}` : "$0",
          Date: item.orderDate
            ? new Date(item.orderDate).toLocaleDateString()
            : "--",
          Status: item.orderStatus || "N/A",
        };

      // cookies
      case "cookies":
        return {
          "#": index + 1,
          Consent: item.consent || "--",
          IP: item.ip || "--",
          "User Agent": item.userAgent || "--",
          Date: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString()
            : "--",
          Time: item.createdAt
            ? new Date(item.createdAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "N/A",
          "Cookie ID": item._id || "--",
        };

      default:
        return {};
    }
  });

  return (
    <div className="flex gap-4 text-sm">
      <CSVLink
        data={csvData}
        filename={`${type}.csv`}
        className="px-2 py-2 text-white bg-blue-500 rounded"
      >
        Download CSV
      </CSVLink>

      <button
        onClick={downloadPDF}
        className="px-2 py-2 text-white bg-green-500 rounded"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ButtonCSV;
