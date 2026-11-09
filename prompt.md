# Build a Premium, Mobile-First Digital Wedding Invitation Website

## 1. Reference Website

Use the following website as the primary design and interaction reference:

https://www.inviteque.com/templates/midnight-waltz?preview=true

Study the reference carefully before starting development.

Understand its:
- Overall visual identity and wedding aesthetic.
- Typography and font combinations.
- Backgrounds, colors, gradients and decorative elements.
- Invitation layout and content hierarchy.
- Animations, transitions and scroll interactions.
- Mobile presentation and navigation.
- Image placement and visual storytelling.

**Important:** Create an original implementation inspired by the reference. Do not simply copy its assets or source code.

## 2. Primary Objective

Build an elegant, luxurious, interactive digital wedding invitation website.

The website must provide an immersive invitation experience, making guests feel like they are opening a beautifully designed physical wedding invitation.

**Highest priority: MOBILE RESPONSIVENESS.**

The mobile experience must be treated as the primary design target, not an afterthought.

The website should look exceptional on:
- iPhone SE and smaller smartphones.
- iPhone 14/15/16/17 series.
- Samsung Galaxy devices.
- Android smartphones of different screen sizes.
- Tablets.
- Desktop and large displays.

## 3. Technology Stack

Use:
- Next.js 15+ with App Router.
- React with TypeScript.
- Tailwind CSS.
- Framer Motion for animations.
- Lucide React for icons.
- Google Fonts for elegant typography.

Use reusable components and maintain a clean, production-ready architecture.

## 4. Design Direction

Create a luxurious wedding invitation aesthetic inspired by the Midnight Waltz theme.

Visual direction:
- Deep midnight navy / black backgrounds.
- Elegant gold and champagne accents.
- Subtle floral decorations.
- Sophisticated serif typography.
- Beautiful script typography for names.
- Premium wedding photography.
- Soft gradients and atmospheric lighting.
- Delicate borders and ornamental separators.
- Smooth transitions and subtle animations.

Avoid:
- Generic SaaS layouts.
- Excessive cards and unnecessary containers.
- Bright, distracting colors.
- Oversized headings that break on mobile.
- Generic template-style designs.

The design should feel exclusive, romantic, sophisticated and premium.

## 5. Website Sections

### A. Opening Invitation Experience
- Full-screen opening invitation.
- Beautiful envelope or invitation-cover animation.
- Couple's names prominently displayed.
- Wedding date.
- An elegant "Open Invitation" interaction.
- Smooth transition into the main invitation.

### B. Hero Section
- Full-screen cinematic wedding background.
- Couple's names with elegant typography.
- Wedding date and location.
- Subtle animated decorative elements.
- Scroll indicator.

### C. Couple Introduction
- Bride and groom introduction.
- Couple's photographs.
- Short personal messages.
- Elegant image and typography composition.

### D. Wedding Countdown
- Live countdown timer.
- Days, hours, minutes and seconds.
- Elegant styling that adapts to mobile.

### E. Wedding Events
Display individual event details:
- Event name.
- Date and time.
- Venue name.
- Venue address.
- Event description.
- Google Maps directions button.

Support multiple wedding events, such as:
- Engagement.
- Haldi.
- Mehendi.
- Wedding ceremony.
- Reception.

### F. Our Story
- Couple's journey.
- Important milestones.
- Timeline-based visual presentation.
- Elegant scroll animations.

### G. Photo Gallery
- Premium responsive photo gallery.
- Masonry or editorial image layout.
- Full-screen image preview.
- Smooth image transitions.
- Touch-friendly mobile navigation.

### H. Family Invitation
- Bride's family details.
- Groom's family details.
- Invitation message from families.

### I. RSVP Section
- Guest name.
- Number of attendees.
- Attendance confirmation.
- Optional wishes or message.
- Submit confirmation.
- Proper validation and error handling.

### J. Location and Venue
- Wedding venue information.
- Embedded map.
- Get Directions button.
- Address and event timing.

