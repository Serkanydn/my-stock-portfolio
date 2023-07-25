import AddPortfolio from "@/components/modals/addPortfolio";
import AddStock from "@/components/modals/addStock";
import DeletePortfolio from "@/components/modals/deletePortfolio";
import DeleteStock from "@/components/modals/deleteStock";
import recordsTable from "@/components/modals/recordsTable";
import DeleteStockRecord from "@/components/modals/deleteStockRecord";
import UpdateStockRecord from "@/components/modals/updateStockRecord";
import AddRecordModal from "@/components/modals/addRecord";

const modals = [
  { name: "addPortfolio", element: AddPortfolio },
  { name: "addStock", element: AddStock },
  { name: "updateStockRecord", element: UpdateStockRecord },
  { name: "deleteStock", element: DeleteStock },
  { name: "deletePortfolio", element: DeletePortfolio },
  { name: "recordsTable", element: recordsTable },
  { name: "deleteStockRecord", element: DeleteStockRecord },
  { name: "addRecord", element: AddRecordModal },
];

export default modals;
