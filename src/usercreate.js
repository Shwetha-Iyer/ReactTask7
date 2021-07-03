import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
export default function Usercreate() {
  let history = useHistory();
  let formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      mail: "",
      pass: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.fname) {
        errors.fname = "Required";
      }
      if (!values.lname) {
        errors.lname = "Required";
      }
      if (!values.mail) {
        errors.mail = "Required";
      }
      else if(!(values.mail.includes(".") && values.mail.includes("@"))){
        errors.mail = 'Invalid email address';
      }
      if (!values.pass) {
        errors.pass = "Required";
      }
      else if (values.pass.length < 5){
        errors.pass ="Password must be atleast 5 characters"
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log("Final Values", values);
      let firstname = values.fname;
      let lastname = values.lname;
      let email = values.mail;
      let password = values.pass;
      await fetch("https://60746f03066e7e0017e79e59.mockapi.io/userreact", {
        method: "POST",
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      history.push("/users");
    },
  });
  let goback= ()=>{
    history.push("/users")
  }
  return (
    <>
      <h1> User Create</h1>

      <p> Create a new user here </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="fname"> First Name</label>
              <input
                className="form-control"
                id="fname"
                fname="fname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.fname}
              />
              {formik.errors.fname && formik.touched.fname ? (
                <div> {formik.errors.fname}</div>
              ) : null}
              {
                console.log(formik.values.fname)
              }
            </div>
            <div className="col-lg-6">
              <label htmlFor="lname"> Last Name</label>
              <input
                className="form-control"
                id="lname"
                fname="lname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lname}
              />
              {formik.errors.lname && formik.touched.lname ? (
                <div> {formik.errors.lname}</div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <label htmlFor="mail"> Email</label>
              <input
                className="form-control"
                id="mail"
                fname="mail"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mail}
              />
              {formik.errors.mail && formik.touched.mail ? (
                <div> {formik.errors.mail}</div>
              ) : null}
            </div>
            <div className="col-lg-6">
              <label htmlFor="pass"> Password</label>
              <input
                className="form-control"
                id="pass"
                fname="pass"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.pass}
              />
              {formik.errors.pass && formik.touched.pass ? (
                <div> {formik.errors.pass}</div>
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
