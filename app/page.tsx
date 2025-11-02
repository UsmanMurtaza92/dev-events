import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { IEvent } from "@/database";
import { EventItem, events } from "@/lib/constants";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const Home = async () => {
  'use cache'
  cacheLife('hours')
  // const resp = await fetch(`${BASE_URL}/api/events`);
  // const { events } = await resp.json();

  return (
    <section>
      <h1 className="text-center">
        The Hub for Evenry Dev <br /> Event You Musn&apost Miss
      </h1>
      <p className="text-center mt-5">Hackathons, Meetups, and Conferences, All in One Place</p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events list-none">
          {events && events.length > 0 && events.map((event: EventItem) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
