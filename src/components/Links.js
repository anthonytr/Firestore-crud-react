import React, { useEffect, useState } from 'react'
import LinkForm from "./LinkForm";
import { toast } from 'react-toastify'

import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);

  //Actualizar una tarjeta:
  const [currentId, setCurrentId] = useState("");

  //Crear tarjetas en la base de datos:
  const addOrEditLink = async (linkObject) => {
    //Validación:
    try {
      if (currentId === '') {
        await db.collection("links").doc().set(linkObject);
        toast('New Link Added', {
          type: 'success',
          autoClose: 2000,
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Link Updated Successfully", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Borrar tarjetas de la base de datos:
  const onDeletelink = async (id) => {
    if (window.confirm("are you sure you want to delete this link?")) {
      await db.collection('links').doc(id).delete();
      toast('Link Removed Successfully', {
        type: 'error',
        autoClose: 2000,
      });
    }
  };

  const getLinks = async () => {
    db.collection("links").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({...doc.data(), id:doc.id});
      });
      setLinks(docs)
    });
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>
      <div className="col-md-8 p-2">
        {links.map(link => (
          <div className="card md-1" key={ link.id }>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{ link.name }</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={ () => onDeletelink(link.id) }>
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={ () => setCurrentId(link.id) }>
                    create
                  </i>
                </div>
              </div>
              <p>{ link.description }</p>
              <a href={ link.url } target="_blank" rel="noopener noreferrer">
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;