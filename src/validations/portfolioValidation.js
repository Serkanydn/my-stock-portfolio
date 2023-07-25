import * as Yup from "yup";

const PortfolioSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
});

export default PortfolioSchema;
