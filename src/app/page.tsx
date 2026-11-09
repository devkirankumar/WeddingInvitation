import { wedding } from "@/config/wedding";
import { InvitationExperience } from "@/components/InvitationExperience";
import { HeroSection } from "@/components/sections/HeroSection";
import { WelcomeSection } from "@/components/sections/WelcomeSection";
import { CoupleSection } from "@/components/sections/CoupleSection";
import { MomentsSection } from "@/components/sections/MomentsSection";
import { VenueSection } from "@/components/sections/VenueSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { SaptapadiSection } from "@/components/sections/SaptapadiSection";
import { RSVPSection } from "@/components/sections/RSVPSection";
import { CountdownSection } from "@/components/sections/CountdownSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: wedding.site.title,
    description: wedding.site.description,
    startDate: wedding.weddingDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: wedding.venue.name, address: wedding.venue.lines.join(", ") },
  };

  return (
    <InvitationExperience>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Same order as the reference template */}
      <HeroSection />
      <MomentsSection />
      <WelcomeSection />
      {wedding.showCardExtras && <CoupleSection />}
      <VenueSection />
      <EventsSection />
      {wedding.showCardExtras && (
        <>
          <JourneySection />
          {/* <SaptapadiSection /> */}
        </>
      )}
      {/* {wedding.rsvp.enabled && <RSVPSection />} */}
      <CountdownSection />
      <FooterSection />
    </InvitationExperience>
  );
}
