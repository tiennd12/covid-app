import React, { useState, useEffect } from "react";
import { onSnapshot, orderBy, collection, query } from "firebase/firestore";

const useFirestore = (collections) => {
    const [database, setDatabase] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collections, (snapshot) => {
            let documents = [];
            snapshot.docs.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id });
            });
            setDatabase(documents);
        });
        return () => unsub()
    }, [collections]);

    return { database };
};

export default useFirestore;