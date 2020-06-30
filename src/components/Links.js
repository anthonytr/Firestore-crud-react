import React from 'react'
import LinkForm from "./LinkForm";

import {db} from '../firebase'

const Links = () => {

  const addOrEditLink = async (linkObject) => {
    await db.collection('Links').doc().set(linkObject);
    console.log('New task added')
  }

  return <div>
    <LinkForm addOrEditLink={addOrEditLink} />
    <h1>links</h1>
  </div>;
};

export default Links;