import React, { useEffect, useState } from 'react'
import LinkForm from "./LinkForm";

import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);

  const addOrEditLink = async (linkObject) => {
    await db.collection("links").doc().set(linkObject);
    console.log('New task added')
  }

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
        <LinkForm addOrEditLink={ addOrEditLink } />
      </div>
      <div className="col-md-8 p-2">
        {links.map(link => (
          <div className="card md-1">
            <div className="card-body">
              <h4>{ link.name }</h4>
              <p>{ link.description }</p>
              <a href={ link.url } target="_blank">
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