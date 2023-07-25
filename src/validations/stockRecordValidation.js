import * as Yup from "yup";

const StockRecordSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  cost: Yup.number().required("Required"),
  piece: Yup.number().required("Required"),
  action: Yup.string().required("Required"),
  commission: Yup.number().required("Required"),
  date: Yup.date().required("Required"),
  time: Yup.string().required("Required"),
});

export default StockRecordSchema;