### K. Closing Section
- Thank-you message.
- Couple's names.
- Wedding date.
- Elegant closing animation.

## 6. Mobile-First Responsiveness – Critical Requirement

Design and develop mobile layouts first.

Do not just apply responsive CSS to desktop components.

Requirements:

1. Every section must be specifically optimized for smartphone screens.
2. No horizontal scrolling anywhere.
3. No overlapping text, images or decorative elements.
4. Couple's names must fit properly without clipping.
5. Images must maintain their aspect ratio and focal positioning.
6. Background images must use appropriate mobile-specific positioning.
7. Typography must scale using responsive sizing such as clamp().
8. Buttons must have comfortable touch targets (minimum 44px).
9. Forms must be easy to fill on mobile.
10. Animations must work smoothly on touch devices.
11. Avoid unnecessary fixed-width elements.
12. Use safe-area insets for devices with notches.
13. Navigation and controls must be touch-friendly.
14. Avoid excessive scrolling caused by oversized decorative elements.
15. Support portrait and landscape orientations.

Create dedicated mobile layouts wherever necessary instead of simply shrinking desktop layouts.

## 7. Animations and Interactions

Implement:
- Envelope opening animation.
- Smooth page entrance transitions.
- Elegant text reveal animations.
- Fade-in and slide-up effects.
- Parallax image movement where appropriate.
- Countdown animation.
- Gallery transitions.
- Smooth scrolling.
- Subtle hover interactions on desktop.
- Reduced-motion support for accessibility.

Animations must be lightweight and optimized for mobile performance.

## 8. Images and Assets

Use high-quality wedding photography and elegant decorative assets.

Initially, use suitable dummy wedding photographs.

Organize assets properly:
- Couple photographs.
- Wedding event photographs.
- Background images.
- Floral decorations.
- Decorative ornaments.
- Icons.

Do not use blurry, stretched or low-resolution images.

Use optimized image formats and Next.js Image wherever possible.

## 9. Functional Requirements

- Fully functional invitation opening interaction.
- Live wedding countdown.
- Working navigation and scroll links.
- Google Maps directions.
- Functional RSVP form with validation.
- Gallery image preview.
- Optional background music with visible play/pause controls.
- Proper loading and error states.
- All buttons and interactions must work.

Keep wedding content configurable so that names, dates, locations, images and event details can be changed without modifying the entire UI.

## 10. Performance and SEO

- Optimize Core Web Vitals.
- Prioritize mobile performance.
- Lazy-load below-the-fold images.
- Optimize image sizes.
- Avoid unnecessary dependencies.
- Prevent layout shifts.
- Add appropriate metadata and Open Graph images.
- Implement semantic HTML and accessibility.
- Respect reduced-motion preferences.

## 11. Code Architecture

Maintain reusable components such as:

- InvitationCover
- HeroSection
- CoupleSection
- CountdownSection
- OurStorySection
- EventsSection
- GallerySection
- FamilySection
- RSVPSection
- VenueSection
- FooterSection
- MusicPlayer

Keep content and configuration separate from presentation.

## 12. Final Testing and Quality Assurance

Before considering the website complete:

- Test all sections on actual mobile viewport sizes.
- Test at 320px, 360px, 375px, 390px, 414px and 430px widths.
- Test tablet and desktop layouts.
- Verify there is no horizontal overflow.
- Verify every animation and interaction.
- Check image loading and cropping.
- Test RSVP validation.
- Test navigation and map links.
- Check performance and accessibility.

Do not consider the task complete just because the desktop layout looks good.

## Final Expected Result

Deliver a premium, visually impressive digital wedding invitation website inspired by the provided Midnight Waltz reference.

The mobile experience must be exceptional, with carefully composed typography, beautiful imagery, elegant animations and intuitive interactions.

The final result should look like a premium wedding invitation product that could be sold as a professional digital wedding invitation template.