import { useEffect, useRef, useState } from 'react';

const statsData = [
  {
    heading: 'COLLEGE STUDENTS',
    number: '45M+',
    image: '/assets/collegestudents.png',
    text: 'A massive talent pool ready to contribute',
  },
  {
    heading: 'FINANCIALLY DEPENDENT STUDENTS',
    number: '31M+',
    image: '/assets/financiallydependent.png',
    text: 'Looking for income opportunity',
  },
  {
    heading: 'FINANCIALLY INDEPENDENT STUDENTS',
    number: '14M+',
    image: '/assets/financiallyindependent.png',
    text: 'Already earning while studying',
  },
  {
    heading: 'SKILLED BUT NOT EARNING',
    number: '19M+',
    image: '/assets/skilledbutnotearning.png',
    text: 'Talent waiting for the right platform',
  },
  {
    heading: '', // Empty cell
    number: '',
    image: '',
    text: '',
  },
  {
    heading: 'STUDENT FREELANCERS',
    number: '9M+',
    image: '/assets/studentfreelancers.png',
    text: 'Actively working independently',
  },
  {
    heading: 'RECURRING CLIENTS',
    number: '22M+',
    image: '/assets/recurringclients.png',
    text: 'Long-term and repeat freelance demand',
  },
  {
    heading: 'SME & STARTUPS',
    number: '63M+',
    image: '/assets/sme&startups.png',
    text: "India's fast-growing businesses driving freelance demand",
  },
  {
    heading: 'TALENT GAPS',
    number: '41M+',
    image: '/assets/talentgaps.png',
    text: 'Businesses struggling to find the right skills',
  },
];

// Easing function from the script
const ease = (x: number) => 1 - Math.pow(1 - x, 3);

const StatsGrid = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !mainCardRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;

      // Calculate progress
      let progress = -rect.top / total;
      progress = Math.min(Math.max(progress, 0), 1);

      // Scale from 1 → 1/3 using easing
      const scale = 1 - ease(progress) * (1 - 1 / 3);
      mainCardRef.current.style.transform = `scale(${scale})`;

      // Reveal surrounding cards after shrink is visible (progress > 0.25)
      if (progress > 0.25) {
        setIsRevealed(true);
      } else {
        setIsRevealed(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="sticky-root">
      <section className="landing-section" ref={sectionRef} id="section">
        <div className="landing-sticky" ref={stickyRef} id="sticky">
          <div className={`landing-grid ${isRevealed ? 'reveal' : ''}`}>
            {statsData.map((stat, index) => (
              <div className="landing-cell" key={index}>
                {stat.heading && (
                  <div className="cell-card premium">
                    <h3 className="cell-heading">{stat.heading}</h3>
                    <div className="cell-number">{stat.number}</div>
                    <div className="cell-image-wrap">
                      <img src={stat.image} alt={stat.heading} />
                    </div>
                    <p className="cell-text">{stat.text}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Main Card */}
            <div className="main-card" ref={mainCardRef}>
              <h1>
                Turning Student <br /> To Talents !
              </h1>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsGrid;
