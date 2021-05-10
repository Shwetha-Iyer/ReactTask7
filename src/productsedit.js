import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { useFormik } from "formik";
export default function Useredit(props){
    let history = useHistory();
    let [names,setName]=useState("");
    let [colors,setColor]=useState("");
    let [models,setModel]=useState("");
    let [avails,setAvail]=useState("");
    useEffect(async ()=>{
        let resp = await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/productreact/${props.match.params.id}`);
        var data = await resp.json();
        //console.log(data);
        setName(data.name);
        setColor(data.color);
        setModel(data.model);
        setAvail(data.available);
    },[])
  
    let goback = ()=>{
      history.push("/products");
    }
    let remove = async () =>{
      await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/productreact/${props.match.params.id}`, {
        method: "DELETE",
      });
      history.push("/products");
    }
  

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
      onSubmit: async (values)=>{
        console.log("inside submit",values);
      let name = values.name;
      let color = values.color;
      let model = values.model;
      let available = values.avail;
        await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/productreact/${props.match.params.id}`,{
          method: "PUT",
          body: JSON.stringify({
              name,
              color,
              model,
              available
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
      });
      history.push("/products");
      }
    
  });
    return (
      <>
        <h1> Product Edit</h1>
  
        <p> Edit a product here </p>
  

        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="fname"> Name</label>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setName(e.target.value)}
                  value={formik.values.name=names}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div> {formik.errors.name}</div>
                ) : null}
              </div>
              <div className="col-lg-6">
                <label htmlFor="lname"> Color</label>
                <input
                  className="form-control"
                  id="color"
                  name="color"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setColor(e.target.value)}
                  value={formik.values.color=colors}
                />
                {formik.errors.color && formik.touched.color ? (
                  <div> {formik.errors.color}</div>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="mail"> Model</label>
                <input
                  className="form-control"
                  id="model"
                  name="model"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setModel(e.target.value)}
                  value={formik.values.model=models}
                />
                {formik.errors.model && formik.touched.model ? (
                  <div> {formik.errors.model}</div>
                ) : null}
              </div>
              <div className="col-lg-6">
                <label htmlFor="pass"> Availability</label>
                <input
                  className="form-control"
                  id="avail"
                  name="avail"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setAvail(e.target.value)}
                  value={formik.values.avail=avails}
                />
                {formik.errors.avail && formik.touched.avail ? (
                  <div> {formik.errors.avail}</div>
                ) : null}
              </div>
            </div>
            <div className="row mt-3">
              <input type="submit" className="btn btn-primary" value="Submit" /> &nbsp; &nbsp;
              <button type="button" className="btn btn-warning" onClick={goback}>Cancel</button> &nbsp; &nbsp;
              <button type="button" className="btn btn-danger" onClick={remove}>Delete</button>
            </div>
          </div>
        </form> 
        
      </>
    );
}