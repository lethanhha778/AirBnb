import React, { useEffect } from "react";
import Banner from "../../components/Banner";
import CardLocation from "../../components/CardLocation";
import CardRoom from "../../components/CardRoom";
import CommitImg from "../../components/CommitImg";
import Destination from "../../components/Destination";

export default function Home() {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    return <div>
        <Banner />
        <Destination />
        <CardLocation />
        <CardRoom />
        <CommitImg />
    </div>;
}
