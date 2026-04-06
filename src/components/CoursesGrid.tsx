import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Network, Terminal, MonitorSmartphone } from 'lucide-react';
import { withBase } from '@/lib/utils';
import type { LearningTrack } from '@/lib/curriculum/types';

type CoursesGridProps = {
  learningTracks: LearningTrack[];
};

const iconMap: Record<string, typeof Terminal> = {
  'linux-practico': Terminal,
  'redes-desde-cero': Network,
  'frontend-moderno': MonitorSmartphone,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function CoursesGrid({ learningTracks }: CoursesGridProps) {
  return (
    <div className="space-y-8">
      {learningTracks.map((track) => (
        <section key={track.slug} className="rounded-2xl border bg-card p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Path</p>
              <h2 className="mt-1 text-2xl font-semibold md:text-3xl">{track.title}</h2>
              <p className="mt-2 max-w-3xl text-muted-foreground">{track.summary}</p>
            </div>
            <BookOpen className="h-8 w-8 text-primary" />
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          >
            {track.courses.map((course) => {
              const Icon = iconMap[course.slug] ?? BookOpen;
              const firstModule = course.modules[0];
              const firstLesson = firstModule?.lessons[0];
              const startHref = firstModule && firstLesson
                ? withBase(`/cursos/${track.slug}/${course.slug}/${firstModule.slug}/${firstLesson.slug}`)
                : withBase(`/cursos/${track.slug}/${course.slug}`);

              return (
                <motion.article
                  key={course.slug}
                  variants={item}
                  className="rounded-xl border bg-background p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="inline-flex rounded-lg bg-primary/10 p-2 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mt-4 text-xl font-semibold">{course.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{course.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full border px-2 py-1">{course.modules.length} módulos</span>
                  </div>

                  <div className="mt-5 flex items-center gap-4">
                    <a href={withBase(`/cursos/${track.slug}/${course.slug}`)} className="text-sm font-medium text-primary hover:underline">
                      Ver Módulos
                    </a>
                    <a href={startHref} className="inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                      Iniciar
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </section>
      ))}
    </div>
  );
}
