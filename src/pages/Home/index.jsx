import React from "react";
import Banner from "../../components/Banner";
import CardLocation from "../../components/CardLocation";
import CardRoom from "../../components/CardRoom";
import CommitImg from "../../components/CommitImg";
import Destination from "../../components/Destination";

export default function Home() {
  return <div>
    <Banner />
    <Destination/>
    <CardLocation/>
    <CardRoom/>
    <CommitImg/>
  </div>;
}
