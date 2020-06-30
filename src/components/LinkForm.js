import React, { useState, useEffect } from 'react'
import { db } from '../firebase';

const LinkForm = (props) => {

  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({...values, [name]: value})
  };

  //Agregar o editar tarjetas:
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addOrEditLink(values);
    setValues({...initialStateValues})
  };

  const getLinkById = async (id) => {
    const doc = await db.collection('links').doc(id).get();
    setValues({ ...doc.data() })
  }

  useEffect(() => {
    console.log(props.currentId);
    if (props.currentId === "") {
      setValues({...initialStateValues});
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <form className="card card-body" onSubmit={ handleSubmit }>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="https://someurl.com"
          name="url"
          onChange={ handleInputChange }
          value={ values.url }
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Website name"
          name="name"
          onChange={ handleInputChange }
          value={ values.name }
        />
      </div>

      <div className="form-group">
        <textarea
          name="description"
          row="3"
          className="form-control"
          placeholder="Write a description"
          onChange={ handleInputChange }
          value={ values.description }
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block">
        { props.currentId === '' ? 'save' : 'Update'}
      </button>
    </form>
  );
};

export default LinkForm;