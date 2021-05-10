import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
export default function Productcreate() {
  let history = useHistory();
  let formik = useFormik({
    initialValues: {
      name: "",
      color: "",
      model: "",
      avail: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Required";
      }
      if (!values.color) {
        errors.color = "Required";
      }
      if (!values.model) {
        errors.model = "Required";
      }
      if (!values.avail) {
        errors.avail = "Required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log("Final Values", values);
      let name = values.name;
      let color = values.color;
      let model = values.model;
      let available = values.avail;
      await fetch("https://60746f03066e7e0017e79e59.mockapi.io/productreact", {
        method: "POST",
        body: JSON.stringify({
          name,
          color,
          model,
          available,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      history.push("/products");
    },
  });
  let goback= ()=>{
    history.push("/products")
  }
  return (
    <>
      <h1> Product Create</h1>

      <p> Create a new product here </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="name"> Name</label>
              <input
                className="form-control"
                id="name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors.name && formik.touched.name ? (
                <div> {formik.errors.name}</div>
              ) : null}
            </div>
            <div className="col-lg-6">
              <label htmlFor="color"> Color</label>
              <input
                className="form-control"
                id="color"
                name="color"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.color}
              />
              {formik.errors.color && formik.touched.color ? (
                <div> {formik.errors.color}</div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="model"> Model</label>
              <input
                className="form-control"
                id="model"
                name="model"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.model}
              />
              {formik.errors.model && formik.touched.model ? (
                <div> {formik.errors.model}</div>
              ) : null}
            </div>
            <div className="col-lg-6">
              <label htmlFor="avail"> Available</label>
              <input
                className="form-control"
                id="avail"
                name="avail"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.avail}
              />
              {formik.errors.avail && formik.touched.avail ? (
                <div> {formik.errors.avail}</div>
              ) : null}
            </div>
          </div>
          <div className="row mt-3">
            <input type="submit" className="btn btn-primary" value="Submit" /> &nbsp; &nbsp;
            <button type="button" className="btn btn-warning" onClick={goback}>Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
}
