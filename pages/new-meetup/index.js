// import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/router";

const { default: NewMeetupForm } = require("@/components/meetups/NewMeetupForm");


function NewMeetupPage() {

    const router = useRouter()

    const addMeetupHandler = async (enteredData) => {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        console.log(data)

        router.push('/')
        // router.replace('/') // user won't go back by back button
    }
    return <NewMeetupForm onAddMeetUp = {addMeetupHandler}/>
}

export default NewMeetupPage