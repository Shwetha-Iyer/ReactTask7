import { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { useFormik } from "formik";
export default function Useredit(props){
    let history = useHistory();
    let [fnames,setFname]=useState("");
    let [lnames,setLname]=useState("");
    let [emails,setEmail]=useState("");
    let [passwords,setPass]=useState("");
    useEffect(async ()=>{
        let resp = await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/userreact/${props.match.params.id}`);
        var data = await resp.json();
        //console.log(data);
        setFname(data.firstname);
        setLname(data.lastname);
        setEmail(data.email);
        setPass(data.password);
    },[])
  
    let goback = ()=>{
      history.push("/users");
    }
    let remove = async () =>{
      await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/userreact/${props.match.params.id}`, {
        method: "DELETE",
      });
      history.push("/users");
    }
  

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
      onSubmit: async (values)=>{
        console.log("inside submit",values);
      let firstname = values.fname;
      let lastname = values.lname;
      let email = values.mail;
      let password = values.pass;
        await fetch(`https://60746f03066e7e0017e79e59.mockapi.io/userreact/${props.match.params.id}`,{
          method: "PUT",
          body: JSON.stringify({
              firstname,
              lastname,
              email,
              password
          }),
          headers: {
              "Content-type": "application/json; charset=UTF-8",
            }
      });
      history.push("/users");
      }
    
  });
    return (
      <>
        <h1> User Edit</h1>
  
        <p> Edit a user here </p>
  

        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <label htmlFor="fname"> First Name</label>
                <input
                  className="form-control"
                  id="fname"
                  name="fname"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setFname(e.target.value)}
                  value={formik.values.fname=fnames}
                />
                {formik.errors.fname && formik.touched.fname ? (
                  <div> {formik.errors.fname}</div>
                ) : null}
              </div>
              <div className="col-lg-6">
                <label htmlFor="lname"> Last Name</label>
                <input
                  className="form-control"
                  id="lname"
                  name="lname"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setLname(e.target.value)}
                  value={formik.values.lname=lnames}
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
                  name="mail"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setEmail(e.target.value)}
                  value={formik.values.mail=emails}
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
                  name="pass"
                  onBlur={formik.handleBlur}
                  onChange={(e)=>setPass(e.target.value)}
                  value={formik.values.pass=passwords}
                />
                {formik.errors.pass && formik.touched.pass ? (
                  <div> {formik.errors.pass}</div>
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