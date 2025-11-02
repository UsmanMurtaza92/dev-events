import BookEvent from "@/components/BookEvent";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import { cacheLife } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

const EventDetailItem = ({ icon, alt, label }: { icon: string, alt: string, label: string}) => (
  <div className="flex-row-gap-2 items-center">
    {icon && <Image src={icon} alt={alt} width={17} height={17} />}
    <p>{label}</p>
  </div>
);

const EventAgenda = ({agendaItems}: {agendaItems: string[]}) => (
  <div className="agenda">
    <h2>Event Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}> 
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const EventTags = ({tags}: {tags: string[]}) => (
  <div className="flex flex-row-gap-2 flex-wrap">
    {tags.map((tag) => (  
      <div key={tag} className="pill">{tag}</div>
    ))}
  </div>
);

const EventDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  'use cache'
  cacheLife('hours')

  const { slug } = await params;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${BASE_URL}/api/events/${slug}`, { cache: 'no-store' });
  const { data: event } = await res.json();

  if(!event) return notFound();
  
  const bookings = 10

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug); // 

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{event.description}</p>
      </div>

      <div className="details">
        {/* Event Content */}
        <div className="content">
          <Image src={event.image} alt={event.title} width={800} height={500} className="banner" />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{event.overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon='/icons/calendar.svg' alt="calendar" label={event.date} />
            <EventDetailItem icon='/icons/clock.svg' alt="clock" label={event.time} />
            <EventDetailItem icon='/icons/pin.svg' alt="pin" label={event.location} />
            <EventDetailItem icon='/icons/mode.svg' alt="mode" label={event.mode} />
            <EventDetailItem icon='/icons/audience.svg' alt="audience" label={event.audience} />
          </section>

          <EventAgenda agendaItems={event.agenda} />

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{event.organizer}</p>
          </section>

          <EventTags tags={event.tags} />  
        </div>
        {/* Event Booking */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2> 

            {bookings > 0 ? (
              <p className="text-sm">Join {bookings} people who have already booked their spot!</p>
            ) : (
              <p className="text-sm">Be the first to book your spot</p>
            )}

            <BookEvent />
          </div>
        </aside>
      </div>

      <div className="flex w-full flex-col gap-4 pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((event: IEvent) =>  (
            <EventCard key={event} {...event} />
          ))}

        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage