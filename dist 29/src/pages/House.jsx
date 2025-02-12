import React, { useEffect } from "react";
import { useParams } from "react-router";
import Hogwards from "../Hogwarts";

function House() {
    let [characters, setCharacters] = React.useState([]);
    useEffect(() => {
        Hogwards.get(`characters/house/${houseName}`).then((res) => {
            console.log(res.data);
            setCharacters(res.data);
        }).catch((err) => {
            console.log(err);
        })
    },[])
    let houseName = useParams().houseName;
    return (
        <main>
            <h1>House {houseName}</h1>
            <ul>
                {characters.map((character) => (
                    <li key={character.id}>
                        <a href={`/character/${character.id}`}>{character.name}</a>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default House;
