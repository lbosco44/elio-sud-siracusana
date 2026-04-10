import { Check } from 'lucide-react';
import { steps } from '../data/steps';
import Timeline from './ui/Timeline';

const timelineData = steps.map((step) => ({
  title: step.id,
  content: (
    <div>
      <h4 className="font-display font-bold text-2xl md:text-3xl text-ink mb-3">
        {step.title}
      </h4>
      <p className="text-base md:text-lg leading-relaxed text-muted mb-6 max-w-xl">
        {step.text}
      </p>
      <ul className="space-y-3">
        {step.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-sm md:text-base text-ink">
            <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="w-3 h-3 text-primary" strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>
    </div>
  ),
}));

export default function HowWeWork() {
  return (
    <section id="come-lavoriamo">
      <Timeline
        data={timelineData}
        title="Come Lavoriamo"
        subtitle="Un processo semplice e trasparente, dalla prima chiamata all'impianto funzionante"
      />
    </section>
  );
}
