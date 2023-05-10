import MeetupList from "@/components/meetups/MeetupList";
// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "meetup1",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg",
//     address: "Some address, city, state",
//     description: "meetup1 description",
//   },
//   {
//     id: "m2",
//     title: "meetup2",
//     image:
//       "https://computerbackgroundimages.com/wp-content/uploads/2018/08/4K-Computer-Background-Images-94-1280x1280.jpg",
//     address: "Some address, city1, state",
//     description: "meetup2 description",
//   },
// ];

function HomePage(props) {
  return <Fragment>
    <Head>
      <title>Meetups</title>
      <meta name = 'description' content = "It's a simple meetups app." />
    </Head>
    <MeetupList meetups={props.meetups} />
  </Fragment>;
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://jadapalliyaswanth2000:ZQ2sIlzpGQDi9JuS@cluster0.yp5zoyv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  console.log(meetups, 'here it is')

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.data.title,
        image: meetup.data.image,
        address: meetup.data.address,
        id: meetup._id.toString(),
      })),
    },
    validate: 10
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }
export default HomePage;
