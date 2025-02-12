import React, { useEffect } from "react";
import { useParams } from "react-router";
import Hogwards from "../Hogwarts";

function Charcter() {
    let [data, setData] = React.useState({});
    useEffect(() => {
        Hogwards.get(`character/${id}`).then((res) => {
            setData(res.data[0]);
        }).catch((err) => {
            console.log(err);
        })
    },[])
    let id = useParams().id;
    return (
        <main>
            <h1>{data.name}</h1>
            <img src={data.image} alt={data.name} />
            <p>House: {data.house}</p>
            <p>Actor`s name: {data.actor}</p>
            <p>Date of birth: {data.dateOfBirth}</p>
            <p>Gender: {data.gender}</p>
            <p>Species: {data.species}</p>
            <p>Eye colour: {data.eyeColour}</p>
            <p>Hair colour: {data.hairColour}</p>
        </main>
    );
}

export default Charcter;
