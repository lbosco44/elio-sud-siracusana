import Reveal from './Reveal';

export default function SectionTitle({ eyebrow, title, subtitle, center = true, light = true }) {
  return (
    <div className={`mb-14 md:mb-20 ${center ? 'text-center mx-auto max-w-3xl' : ''}`}>
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${light ? '!text-primary-light' : ''}`}>{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2
          className={`mt-4 font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-balance ${
            light ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p
            className={`mt-5 text-lg md:text-xl leading-relaxed text-balance ${
              light ? 'text-white/75' : 'text-muted'
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
