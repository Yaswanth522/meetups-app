// const { Fragment } = require("react");
import MeetupDetails from "@/components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";

function MeetupDetailsPage(props) {
  return (
    <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://jadapalliyaswanth2000:ZQ2sIlzpGQDi9JuS@cluster0.yp5zoyv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  // console.log(meetups, 'here it is')

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://jadapalliyaswanth2000:ZQ2sIlzpGQDi9JuS@cluster0.yp5zoyv.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetupId = new ObjectId(meetId)

  console.log('here it is')

  const meetups = await meetupsCollection.findOne({_id: meetupId})

  console.log(meetups, 'here it is')

  client.close();

  return {
    props: {
      meetupData: {
        id: meetups._id.toString(),
        title: meetups.data.title,
        image: meetups.data.image,
        address: meetups.data.address,
        description: meetups.data.description
      }
    },
  };
}

export default MeetupDetailsPage;
